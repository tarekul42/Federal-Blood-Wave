import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../db/api";
import { 
  Mail, Phone, MapPin, Calendar, User, Scale, Ruler, 
  Droplets, History, ShieldCheck, ShieldAlert, Send, RefreshCcw, Edit, ExternalLink, Heart
} from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import styles from "./profile.module.css";
import Loading from "../loading/loading";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { profData, token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  if (!profData) {
    return (
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.loadingScreen}>
            <Loading />
            <p className={styles.statDesc}>{t("profile.fetch_error")}</p>
          </div>
        </div>
      </main>
    );
  }

  const {
    name, mail, phone, bloodGroup, dob, gender, weight, height,
    address, totalDonations, donationStatus, lastDonationDate,
    profile, verified,
  } = profData as any;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return t("profile.not_provided");
    const loc = i18n.language === 'bn' ? 'bn-BD' : 'en-US';
    return new Date(dateStr).toLocaleDateString(loc, {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const handleSendMail = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${api}/donor/veriFyMailSend`, {}, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setMsg(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send verification email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBloodDonateUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`${api}/donor/update/donateStatus`, {}, {
        headers: { authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const isDonated = donationStatus === "donated";

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          {/* Left Column: Sidebar (Summary, Stats, Quick Links) */}
          <aside className={styles.sidebar}>
            {/* 1. Donor Summary Card */}
            <article className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                 <div className={styles.avatarContainer}>
                    <img 
                      src={profile?.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
                      alt={name} 
                      className={styles.avatar} 
                    />
                 </div>
              </div>
              <div className={styles.profileInfo}>
                <h2>{name || t("profile.not_provided")}</h2>
                <div className={styles.bloodAndVerif}>
                   <span className={styles.bloodGroupDisplay}>
                     <Droplets size={24} /> {bloodGroup || "??"}
                   </span>
                   <span className={styles.divider}>|</span>
                   <span className={`${styles.verificationBadge} ${verified ? styles.verifiedBadge : styles.unverifiedBadge}`}>
                      {verified ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
                      {verified ? t("profile.verified") : t("profile.unverified")}
                   </span>
                </div>
                
                <div className={`${styles.statusBadge} ${isDonated ? styles.donatedRecently : styles.availableToDonate}`}>
                  <div className={`${styles.statusDot} ${isDonated ? styles.fixedDot : styles.pulseDot}`} />
                  {isDonated ? t("profile.donated_recently") : t("profile.available_to_donate")}
                </div>
              </div>
            </article>

            {/* 2. Donation Statistics Card */}
            <article className={styles.statsCard}>
               <div className={styles.statsHeader}>
                 <History size={22} />
                 <span className={styles.statsLabel}>{t("profile.donation_history")}</span>
               </div>
               <div className={styles.statItem}>
                 <h4 className={styles.statValue}>{totalDonations || 0}</h4>
                 <p className={styles.statDesc}>{t("profile.total_donations")}</p>
               </div>
               <div className={styles.statItem}>
                 <h4 className={styles.statValueSmall}>{formatDate(lastDonationDate)}</h4>
                 <p className={styles.statDesc}>{t("profile.last_donation_date")}</p>
               </div>
            </article>

          </aside>

          {/* Right Column: Alert & Personal Details */}
          <section className={styles.mainContent}>
            {/* 4. Email Verification Banner (Now inside Main Column) */}
            {!verified && (
              <section className={styles.alert} aria-labelledby="verification-title">
                <div className={styles.alertContent}>
                  <div className={styles.alertIcon}>
                    <ShieldAlert size={28} />
                  </div>
                  <div className={styles.alertText}>
                    <h3 id="verification-title">{t("profile.unverified_email_title")}</h3>
                    <p>{t("profile.unverified_email_desc")}</p>
                  </div>
                </div>
                <button 
                  onClick={handleSendMail} 
                  disabled={isLoading || !!msg}
                  className={styles.alertBtn}
                >
                  {isLoading ? <RefreshCcw size={18} className={styles.spin} /> : <Send size={18} />}
                  {msg ? t("profile.link_sent") : t("profile.send_verification_link")}
                </button>
              </section>
            )}

            {/* 5. Personal Information Card */}
            <article className={styles.infoCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.headerTitle}>
                  <div className={styles.headerIcon}>
                    <User size={26} />
                  </div>
                  <h3>{t("profile.personal_info")}</h3>
                </div>
                <Link to="/setting" className={styles.editBtn}>
                  <Edit size={16} />
                  {t("profile.edit_profile")}
                </Link>
              </div>
              
              <div className={styles.infoGrid}>
                <InfoItem icon={Mail} label={t("profile.email")} value={mail} />
                <InfoItem icon={Phone} label={t("profile.phone")} value={phone} />
                <InfoItem icon={MapPin} label={t("profile.address")} value={address} />
                <InfoItem icon={Calendar} label={t("profile.dob")} value={formatDate(dob)} />
                <InfoItem 
                  icon={User} 
                  label={t("profile.gender")} 
                  value={gender ? (gender === "male" ? t("profile.male") : t("profile.female")) : null} 
                />
                <div className={styles.infoGrid} style={{ gap: 'var(--spacing-6)', marginTop: 0 }}>
                  <InfoItem 
                    icon={Ruler} 
                    label={t("profile.height")} 
                    value={height ? `${height} ${t("profile.meters")}` : null} 
                  />
                  <InfoItem 
                    icon={Scale} 
                    label={t("profile.weight")} 
                    value={weight ? `${weight} ${t("profile.kilograms")}` : null} 
                  />
                </div>
              </div>

              {/* Update Donation Status CTA */}
              <div className={styles.updateSection}>
                <button
                  disabled={isDonated || isLoading}
                  onClick={handleBloodDonateUpdate}
                  className={`${styles.updateBtn} ${isDonated ? styles.updateBtnDisabled : ""}`}
                >
                  {isLoading ? (
                    <RefreshCcw size={24} className={styles.spin} />
                  ) : (
                    <div className={styles.btnContent}>
                      <Droplets size={24} />
                      <div className={styles.btnText}>
                        <span className={styles.mainBtnText}>
                          {isDonated ? t("profile.status_updated") : t("profile.update_status")}
                        </span>
                        {isDonated && (
                          <span className={styles.subBtnText}>
                            {gender === "female" ? t("profile.female_wait_msg") : t("profile.male_wait_msg")}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </article>

            {/* 6. Impact Card (Consolidated at the bottom of main column) */}
            <article className={styles.footerCard}>
               <div className={styles.impactInfo}>
                  <div className={styles.impactHeader}>
                    <Heart size={22} />
                    <span>{t("profile.impact_title")}</span>
                  </div>
                  <p className={styles.impactText}>{t("profile.impact_text")}</p>
               </div>
               <Link to="/donor" className={styles.ctaBtn}>
                 {t("footer.join_donor")}
               </Link>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | null }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <Icon size={22} />
      </div>
      <div>
        <p className={styles.infoLabel}>{label}</p>
        <p className={styles.infoValue}>{value || t("profile.not_provided")}</p>
      </div>
    </div>
  );
};

export default Profile;
