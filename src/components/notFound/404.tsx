import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        <div className="relative mb-8">
          <h1 className="text-[180px] md:text-[220px] font-black text-slate-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 px-8 py-6">
              <p className="text-xl font-black text-slate-900">{t("not_found.title")}</p>
            </div>
          </div>
        </div>

        <p className="text-slate-500 mb-10 text-lg leading-relaxed max-w-sm mx-auto">
          {t("not_found.description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> {t("not_found.go_back")}
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            <Home size={18} /> {t("not_found.back_home")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;