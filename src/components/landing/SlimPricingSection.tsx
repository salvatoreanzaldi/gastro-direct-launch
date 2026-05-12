import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";
import { useTranslation } from "react-i18next";
import { useLangPath } from "@/components/LanguageLayout";

// ── 3 Pakete (A/B-Test-Variante: Beginner + Pro ausgeblendet, neue Namen) ─────

interface SlimPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: string | null;
  priceYearly: string | null;
  duration: string;
  popular?: boolean;
  monthlyNote?: string;
  yearlyNote?: string;
}

// ── WebGL Shader ──────────────────────────────────────────────────────────────

const SlimShaderCanvas = ({ isVisible }: { isVisible: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgRef = useRef<[number, number, number]>([0.05, 0.08, 0.18]);
  const bgLocRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      // Always use dark blue, regardless of light/dark mode
      bgRef.current = [0.05, 0.08, 0.18];
      const gl = glRef.current;
      const prog = progRef.current;
      const loc = bgLocRef.current;
      if (gl && prog && loc) {
        gl.useProgram(prog);
        gl.uniform3fv(loc, new Float32Array(bgRef.current));
      }
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const vert = `attribute vec2 aPosition; void main(){gl_Position=vec4(aPosition,0.,1.);}`;
    const frag = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBg;
      mat2 rotate2d(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
      float variation(vec2 v1,vec2 v2,float str,float spd){
        return sin(dot(normalize(v1),normalize(v2))*str+iTime*spd)/100.0;
      }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff=center-uv;
        float len=length(diff);
        len+=variation(diff,vec2(0.,1.),5.,2.);
        len-=variation(diff,vec2(1.,0.),5.,2.);
        float c=smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(c);
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/iResolution.xy;
        float aspect=iResolution.x/iResolution.y;
        uv.x=(uv.x-0.5)*aspect+0.5;
        float mask=0.;
        float radius=.27;
        vec2 center=vec2(0.5,0.42);
        mask+=paintCircle(uv,center,radius,.035).r;
        mask+=paintCircle(uv,center,radius-.018,.01).r;
        mask+=paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 fg=vec3(v.x,v.y,.7-v.y*v.x);
        vec3 color=mix(uBg,fg,mask);
        color=mix(color,vec3(1.),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);
    progRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(prog, "iTime");
    const iResLoc  = gl.getUniformLocation(prog, "iResolution");
    bgLocRef.current = gl.getUniformLocation(prog, "uBg");
    gl.uniform3fv(bgLocRef.current, new Float32Array(bgRef.current));

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const render = (t: number) => {
      if (!isVisible) return;
      gl.uniform1f(iTimeLoc, t * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    if (isVisible) {
      rafRef.current = requestAnimationFrame(render);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [isVisible]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// ── Check icon ────────────────────────────────────────────────────────────────

const SlimCheckIcon = ({ dark }: { dark: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
    className={dark ? "text-cyan-400" : "text-cyan-600"}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Card ──────────────────────────────────────────────────────────────────────

interface SlimCardProps {
  name: string; tagline: string;
  price: string | null; yearlyPrice: string | null;
  isYearly: boolean;
  features: string[];
  duration: string; popular?: boolean; isDark: boolean;
  onCta: () => void; ctaLabel: string; fromLabel: string;
  perMonthLabel: string; vatNote: string; durationLabel: string;
  onRequestLabel: string; index: number;
  popularLabel: string; yearlyNoteText: string; monthlyNoteText: string;
}

const SlimCard = ({
  name, tagline, price, yearlyPrice, isYearly, features, duration, popular, isDark,
  onCta, ctaLabel, fromLabel, perMonthLabel, vatNote, durationLabel, onRequestLabel, index,
  popularLabel, yearlyNoteText, monthlyNoteText
}: SlimCardProps) => {
  const displayPrice = isYearly && yearlyPrice ? yearlyPrice : price;
  const hasPrice = displayPrice !== null;

  // Always use dark mode colors since background is always dark blue
  const cardBase = "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:from-white/14 hover:border-white/20";

  const popularRing = "ring-2 ring-cyan-400/40 border-cyan-400/30 from-white/[0.18] to-white/[0.08] shadow-2xl shadow-cyan-400/10";

  const textPrimary   = "text-white";
  const textSecondary = "text-white/50";
  const textMuted     = "text-white/30";
  const divider       = "bg-gradient-to-r from-transparent via-white/20 to-transparent";

  const btnSecondary = "bg-white/10 border border-white/20 text-white hover:bg-white/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`
        relative flex flex-col rounded-2xl px-6 py-7 flex-1
        backdrop-blur-[14px] border transition-all duration-300
        ${cardBase} ${popular ? popularRing : ""}
        ${popular ? "scale-105 z-10" : ""}
      `}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-[11px] font-bold rounded-full whitespace-nowrap bg-gradient-to-r from-amber-400 to-orange-400 text-white">
          {popularLabel}
        </div>
      )}

      <div className="mb-4">
        <h3 className={`text-xl font-black mb-0.5 ${textPrimary}`}>{name}</h3>
        <p className={`text-xs ${textSecondary}`}>{tagline}</p>
      </div>

      <div className="mb-5">
        {hasPrice ? (
          <>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xs ${textSecondary}`}>{fromLabel}</span>
              <motion.span
                key={displayPrice}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-4xl font-black ${textPrimary}`}
              >
                {displayPrice}€
              </motion.span>
              {isYearly && yearlyPrice && price && yearlyPrice !== price && (
                <span className={`text-sm line-through ${textMuted}`}>{price}€</span>
              )}
              <span className={`text-xs ${textSecondary}`}>{perMonthLabel}</span>
            </div>
            <span className={`text-xs ${textMuted}`}>{vatNote}</span>
            {isYearly && yearlyPrice ? (
              <p className={`text-xs mt-1 ${textMuted}`}>
                {yearlyNoteText}
              </p>
            ) : (
              <p className={`text-xs mt-1 ${textMuted}`}>
                {monthlyNoteText}
              </p>
            )}
          </>
        ) : (
          <span className={`text-xl font-bold ${textPrimary}`}>{onRequestLabel}</span>
        )}
      </div>

      <div className={`w-full h-px mb-5 ${divider}`} />

      <ul className="flex flex-col gap-2 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-white/80">
            <span className="mt-0.5 shrink-0"><SlimCheckIcon dark={true} /></span>
            {f}
          </li>
        ))}
      </ul>

      <p className={`text-[11px] mb-4 ${textMuted}`}>{durationLabel}: {duration}</p>

      <RippleButton
        onClick={onCta}
        className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
          popular
            ? "bg-gradient-to-r from-amber-400 to-orange-400 text-primary hover:opacity-90"
            : btnSecondary
        }`}
      >
        {ctaLabel}
      </RippleButton>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const SlimPricingSection = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const lp = useLangPath();
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );
  const [isYearly, setIsYearly] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      setIsCanvasVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    if (sectionRef.current) {
      io.observe(sectionRef.current);
    }
    return () => io.disconnect();
  }, []);

  const scrollToForm = () => {
    navigate(lp("/kontakt"));
  };

  const arr = (key: string) => { const v = t(key, { returnObjects: true }); return Array.isArray(v) ? v : []; };
  const packageFeaturesMap = t("pricing.packageFeatures", { returnObjects: true }) as Record<string, readonly string[]>;
  const slimPlans = arr("pricing.slimPlans") as SlimPlan[];

  const sectionBg  = "bg-[#0d1430]"; // Always dark blue
  const headingCol = "text-white";
  const subCol     = "text-white/60";
  const noteCol    = "text-white/30";
  const badgeCol   = "text-cyan-400";
  const textPrimary   = "text-white";
  const textSecondary = "text-white/50";

  return (
    <section ref={sectionRef} className={`section-padding relative overflow-hidden ${sectionBg}`} id="preise-slim">
      <SlimShaderCanvas isVisible={isCanvasVisible} />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className={`text-sm font-semibold uppercase tracking-wider mb-3 block ${badgeCol}`}>
            {t("pricing.badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 ${headingCol}`}>
            {t("pricing.headline")}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${subCol}`}>
            {t("pricing.sub")}
          </p>
        </motion.div>

        {/* ── Billing Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-5 mb-8"
        >
          {/* Monatlich label */}
          <div className="text-right">
            <p className={`text-sm font-bold transition-colors duration-200 ${!isYearly ? textPrimary : textSecondary}`}>
              {t("pricing.billingMonthly")}
            </p>
            <p className={`text-sm transition-colors duration-200 ${!isYearly ? textSecondary : isDark ? "text-white/25" : "text-gray-300"}`}>
              {t("pricing.billingMonthlyNote")}
            </p>
          </div>

          {/* Toggle pill */}
          <button
            onClick={() => setIsYearly(!isYearly)}
            aria-label={t("pricing.billingMonthly")}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex-shrink-0 ${
              isYearly ? "bg-cyan-500" : "bg-white/20"
            }`}
          >
            <motion.span
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
              animate={{ left: isYearly ? 32 : 4 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            />
          </button>

          {/* Jährlich label */}
          <div className="text-left">
            <p className={`text-sm font-bold transition-colors duration-200 ${isYearly ? textPrimary : textSecondary}`}>
              {t("pricing.billingYearly")}
            </p>
            <p className={`text-sm transition-colors duration-200 ${isYearly ? textSecondary : isDark ? "text-white/25" : "text-gray-300"}`}>
              {t("pricing.billingYearlyNote")}
            </p>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-center max-w-4xl mx-auto">
          {slimPlans.map((plan, i) => {
            const features = packageFeaturesMap[plan.id] ?? [];
            const hasPrice = plan.priceMonthly !== null;
            return (
              <SlimCard
                key={plan.id}
                index={i}
                isDark={isDark}
                name={plan.name}
                tagline={plan.tagline}
                price={plan.priceMonthly}
                yearlyPrice={plan.priceYearly}
                isYearly={isYearly}
                features={features as string[]}
                duration={plan.duration}
                popular={plan.popular}
                onCta={scrollToForm}
                ctaLabel={hasPrice ? t("pricing.ctaPrimary") : t("pricing.ctaSecondary")}
                fromLabel={t("pricing.from")}
                perMonthLabel={t("pricing.perMonth")}
                vatNote={t("pricing.vatNote")}
                durationLabel={t("pricing.durationLabel")}
                onRequestLabel={t("pricing.onRequest")}
                popularLabel={t("pricing.badgePopular")}
                yearlyNoteText={plan.yearlyNote ?? t("pricing.yearlyNote")}
                monthlyNoteText={plan.monthlyNote ?? t("pricing.monthlyNote")}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className={`text-xs ${noteCol}`}>{t("pricing.setupNote")}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SlimPricingSection;
