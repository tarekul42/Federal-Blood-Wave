import React, { useEffect, useState } from "react";
import styles from "./auth.module.css";
import Login from "./login";
import Popup from "../popup/popup";
import SfLoading from "../loading/slfLoad";
import JoinRules from "./joinRulesModal/JoinRules";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useJoinForm } from "../../hooks/useJoinForm";
import { dhakaThana } from "../../db/data";
import { HeartPulse, ShieldCheck, Users, ArrowRight, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const Auth = () => {
  const { t } = useTranslation();
  const [isLoginAuth, setIsLoginAuth] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const handleSuccess = () => {
    window.location.reload();
  };

  const {
    regData,
    handleChange,
    accepted,
    handleCheckboxChange,
    handleSubmit,
    isLoading,
    err,
    popInfo,
    passStrength,
    password
  } = useJoinForm(handleSuccess);

  useEffect(() => {
    if (!isLoginAuth) {
      setIsJoinOpen(true);
    }
  }, [isLoginAuth]);

  const getStrengthMetrics = () => {
    if (password.length === 0) return { width: "0%", color: "bg-slate-200", text: "" };
    if (passStrength <= 1) return { width: "25%", color: "bg-red-500", text: t("auth.weak", "Weak") };
    if (passStrength === 2) return { width: "50%", color: "bg-amber-500", text: t("auth.fair", "Fair") };
    if (passStrength === 3) return { width: "75%", color: "bg-blue-500", text: t("auth.good", "Good") };
    return { width: "100%", color: "bg-emerald-500", text: t("auth.strong", "Strong") };
  };

  const strengthMetrics = getStrengthMetrics();

  return (
    <main className={styles.container}>
      {/* Left / Top Side: Promotional Hero */}
      <section className={styles.promoSection}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.promoContent}
        >
          <div className={styles.badge}>
            <HeartPulse size={16} /> 
            <span>{t("auth.promo_badge", "Save Lives Today")}</span>
          </div>
          
          <h1 className={styles.promoTitle}>
            {t("auth.promo_title", "Be the Reason Someone Smiles Today")}
          </h1>
          
          <p className={styles.promoSubtitle}>
            {t("auth.promo_subtitle", "Join our community of donors and make a direct impact on those who need it most. Registering takes just two minutes.")}
          </p>

          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><Activity size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>{t("auth.b1_title", "Save Lives")}</h3>
                <p className={styles.benefitDesc}>{t("auth.b1_desc", "Every donation can save up to 3 lives in emergency situations.")}</p>
              </div>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><Users size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>{t("auth.b2_title", "Community Impact")}</h3>
                <p className={styles.benefitDesc}>{t("auth.b2_desc", "Become a vital part of a network that supports each other in times of need.")}</p>
              </div>
            </div>
            
            <div className={styles.benefitCard}>
              <div className={styles.iconWrapper}><ShieldCheck size={24} /></div>
              <div>
                <h3 className={styles.benefitTitle}>{t("auth.b3_title", "Health Benefits")}</h3>
                <p className={styles.benefitDesc}>{t("auth.b3_desc", "Regular donation helps maintain healthy iron levels and overall wellness.")}</p>
              </div>
            </div>
          </div>

          <div className={styles.trustIndicator}>
            <div className="flex -space-x-3">
               <img className="w-10 h-10 rounded-full border-2 border-primary-dark" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
               <img className="w-10 h-10 rounded-full border-2 border-primary-dark" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
               <img className="w-10 h-10 rounded-full border-2 border-primary-dark" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
               <div className="w-10 h-10 rounded-full border-2 border-primary-dark bg-white text-primary text-xs font-black flex items-center justify-center">+500</div>
            </div>
            <p className="text-sm font-medium text-white/90">
              {t("auth.trust_text", "Join 500+ verified donors in your area")}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Right / Bottom Side: Form Area */}
      <section className={styles.formSection}>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.formCard}
        >
          {isLoginAuth ? (
            <div className="w-full">
              <Login />
              <div className={styles.switchMode}>
                <p className="text-slate-500 font-medium">{t("auth.no_account")}</p>
                <button 
                  onClick={() => setIsLoginAuth(false)}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  {t("auth.join_btn")} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-2">
                  {t("auth.signup_heading")}
                </h2>
                <p className="text-slate-500 font-medium">Create your donor profile securely.</p>
              </div>

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* Personal Info */}
                <div className={styles.inputGroup}>
                  <label htmlFor="name">{t("auth.full_name")} <span className="text-red-500">*</span></label>
                  <input type="text" id="name" name="name" className={styles.input} value={regData.name} onChange={handleChange} required placeholder="e.g. John Doe" />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="mail">{t("auth.email")} <span className="text-red-500">*</span></label>
                  <input type="email" id="mail" name="mail" className={styles.input} value={regData.mail} onChange={handleChange} required placeholder="john@example.com" />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phone">{t("auth.phone")} <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500 font-bold sm:text-sm">
                      +880
                    </span>
                    <input type="tel" id="phone" name="phone" className={`${styles.input} rounded-l-none`} value={regData.phone} onChange={handleChange} required placeholder="17XXXXXXXX" />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="password">{t("auth.password")} <span className="text-red-500">*</span></label>
                  <input type="password" id="password" name="password" className={styles.input} value={password} onChange={handleChange} required placeholder="••••••••" />
                  {password && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${strengthMetrics.color}`} style={{ width: strengthMetrics.width }} />
                      </div>
                      <p className={`text-[10px] mt-1 font-bold ${strengthMetrics.color.replace('bg-', 'text-')}`}>
                        {strengthMetrics.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Physical details & Location */}
                <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                  <div className={styles.inputGroup}>
                    <label>{t("auth.blood_group")} <span className="text-red-500">*</span></label>
                    <select name="bloodGroup" className={styles.input} value={regData.bloodGroup} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="A+ev">A+</option>
                      <option value="A-ev">A-</option>
                      <option value="B+ev">B+</option>
                      <option value="B-ev">B-</option>
                      <option value="O+ev">O+</option>
                      <option value="O-ev">O-</option>
                      <option value="AB+ev">AB+</option>
                      <option value="AB-ev">AB-</option>
                    </select>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>{t("auth.gender")} <span className="text-red-500">*</span></label>
                    <select name="gender" className={styles.input} value={regData.gender} onChange={handleChange} required>
                      <option value="">Select</option>
                      <option value="male">{t("auth.male")}</option>
                      <option value="female">{t("auth.female")}</option>
                      <option value="other">{t("auth.other")}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 col-span-1 md:col-span-2">
                  <div className={styles.inputGroup}>
                    <label>{t("auth.weight")} <span className="text-red-500">*</span></label>
                    <input type="number" name="weight" className={styles.input} value={regData.weight} onChange={handleChange} step="0.1" required placeholder="kg" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Height (Ft) <span className="text-red-500">*</span></label>
                    <select name="heightFeet" className={styles.input} value={regData.heightFeet} onChange={handleChange} required>
                      <option value="">Ft</option>
                      {[...Array(17)].map((_, i) => (<option key={i + 4} value={i + 4}>{i + 4}</option>))}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Height (In) <span className="text-red-500">*</span></label>
                    <select name="heightInch" className={styles.input} value={regData.heightInch} onChange={handleChange} required>
                      <option value="">In</option>
                      {[...Array(12)].map((_, i) => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>{t("auth.area")} <span className="text-red-500">*</span></label>
                  <select name="thana" className={styles.input} value={regData.thana} onChange={handleChange} required>
                    <option value="">Select Area</option>
                    {dhakaThana.map((data) => (
                      <option value={data.name} key={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>{t("auth.dob")} <span className="text-red-500">*</span></label>
                  <input type="date" name="dob" className={styles.input} value={regData.dob} onChange={handleChange} required />
                </div>
                
                <div className={`${styles.inputGroup} col-span-1 md:col-span-2`}>
                  <label>{t("auth.address")}</label>
                  <input type="text" name="address" className={styles.input} value={regData.address} onChange={handleChange} placeholder="House, Road, Block..." />
                </div>

                <div className={`${styles.inputGroup} col-span-1 md:col-span-2`}>
                  <label className="mb-3 block font-bold text-slate-700">{t("auth.sick_q")} <span className="text-red-500">*</span></label>
                  <div className="flex gap-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input type="radio" name="isSick" value="true" checked={regData.isSick === true} onChange={handleChange} className="w-4 h-4 text-primary focus:ring-primary" />
                      {t("auth.yes")}
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input type="radio" name="isSick" value="false" checked={regData.isSick === false} onChange={handleChange} className="w-4 h-4 text-primary focus:ring-primary" />
                      {t("auth.no")}
                    </label>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 mt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={handleCheckboxChange}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-slate-300 rounded peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                        <CheckCircle2 className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={14} />
                      </div>
                    </div>
                    <span className="text-sm text-slate-600 font-medium select-none mt-0.5">
                      {t("auth.terms_msg")}{" "}
                      <Link to="/terms" className="text-primary hover:underline font-bold">
                        {t("auth.terms")}
                      </Link>
                    </span>
                  </label>
                </div>

                {err && (
                  <div className="col-span-1 md:col-span-2 bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl text-sm font-bold flex items-center gap-2 mt-4">
                    <p>{err}</p>
                  </div>
                )}

                <div className="col-span-1 md:col-span-2 mt-6">
                  <button 
                    type="submit" 
                    disabled={isLoading || !accepted || passStrength < 2}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? <SfLoading /> : t("auth.register_btn")}
                  </button>
                </div>
              </form>

              <div className={styles.switchMode}>
                <p className="text-slate-500 font-medium">{t("auth.have_account")}</p>
                <button 
                  onClick={() => setIsLoginAuth(true)}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  {t("auth.login_link")} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <JoinRules open={isJoinOpen} setOpen={setIsJoinOpen} />
      <Popup popInfo={popInfo} />
    </main>
  );
};

export default Auth;
