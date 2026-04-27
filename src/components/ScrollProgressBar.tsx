import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/5">
      <div className="h-full bg-cyan-brand transition-[width] duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgressBar;
