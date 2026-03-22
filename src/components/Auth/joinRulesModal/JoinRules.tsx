import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ShieldCheck, HeartPulse, Info, Activity } from "lucide-react";
import styles from "./joinRules.module.css";
import { useTranslation } from "react-i18next";

interface JoinRulesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const JoinRules: React.FC<JoinRulesProps> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <div className={styles.overlay} onClick={() => setOpen(false)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Left Side: Illustration / Brand */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logoIcon}>F</div>
                <h3 className={styles.sidebarTitle}>{t("auth.modal_rules_title", "Donation Eligibility")}</h3>
            </div>
            
            <div className={styles.sidebarFooter}>
              <HeartPulse size={16} />
              <span>{t("auth.modal_trust", "Join 500+ Lifesavers")}</span>
            </div>
          </div>

          {/* Right Side: Rules Content */}
          <div className={styles.formArea}>
            <div className={styles.header}>
              <h2 className={styles.title}>{t("auth.rules_heading", "Before You Join")}</h2>
              <p className={styles.subtitle}>{t("auth.rules_subtitle", "Please ensure you meet the following criteria to ensure a safe donation process.")}</p>
            </div>

            <div className={styles.rulesListMain}>
              <div className={styles.ruleCard}>
                <ShieldCheck size={24} className="text-primary" />
                <div>
                    <h4>{t("auth.rule1_title", "Basic Criteria")}</h4>
                    <p>{t("auth.rule1_desc", "You must be between 18-60 years old and weigh at least 50kg with a healthy BMI.")}</p>
                </div>
              </div>
              <div className={styles.ruleCard}>
                <Calendar size={24} className="text-primary" />
                <div>
                    <h4>{t("auth.rule2_title", "Gap Interval")}</h4>
                    <p>{t("auth.rule2_desc", "Men can donate every 4 months, while women should wait at least 5 months between donations.")}</p>
                </div>
              </div>
              <div className={styles.ruleCard}>
                <Activity size={24} className="text-primary" />
                <div>
                    <h4>{t("auth.rule3_title", "Health Check")}</h4>
                    <p>{t("auth.rule3_desc", "You should not have any infectious diseases, recent major surgeries, or be under specific medications.")}</p>
                </div>
              </div>
              <div className={styles.ruleCard}>
                <Info size={24} className="text-primary" />
                <div>
                    <h4>{t("auth.rule4_title", "Recent Illness")}</h4>
                    <p>{t("auth.rule4_desc", "Ensure you haven't had a fever or cold in the last 7 days before donating.")}</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                onClick={() => setOpen(false)}
                className={styles.submitBtn}
              >
                {t("auth.modal_got_it", "I Understand, Proceed")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
};

export default JoinRules;
