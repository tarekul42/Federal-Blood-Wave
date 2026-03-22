import { useState, ChangeEvent, FormEvent } from "react";
import { api } from "../../db/api";
import Popup from "../popup/popup";
import { Send, MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [popInfo, setPopInfo] = useState<{ trigger: number | null; type: any; message: any }>({
    trigger: null,
    type: null,
    message: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { name, email, subject, message } = contactInfo;

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${api}/donor/sendMail`, { name, email, subject, message });
      setPopInfo({
        type: res.data?.success,
        trigger: Date.now(),
        message: res.data?.message,
      });
    } catch (error: any) {
      setPopInfo({
        type: false,
        trigger: Date.now(),
        message: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      setContactInfo({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t("contact.heading_1")} <span className="text-primary">{t("contact.heading_2")}</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <ContactInfoCard
              icon={Mail}
              title={t("contact.info.email")}
              value="federalbloodwave@gmail.com"
              href="mailto:federalbloodwave@gmail.com"
              color="bg-blue-50 text-blue-600"
            />
            <ContactInfoCard
              icon={Phone}
              title={t("contact.info.phone")}
              value="+880 1603 070892"
              href="tel:+8801603070892"
              color="bg-emerald-50 text-emerald-600"
            />
            <ContactInfoCard
              icon={MapPin}
              title={t("contact.info.office")}
              value={t("contact.info.office_address")}
              color="bg-purple-50 text-purple-600"
            />
            <ContactInfoCard
              icon={Clock}
              title={t("contact.info.support_hours")}
              value={t("contact.info.support_time")}
              color="bg-amber-50 text-amber-600"
            />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSendMessage}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="name"
                  label={t("contact.form.name")}
                  type="text"
                  value={name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="email"
                  label={t("contact.form.email")}
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <InputField
                name="subject"
                label={t("contact.form.subject")}
                type="text"
                value={subject}
                onChange={handleChange}
                required
              />
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.message_placeholder")}
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-300"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <Send size={22} />
                )}
                {isLoading ? t("contact.form.sending") : t("contact.form.send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Popup popInfo={popInfo} />
    </div>
  );
};

const InputField = ({
  name, label, type, value, onChange, required,
}: {
  name: string; label: string; type: string; value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) => (
  <div>
    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
      {label}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={label}
      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-slate-900 placeholder:text-slate-300"
    />
  </div>
);

const ContactInfoCard = ({
  icon: Icon, title, value, href, color,
}: {
  icon: any; title: string; value: string; href?: string; color: string;
}) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 flex items-center gap-5 shadow-sm hover:shadow-lg hover:shadow-slate-100 transition-all group">
    <div className={`p-4 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      {href ? (
        <a href={href} className="text-slate-900 font-bold hover:text-primary transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-slate-900 font-bold">{value}</p>
      )}
    </div>
  </div>
);

export default Contact;
