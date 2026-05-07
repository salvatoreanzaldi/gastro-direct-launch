import { useState } from "react";
import { Link } from "react-router-dom";
import logoWide from "@/assets/logos/logo-gastro-master-wide.png";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";
import { ChevronDown, ArrowRight } from "lucide-react";

// Product data structure for mobile accordion + desktop
const productData = {
  pakete: [
    { label: "Online Shop", route: "/produkte/pakete/online-bestellshop" },
    { label: "App System", route: "/produkte/pakete/bestell-app" },
    { label: "Webseite", route: "/produkte/pakete/webseite" },
    { label: "Kassensystem", route: "/produkte/pakete/kassensystem" },
  ],
  addons: [
    { label: "Transaktions-Umlage", route: "/produkte/add-ons/transaktionsumlage" },
    { label: "QR-Code-Flyer", route: "/produkte/add-ons/qr-code-flyer" },
    { label: "Fahrer-App mit GPS", route: "/produkte/add-ons/fahrer-app-gps" },
    { label: "QR-Code-Tischsystem", route: "/produkte/add-ons/qr-code-tischsystem" },
    { label: "Kitchen Display", route: "/produkte/add-ons/bildschirmfunktion" },
    { label: "Self-Service-Kiosk", route: "/produkte/add-ons/kiosk" },
  ],
  hardware: { label: "Hardware", route: "/produkte/hardware" },
};

const loesRoutes = [
  "/loesungen/lieferservice-gruenden",
  "/loesungen/franchise",
  "/loesungen/restaurant",
  "/loesungen/lieferdienst",
  "/loesungen/cafe-baeckerei",
  "/loesungen/ghost-kitchen",
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/gastromasterde",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@Gastro-Master",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/gastromasterde",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    ),
  },
];

// Mobile Accordion Component
const MobileAccordionItem = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-primary-foreground/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-4 text-left hover:bg-primary-foreground/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-primary-foreground font-semibold">{title}</span>
        <ChevronDown className={`w-5 h-5 text-primary-foreground/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
};

const MobileSubAccordionItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-l-2 border-primary-foreground/20 pl-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2 text-left hover:text-primary-foreground transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-primary-foreground/70 text-sm font-medium">{title}</span>
        <ChevronDown className={`w-4 h-4 text-primary-foreground/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="mt-2 space-y-2 pl-0">{children}</div>}
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation("common");
  const lp = useLangPath();

  return (
    <footer className="bg-gradient-navy border-t border-primary-foreground/10 px-5 md:px-8 lg:px-16 py-12">
      <div className="container-tight">

        {/* MOBILE LAYOUT */}
        <div className="md:hidden">
          {/* Logo + Social Icons */}
          <div className="mb-6">
            <Link to={lp("/")} className="inline-flex items-center mb-4">
              <img src={logoWide} alt="Gastro Master" className="h-6 w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="border-t border-primary-foreground/10 mb-6">
            {/* PRODUKTE */}
            <MobileAccordionItem title={t('footer.produkte').toUpperCase()}>
              {/* Pakete Sub-Accordion */}
              <MobileSubAccordionItem title="Pakete">
                {productData.pakete.map(pkg => (
                  <Link
                    key={pkg.route}
                    to={lp(pkg.route)}
                    className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors"
                  >
                    {pkg.label}
                  </Link>
                ))}
              </MobileSubAccordionItem>

              {/* Add-Ons Sub-Accordion */}
              <MobileSubAccordionItem title="Add-Ons">
                {productData.addons.map(addon => (
                  <Link
                    key={addon.route}
                    to={lp(addon.route)}
                    className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors"
                  >
                    {addon.label}
                  </Link>
                ))}
              </MobileSubAccordionItem>

              {/* Hardware Direct Link */}
              <Link
                to={lp(productData.hardware.route)}
                className="flex items-center justify-between py-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
              >
                <span>{productData.hardware.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MobileAccordionItem>

            {/* LÖSUNGEN */}
            <MobileAccordionItem title={t('footer.loesungen').toUpperCase()}>
              {loesRoutes.map((to, i) => (
                <Link
                  key={to}
                  to={lp(to)}
                  className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors"
                >
                  {t(`nav.loesItems.${i}.label`)}
                </Link>
              ))}
            </MobileAccordionItem>

            {/* WEITERES */}
            <MobileAccordionItem title={t('footer.weiteres').toUpperCase()}>
              <Link to={lp("/impressum")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.impressum')}
              </Link>
              <Link to={lp("/datenschutz")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.datenschutz')}
              </Link>
              <Link to={lp("/agb")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.agb')}
              </Link>
              <Link to={lp("/kontakt")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.kontakt')}
              </Link>
              <Link to={lp("/uber-uns")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.ueberUns')}
              </Link>
              <Link to={lp("/faq")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                FAQ
              </Link>
              <Link to={lp("/blog")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                Blog
              </Link>
              <Link to={lp("/downloads")} className="block text-primary-foreground/60 hover:text-primary-foreground text-sm py-2 transition-colors">
                {t('footer.downloads')}
              </Link>
            </MobileAccordionItem>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-primary-foreground/10 text-center text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} Gastro Master. {t('footer.rights')}
          </div>
        </div>

        {/* DESKTOP LAYOUT (unchanged structure, expanded product data) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand + Social */}
          <div>
            <Link to={lp("/")} className="inline-flex items-center mb-5">
              <img src={logoWide} alt="Gastro Master" className="h-7 md:h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 flex items-center justify-center text-primary-foreground/40 hover:text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Produkte - All items with sub-grouping */}
          <div>
            <h4 className="text-primary-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t('footer.produkte')}</h4>
            <ul className="space-y-2.5">
              {/* Pakete Group Header */}
              <li className="text-primary-foreground/30 text-xs font-bold uppercase tracking-wider mt-4">Pakete</li>
              {productData.pakete.map(pkg => (
                <li key={pkg.route}>
                  <Link to={lp(pkg.route)} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                    {pkg.label}
                  </Link>
                </li>
              ))}

              {/* Add-Ons Group Header */}
              <li className="text-primary-foreground/30 text-xs font-bold uppercase tracking-wider mt-4">Add-Ons</li>
              {productData.addons.map(addon => (
                <li key={addon.route}>
                  <Link to={lp(addon.route)} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                    {addon.label}
                  </Link>
                </li>
              ))}

              {/* Hardware */}
              <li className="text-primary-foreground/30 text-xs font-bold uppercase tracking-wider mt-4">Hardware</li>
              <li>
                <Link to={lp(productData.hardware.route)} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {productData.hardware.label}
                </Link>
              </li>
            </ul>
          </div>

          {/* Lösungen */}
          <div>
            <h4 className="text-primary-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t('footer.loesungen')}</h4>
            <ul className="space-y-2.5">
              {loesRoutes.map((to, i) => (
                <li key={to}>
                  <Link to={lp(to)} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                    {t(`nav.loesItems.${i}.label`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Weiteres */}
          <div>
            <h4 className="text-primary-foreground/50 text-xs font-bold uppercase tracking-widest mb-4">{t('footer.weiteres')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to={lp("/impressum")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.impressum')}
                </Link>
              </li>
              <li>
                <Link to={lp("/datenschutz")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.datenschutz')}
                </Link>
              </li>
              <li>
                <Link to={lp("/agb")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.agb')}
                </Link>
              </li>
              <li>
                <Link to={lp("/kontakt")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.kontakt')}
                </Link>
              </li>
              <li>
                <Link to={lp("/uber-uns")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.ueberUns')}
                </Link>
              </li>
              <li>
                <Link to={lp("/faq")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={lp("/blog")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={lp("/downloads")} className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors duration-200">
                  {t('footer.downloads')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar - Desktop */}
        <div className="hidden md:block pt-6 border-t border-primary-foreground/10 text-center text-primary-foreground/30 text-sm">
          © {new Date().getFullYear()} Gastro Master. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
