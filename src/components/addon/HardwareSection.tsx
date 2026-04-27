import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import multicolorImg from "@/assets/hardware/kiosk/kiosk-multicolor.png";
import doublescreenSchwarzImg from "@/assets/hardware/kiosk/doublescreen-schwarz.png";
import doublescreenWeissImg from "@/assets/hardware/kiosk/doublescreen-weiss.png";
import wand156Img from "@/assets/hardware/kiosk/wand-kiosk-15-6-zoll.png";
import wand215Img from "@/assets/hardware/kiosk/wand-kiosk-21-5-zoll.png";
import outdoorImg from "@/assets/hardware/kiosk/outdoor-kiosk.png";

interface HardwareSectionProps {
  variant: "multicolor" | "doublescreen" | "wallmount" | "outdoor";
}

const HardwareSection = ({ variant }: HardwareSectionProps) => {
  const sections = {
    multicolor: {
      title: "Kiosk Terminal in deiner Lieblingsfarbe — Design nach deinem Branding",
      subtitle: "Flexibles Farbdesign für Restaurants, Bäckereien und Schnellrestaurants",
      description: (
        <>
          Dein Self-Ordering Terminal kann mehr als nur funktionieren — es kann dein Restaurant repräsentieren. Mit unserem{" "}
          <strong>Kiosk in verschiedenen Farben</strong> wählst du das Design, das zu deiner Location passt. Egal ob modernes Schwarz für minimalistisches Design, klassisches Weiß für helle Räume oder individuelle Abstufungen — das Bestellterminal wird zum visuellen Eingang deiner Marke. So schafft dein{" "}
          <Link to="/produkte/add-ons/kiosk" className="text-blue-600 hover:underline font-medium">
            Self-Ordering Terminal
          </Link>{" "}
          nicht nur Effizienz an der Theke, sondern auch einen <strong>konsistenten Brand-Eindruck</strong> für deine Gäste.
        </>
      ),
      images: [
        {
          src: multicolorImg,
          alt: "Kiosk Terminal in verschiedenen Farben für Restaurants und Bäckereien",
        },
      ],
    },
    doublescreen: {
      title: "Dual-Screen Kiosk — Zwei Bildschirme, doppelte Effizienz beim Self-Ordering",
      subtitle: "Schwarze & weiße Varianten — optimiert für Food Courts und Schnellrestaurants",
      description: (
        <>
          Mit unserem <strong>Doublescreen Kiosk</strong> bestellst du auf einem Bildschirm, während dein Gast gleichzeitig auf dem zweiten Terminal bezahlt — ohne Wartezeit. Dieses <strong>Zwei-Bildschirm-System</strong> ist ideal für Food Courts mit hohem Bestellaufkommen, wo Geschwindigkeit zählt. Ob <strong>Doublescreen in Schwarz</strong> für moderne Locations oder in klassischem Weiß — beide Varianten sind{" "}
          <Link to="/produkte/pakete/kassensystem" className="text-blue-600 hover:underline font-medium">
            TSE-integriert
          </Link>{" "}
          und arbeiten nahtlos mit deiner Kasse zusammen. So sinkt die durchschnittliche Bestellzeit deutlich, und deine Gäste stehen nie wieder an.
        </>
      ),
      images: [
        {
          src: doublescreenSchwarzImg,
          alt: "Doublescreen Kiosk schwarz für Restaurants",
          label: "Schwarz",
        },
        {
          src: doublescreenWeissImg,
          alt: "Doublescreen Kiosk weiß für Gastronomie",
          label: "Weiß",
        },
      ],
    },
    wallmount: {
      title: "Wand-Kiosk 15,6\" & 21,5\" — Platzsparendes Bestellterminal für enge Räume",
      subtitle: "Elegante Wandmontage für Bäckereien, kleine Läden und Franchise-Filialen",
      description: (
        <>
          Du hast wenig Platz hinter der Theke? Mit unserem <strong>Wandmontierten Kiosk</strong> sparst du wertvollen Raum, ohne auf ein <strong>vollwertiges Self-Ordering Terminal</strong> zu verzichten. Wähle zwischen <strong>15,6 Zoll für kompakte Filialen</strong> (z.B.{" "}
          <Link to="/loesungen/baeckerei" className="text-blue-600 hover:underline font-medium">
            Bäckereien mit wenig Verkaufsfläche
          </Link>
          ) oder <strong>21,5 Zoll für größere Läden und Food Court-Stände</strong> — beide Größen ermöglichen eine <strong>ergonomische Bedienung</strong> auch aus der Entfernung. Die wandmontierte Installation ist schnell, unauffällig und verwandelt jede Ecke deines Restaurants in einen Bestellkanal, ohne Tische oder Bewegungsfläche zu beeinträchtigen.
        </>
      ),
      images: [
        {
          src: wand156Img,
          alt: "Wand-Kiosk 15,6 Zoll Wandmontage für Bäckereien",
          label: "15,6 Zoll",
        },
        {
          src: wand215Img,
          alt: "Wand-Kiosk 21,5 Zoll Wandmontiertes Terminal für Restaurants",
          label: "21,5 Zoll",
        },
      ],
    },
    outdoor: {
      title: "Outdoor Kiosk — Wetterfestes Bestellterminal für Terrasse und Außenbereich",
      subtitle: "IP65-zertifiziert für Regen, Sonne und raue Witterungsbedingungen",
      description: (
        <>
          Deine Terrasse oder Biergarten ist eine Goldgrube — aber deine Gäste wollen auch draußen komfortabel bestellen. Mit unserem <strong>Outdoor Kiosk</strong> bietest du <strong>wetterfestes Self-Ordering</strong> im Außenbereich an. Das Terminal ist <strong>IP65-zertifiziert</strong> und trotzt Regen, Sonne und Temperaturschwankungen. Egal ob auf der{" "}
          <Link to="/loesungen/restaurant" className="text-blue-600 hover:underline font-medium">
            Terrasse deines Restaurants
          </Link>
          , im Biergarten oder am Strand-Kiosk — dein <strong>Outdoor-Terminal</strong> funktioniert zuverlässig auch unter extremen Bedingungen. So schaffst du überall dort eine <strong>Premium-Bestellerfahrung</strong>, wo deine Gäste gerne Zeit verbringen, und erhöhst deinen Umsatz auch im Außenbereich.
        </>
      ),
      images: [
        {
          src: outdoorImg,
          alt: "Outdoor Kiosk wetterfest für Terrasse und Biergarten",
        },
      ],
    },
  };

  const section = sections[variant];

  if (variant === "multicolor") {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-4xl">{section.title}</h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10">{section.subtitle}</p>

          {/* Image - Full Width */}
          <img
            src={section.images[0].src}
            alt={section.images[0].alt}
            className="w-full rounded-xl shadow-lg mb-10 object-cover"
            loading="lazy"
          />

          {/* Text Below Image */}
          <div className="text-base text-gray-700 leading-relaxed max-w-4xl">
            <p className="text-lg">{section.description}</p>
          </div>
        </motion.div>
      </section>
    );
  }

  if (variant === "outdoor") {
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 mb-10">{section.subtitle}</p>

          {/* Two Column Layout - Text Left, Image Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-base text-gray-700 leading-relaxed"
            >
              <p className="text-lg">{section.description}</p>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <img
                src={section.images[0].src}
                alt={section.images[0].alt}
                className="w-full max-w-md rounded-xl shadow-lg object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  // Doublescreen & Wallmount layout
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 max-w-4xl">{section.title}</h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10">{section.subtitle}</p>

        {/* Description ABOVE Images */}
        <div className="text-base text-gray-700 leading-relaxed max-w-4xl mb-12">
          <p className="text-lg">{section.description}</p>
        </div>

        {/* Images Grid - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {section.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Image Card */}
              <div className="w-full max-w-sm">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full rounded-xl shadow-md border border-gray-200 object-cover hover:shadow-lg transition-shadow"
                  loading="lazy"
                />
              </div>

              {/* Label Below Image */}
              {img.label && (
                <p className="text-center text-sm font-semibold text-gray-800 mt-4">{img.label}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HardwareSection;
