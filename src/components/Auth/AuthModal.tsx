import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, MapPin, Droplet, Calendar, Scale, Ruler, ShieldCheck, HeartPulse, Chrome, Facebook } from "lucide-react";
import styles from "./AuthModal.module.css";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useTranslation } from "react-i18next";
import { dhakaThana } from "../../db/data";
import SfLoading from "../loading/slfLoad";
import Popup from "../popup/popup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = "signup" }) => {
  const { t } = useTranslation();
  const {
    formData,
    isLogin,
    toggleMode,
    handleChange,
    accepted,
    handleCheckboxChange,
    handleSubmit,
    isLoading,
    err,
    popInfo,
    passStrength,
  } = useAuthForm(onClose);

  // Sync initial mode if needed (simplified)
  React.useEffect(() => {
    // Logic to set initial mode if required, but let's keep it simple for now
  }, [initialMode]);

  if (!isOpen) return null;

  const getStrengthMetrics = () => {
    if (formData.password.length === 0) return { width: "0%", color: "bg-slate-200", text: "" };
    if (passStrength <= 1) return { width: "25%", color: "bg-red-500", text: t("auth.weak") };
    if (passStrength === 2) return { width: "50%", color: "bg-amber-500", text: t("auth.fair") };
    if (passStrength === 3) return { width: "75%", color: "bg-blue-500", text: t("auth.good") };
    return { width: "100%", color: "bg-emerald-500", text: t("auth.strong") };
  };

  const strength = getStrengthMetrics();

  return createPortal(
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Left Side: Visual/Context */}
          <div className={styles.sidebar}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>F</div>
              <div>
                <span className={styles.logoText}>BloodWave</span>
                <span className={styles.logoSub}>Federal</span>
              </div>
            </div>
            
            <div className={styles.promoContent}>
              <HeartPulse className={styles.pulseIcon} size={48} />
              <h3>{t("auth.promo_title")}</h3>
              <p>{t("auth.promo_subtitle")}</p>
            </div>

            <div className={styles.sidebarFooter}>
              <ShieldCheck size={16} />
              <span>{t("auth.trust_text")}</span>
            </div>
          </div>

          {/* Right Side: Tabbed Form */}
          <div className={styles.formArea}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${!isLogin ? styles.activeTab : ""}`}
                onClick={() => !isLogin || toggleMode()}
              >
                {t("auth.signup_heading")}
              </button>
              <button 
                className={`${styles.tab} ${isLogin ? styles.activeTab : ""}`}
                onClick={() => isLogin || toggleMode()}
              >
                {t("auth.login_heading")}
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {!isLogin && (
                <div className={styles.inputRow}>
                  <div className={styles.inputWrapper}>
                    <label><User size={14} /> {t("auth.full_name")}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                </div>
              )}

              <div className={styles.inputRow}>
                <div className={styles.inputWrapper}>
                  <label><Mail size={14} /> {t("auth.email")}</label>
                  <input type="email" name="mail" value={formData.mail} onChange={handleChange} required placeholder="john@example.com" />
                </div>
              </div>

              {!isLogin && (
                <div className={styles.inputRow}>
                  <div className={styles.inputWrapper}>
                    <label><Phone size={14} /> {t("auth.phone")}</label>
                    <div className={styles.phoneInput}>
                      <span>+880</span>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="17XXXXXXXX" />
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.inputRow}>
                <div className={styles.inputWrapper}>
                  <label><Lock size={14} /> {t("auth.password")}</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                  {!isLogin && formData.password && (
                    <div className={styles.strengthMeter}>
                      <div className={styles.meterBar}><div style={{ width: strength.width }} className={`${styles.meterFill} ${strength.color}`} /></div>
                      <span>{strength.text}</span>
                    </div>
                  )}
                </div>
              </div>

              {!isLogin && (
                <>
                  <div className={styles.gridRow}>
                    <div className={styles.inputWrapper}>
                      <label><Droplet size={14} /> {t("auth.blood_group")}</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
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
                    <div className={styles.inputWrapper}>
                      <label><User size={14} /> {t("auth.gender")}</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="male">{t("auth.male")}</option>
                        <option value="female">{t("auth.female")}</option>
                        <option value="other">{t("auth.other")}</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.gridRow}>
                    <div className={styles.inputWrapper}>
                      <label><MapPin size={14} /> {t("auth.area")}</label>
                      <select name="thana" value={formData.thana} onChange={handleChange} required>
                        <option value="">Select Area</option>
                        {dhakaThana.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                      </select>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label><Calendar size={14} /> {t("auth.dob")}</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className={styles.gridRow}>
                    <div className={styles.inputWrapper}>
                      <label><Scale size={14} /> {t("auth.weight")}</label>
                      <input type="number" name="weight" value={formData.weight} onChange={handleChange} required placeholder="kg" />
                    </div>
                    <div className={styles.heightWrapper}>
                      <label><Ruler size={14} /> Height</label>
                      <div className={styles.heightInputs}>
                         <select name="heightFeet" value={formData.heightFeet} onChange={handleChange} required>
                           <option value="">Ft</option>
                           {[...Array(5)].map((_,i) => <option key={i+4} value={i+4}>{i+4}</option>)}
                         </select>
                         <select name="heightInch" value={formData.heightInch} onChange={handleChange} required>
                           <option value="">In</option>
                           {[...Array(12)].map((_,i) => <option key={i} value={i}>{i}</option>)}
                         </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.terms}>
                    <input type="checkbox" id="terms" checked={accepted} onChange={handleCheckboxChange} />
                    <label htmlFor="terms">
                      {t("auth.terms_msg")} <span className={styles.link}>{t("auth.terms")}</span>
                    </label>
                  </div>
                </>
              )}

              {err && <div className={styles.error}>{err}</div>}

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isLoading || (!isLogin && (!accepted || passStrength < 2))}
              >
                {isLoading ? <SfLoading /> : (isLogin ? t("auth.login_btn") : t("auth.register_btn"))}
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.socialButtons}>
                <button type="button" className={styles.socialBtn}>
                  <Chrome size={18} /> Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <Facebook size={18} /> Facebook
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Popup popInfo={popInfo} />
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
};

export default AuthModal;
