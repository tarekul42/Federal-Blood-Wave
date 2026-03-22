import { motion } from "framer-motion";
import founderImg from "../../assets/founder.png";
import { Link } from "react-router";
import { 
  Facebook, Github, Instagram, Linkedin, Twitter, 
  Globe, Mail, CheckCircle2, Target, Eye, MapPin
} from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const reasons = t("about.why_start.reasons", { returnObjects: true }) as string[];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h1 
            {...fadeIn}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight"
          >
            {t("about.hero.heading_1")} <span className="text-primary">{t("about.hero.heading_2")}</span>
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium"
          >
            {t("about.hero.description")}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-8 border-primary pl-6">
              {t("about.why_start.heading")}
            </h2>
            <div className="space-y-4">
              {Array.isArray(reasons) && reasons.map((text, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-primary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-slate-700 font-bold">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[40px] -rotate-3" />
            <div className="relative bg-white p-8 rounded-[40px] border border-slate-100 shadow-2xl flex flex-col gap-8">
              <div className="bg-red-50 p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-4 text-primary">
                  <Target size={32} />
                  <h3 className="text-2xl font-black">{t("about.mission.heading")}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {t("about.mission.text")}
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-4 text-blue-600">
                  <Eye size={32} />
                  <h3 className="text-2xl font-black">{t("about.vision.heading")}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {t("about.vision.text")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Areas */}
        <motion.div 
          {...fadeIn}
          className="bg-slate-900 rounded-[40px] p-12 text-center text-white mb-32"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl">
              <MapPin size={32} className="text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-black mb-6">{t("about.working_areas.heading")}</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t("about.working_areas.text")} <span className="text-white font-bold">{t("about.working_areas.areas")}</span>
          </p>
        </motion.div>

        {/* Founder Section */}
        <motion.section {...fadeIn} className="pt-24 border-t border-slate-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">
              {t("about.founder.heading_1")} <span className="text-primary">{t("about.founder.heading_2")}</span>
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 bg-slate-50 p-12 flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl" />
                <img 
                  src={founderImg} 
                  alt="Founder" 
                  className="relative w-48 h-48 rounded-full object-cover border-8 border-white shadow-xl" 
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">আবদুল্লাহ সাঈদ</h3>
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-8">{t("about.founder.role")}</p>
              
              <div className="flex gap-4">
                <FounderSocial href="https://www.facebook.com/federalbloodwave" icon={Facebook} />
                <FounderSocial href="https://x.com/MrPieX" icon={Twitter} />
                <FounderSocial href="https://www.linkedin.com/in/heyabdullahbro" icon={Linkedin} />
                <FounderSocial href="https://abdullah-shayed.vercel.app/about" icon={Globe} />
              </div>
            </div>
            
            <div className="lg:col-span-3 p-12 flex flex-col justify-center">
              <p className="text-xl italic text-slate-400 mb-8 leading-relaxed">
                {t("about.founder.quote")}
              </p>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {t("about.founder.description")}
              </p>
              <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                   <Mail size={24} />
                 </div>
                 <div>
                   <p className="text-xs font-black uppercase tracking-widest text-slate-400">{t("about.founder.direct_contact")}</p>
                   <p className="text-slate-900 font-bold">abdullah.shayed@protonmail.com</p>
                 </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const FounderSocial = ({ href, icon: Icon }: { href: string; icon: any }) => (
  <Link 
    to={href} 
    target="_blank"
    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-lg transition-all"
  >
    <Icon size={20} />
  </Link>
);

export default About;
