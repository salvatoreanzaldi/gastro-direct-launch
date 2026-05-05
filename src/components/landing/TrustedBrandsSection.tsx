import { useTranslation } from 'react-i18next';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

// Import customer logos
import logoArtemis from '@/assets/logos/kunden/logo-artemis.png';
import logoBurgerBrothers from '@/assets/logos/kunden/logo-burger-brothers.png';
import logoEtManus from '@/assets/logos/kunden/logo-et-manus.png';
import logoIlSorriso from '@/assets/logos/kunden/logo-il-sorriso.png';
import logoKojoSushi from '@/assets/logos/kunden/logo-kojo-sushi.png';
import logoTake from '@/assets/logos/kunden/logo-take.png';

const logos = [
  { id: 'artemis', src: logoArtemis, alt: 'Artemis' },
  { id: 'burger-brothers', src: logoBurgerBrothers, alt: 'Burger Brothers' },
  { id: 'et-manus', src: logoEtManus, alt: 'Et Manus' },
  { id: 'il-sorriso', src: logoIlSorriso, alt: 'Il Sorriso' },
  { id: 'kojo-sushi', src: logoKojoSushi, alt: 'Kojo Sushi' },
  { id: 'take', src: logoTake, alt: 'Take' },
];

export default function TrustedBrandsSection() {
  const { t } = useTranslation('common');
  return (
    <div className="bg-background pt-0 pb-6 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-3">
            {t('trustedBrands.title')}
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            {t('trustedBrands.subtitle')}
          </p>
        </div>

        {/* Infinite Slider with Logos */}
        <div className="relative">
          <div
            className="relative h-[120px] w-full flex items-center overflow-hidden"
            style={{
              maskImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 15%,
                rgba(0, 0, 0, 1) 85%,
                rgba(0, 0, 0, 0) 100%
              )`,
              WebkitMaskImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 1) 15%,
                rgba(0, 0, 0, 1) 85%,
                rgba(0, 0, 0, 0) 100%
              )`,
            }}
          >
            <InfiniteSlider
              className="flex h-full w-full items-center"
              duration={40}
              gap={48}
            >
              {logos.map(({ id, src, alt }) => (
                <div
                  key={id}
                  className="flex-shrink-0 h-20 flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="max-h-full max-w-[150px] object-contain hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </div>
  );
}
