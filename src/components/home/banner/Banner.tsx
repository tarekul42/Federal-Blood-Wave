import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchDonor from "../../searchDonor/SearchDonor";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  const slides = [
    "https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1536856492748-5ca5ba5fa023?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
  ];

  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slides[currIndex]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900 flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-12 max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-sm font-semibold tracking-wider uppercase">
            {t("home.banner.badge")}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            {t("home.banner.heading_1")} <span className="text-primary">{t("home.banner.heading_2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t("home.banner.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="w-full max-w-5xl bg-white/10 backdrop-blur-xl p-2 rounded-3xl border border-white/20 shadow-2xl"
        >
          <div className="bg-white rounded-2xl shadow-inner p-4 md:p-6 overflow-hidden">
             <SearchDonor />
          </div>
        </motion.div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currIndex === i ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
