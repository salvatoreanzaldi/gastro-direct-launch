import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import type { GoogleReview } from '@/types/reviews';
import googleLogo from '@/assets/icons/Icon - Google.svg';
import googleLogoRound from '@/assets/icons/Icon - Google Rund.svg';
import verifyIcon from '@/assets/icons/Icon - Verify.svg';
import './GoogleReviewsGrid.css';

/**
 * GoogleReviewsGrid
 *
 * Displays Google My Business reviews with professional layout
 * Positioned after Hero Section on /de/uber-uns
 *
 * Features:
 * - Aggregated 5-star rating and review count
 * - Google Logo + Header with CTA
 * - Dynamic filter tabs from Google Sheet tabs (no hardcoded filters)
 * - Responsive grid: 4 columns desktop / 2 tablet / 1 mobile
 * - Shows 4 reviews per row on desktop
 * - Review cards: avatar, name, stars, text excerpt, date
 * - "Weitere Bewertungen lesen" CTA button
 * - Dark mode support
 * - Error & loading states
 */
export default function GoogleReviewsGrid() {
  const { t } = useTranslation('ueber-uns');
  const [activeFilter, setActiveFilter] = useState<string>(''); // Empty until tabs load

  // Load reviews for active filter (or default)
  const { reviews, availableTabs, totalRating, totalCount, isLoading, error }
    = useGoogleReviews(activeFilter || undefined);

  // Drag-scroll refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(30);

  // Initialize active filter when tabs load
  useEffect(() => {
    if (availableTabs.length > 0 && !activeFilter) {
      setActiveFilter(availableTabs[0]);
    }
  }, [availableTabs, activeFilter]);

  // Reset scroll position when filter changes (without animation)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = 0;
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.scrollBehavior = 'smooth';
        }
      }, 0);
    }
    setScrollProgress(0);
  }, [activeFilter]);

  // Thumb-Breite nach Review-Laden berechnen
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !reviews.length) return;
    setTimeout(() => {
      if (scrollRef.current) {
        setThumbWidth(Math.max((scrollRef.current.clientWidth / scrollRef.current.scrollWidth) * 100, 12));
      }
    }, 50);
  }, [reviews]);

  // Event handlers for drag-scroll
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.0;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
    setThumbWidth(Math.max((el.clientWidth / el.scrollWidth) * 100, 12));
  };

  const onScroll = updateScrollState;

  // Get tab label from translation, fallback to sheet name
  const getTabLabel = (tabName: string): string => {
    const tabLabelKey = `googleReviews.tabLabels.${tabName}`;
    const translatedLabel = t(tabLabelKey, '');
    return translatedLabel || tabName;
  };

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-16 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Line 1: Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4 max-w-[1225px] mx-auto"
        >
          <img
            src={googleLogo}
            alt="Google Logo"
            className="h-8 md:h-10 object-contain"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A264A] dark:text-white">
            {t('googleReviews.title')}
          </h2>
        </motion.div>

        {/* Header Line 2: Rating Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8 max-w-[1225px] mx-auto"
        >
          <span className="text-2xl font-bold text-[#0A264A] dark:text-white">
            {totalRating.toFixed(1)}
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 text-amber-400 fill-amber-400"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({totalCount} {t(totalCount === 1 ? 'googleReviews.reviewCount_one' : 'googleReviews.reviewCount_other')})
          </span>
        </motion.div>

        {/* Filter Tabs — Dynamically rendered from available tabs */}
        {availableTabs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap gap-3 mb-10 max-w-[1225px] mx-auto"
          >
            {availableTabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                variant={activeFilter === tab ? 'default' : 'outline'}
                className={
                  activeFilter === tab
                    ? 'bg-[#0A264A] dark:bg-white text-white dark:text-[#0A264A]'
                    : ''
                }
              >
                {getTabLabel(tab)}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && !reviews.length ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#0A264A] dark:text-white" />
            <span className="ml-3 text-[#0A264A] dark:text-white">
              {t('googleReviews.loading')}
            </span>
          </div>
        ) : (
          <>
            {/* Reviews Grid with Horizontal Scroll */}
            <motion.div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onScroll={onScroll}
              className="reviews-scroll-container flex gap-5 pb-4 snap-x snap-mandatory max-w-[1225px] mx-auto select-none cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: 'smooth' }}
            >
              <AnimatePresence mode="wait">
                {reviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Custom scroll progress bar — mobile only (iOS Safari ignores CSS scrollbar styles) */}
            <div className="lg:hidden max-w-[1225px] mx-auto mt-4 mb-1 px-1">
              <div className="relative h-1.5 w-full rounded-full bg-[#0A264A]/15 dark:bg-white/10">
                <div
                  className="absolute top-0 h-full rounded-full bg-[#0A264A] dark:bg-blue-400 transition-[left] duration-75"
                  style={{
                    width: `${thumbWidth}%`,
                    left: `${scrollProgress * (100 - thumbWidth)}%`,
                  }}
                />
              </div>
            </div>

            {/* Empty State */}
            {reviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {t('googleReviews.noReviews')}
                </p>
              </div>
            )}
          </>
        )}

        {/* CTA Link */}
        {reviews.length > 0 && (
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="https://g.page/r/CdCNZ5Fg01PBEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center pt-4 max-w-[1225px] mx-auto"
          >
            <div className="bg-[#0A264A] dark:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#0A264A]/20 dark:shadow-blue-600/20 cursor-pointer">
              {t('googleReviews.cta')}
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        )}
      </div>
    </section>
  );
}

/**
 * ReviewCard
 *
 * Individual review card with avatar, name, rating, text excerpt, and date
 */
interface ReviewCardProps {
  review: GoogleReview;
  index: number;
}


/**
 * Translates German relative time descriptions to translation keys
 * Maps "vor 1 Monat" -> "vor_einem_monat", "vor 2 Monaten" -> "vor_2_monaten", etc.
 */
function getTimeTranslationKey(germanTime: string): string {
  // vor 1 Tag or vor einem Tag -> vor_einem_tag
  if (germanTime === 'vor 1 Tag' || germanTime === 'vor einem Tag') return 'vor_einem_tag';
  
  // vor {n} Tagen
  const daysMatch = germanTime.match(/^vor (\d+) Tagen$/);
  if (daysMatch) return 'vor_tagen';
  
  // vor 1 Woche or vor einer Woche -> vor_einer_woche
  if (germanTime === 'vor 1 Woche' || germanTime === 'vor einer Woche') return 'vor_einer_woche';
  
  // vor {n} Wochen
  const weeksMatch = germanTime.match(/^vor (\d+) Wochen$/);
  if (weeksMatch) return 'vor_wochen';
  
  // vor 1 Monat or vor einem Monat -> vor_einem_monat
  if (germanTime === 'vor 1 Monat' || germanTime === 'vor einem Monat') return 'vor_einem_monat';
  
  // vor {n} Monaten (2-11)
  const monthsMatch = germanTime.match(/^vor (\d+) Monaten$/);
  if (monthsMatch) {
    const num = parseInt(monthsMatch[1], 10);
    if (num >= 2 && num <= 11) return `vor_${num}_monaten`;
  }
  
  // vor 1 Jahr or vor einem Jahr -> vor_einem_jahr
  if (germanTime === 'vor 1 Jahr' || germanTime === 'vor einem Jahr') return 'vor_einem_jahr';
  
  // Fallback: return the original text
  return germanTime;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const { t } = useTranslation('ueber-uns');
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Truncate text to 150 characters if longer
  const isTruncated = review.text.length > 150;
  const displayText = isTruncated && !isExpanded
    ? review.text.slice(0, 150) + '…'
    : review.text;

  // Get initials for avatar fallback
  const initials = review.author_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="bg-[#f6f7f9] dark:bg-[#1F2937] rounded-2xl p-6 border border-[#0A264A]/10 dark:border-white/10 hover:shadow-lg transition-shadow duration-300 w-72 flex-shrink-0 snap-start"
    >
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {review.profile_photo_url && !imageError ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              loading="lazy"
              className="w-full h-full rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            initials
          )}
          {/* Google Logo Badge */}
          <img
            src={googleLogoRound}
            alt="Google"
            className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-0.5 shadow-sm"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {review.author_url ? (
              <a
                href={review.author_url}
                target="_blank"
                rel="noopener noreferrer"
                title={t('googleReviews.verifiedCustomer')}
                className="font-semibold text-[#0A264A] dark:text-white truncate hover:underline"
              >
                {review.author_name}
              </a>
            ) : (
              <p className="font-semibold text-[#0A264A] dark:text-white truncate">
                {review.author_name}
              </p>
            )}
            <img src={verifyIcon} alt="Verified" className="w-4 h-4 flex-shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground">
            {t(`relative_time.${getTimeTranslationKey(review.relative_time_description)}`)}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-sm text-[#0A264A]/80 dark:text-white/80 leading-relaxed mb-3">
        {displayText}
      </p>

      {/* Expand/Collapse Button */}
      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          {isExpanded ? t('googleReviews.expandLess') : t('googleReviews.expandMore')}
        </button>
      )}
    </motion.div>
  );
}

/**
 * ErrorState
 *
 * Fallback UI when reviews fail to load
 */
function ErrorState() {
  const { t } = useTranslation('ueber-uns');

  return (
    <section className="bg-white dark:bg-[#111827] px-5 md:px-8 lg:px-16 py-16 md:py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#0A264A] dark:text-white mb-2">
          {t('googleReviews.errorTitle')}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t('googleReviews.errorText')}
        </p>
        <motion.a
          whileHover={{ scale: 1.02 }}
          href="https://g.page/r/CdCNZ5Fg01PBEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A264A] dark:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#0A264A]/20 dark:shadow-blue-600/20"
        >
          {t('googleReviews.cta')}
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
