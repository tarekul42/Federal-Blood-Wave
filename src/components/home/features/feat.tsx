import { motion } from "framer-motion";
import { Heart, ShieldCheck, Users } from "lucide-react";
import img1 from "../../../assets/bloodD14.png";
import img2 from "../../../assets/bloodD16.png";
import img3 from "../../../assets/bloodD19.png";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("home.features.feat1_title"),
      desc: t("home.features.feat1_desc"),
      img: img1,
      icon: Heart,
      color: "bg-red-50 text-red-600",
    },
    {
      title: t("home.features.feat2_title"),
      desc: t("home.features.feat2_desc"),
      img: img2,
      icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: t("home.features.feat3_title"),
      desc: t("home.features.feat3_desc"),
      img: img3,
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {t("home.features.heading_why")} <span className="text-primary">Federal Blood Wave</span>?
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="relative mb-8 overflow-hidden rounded-2xl h-48 w-full bg-slate-200">
                <img 
                  src={feat.img} 
                  alt={feat.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4">
                  <div className={`p-3 rounded-xl shadow-lg ${feat.color}`}>
                    <feat.icon size={24} />
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
