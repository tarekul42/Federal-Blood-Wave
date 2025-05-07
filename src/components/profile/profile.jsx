// Profile.jsx
import React, { useState } from "react";
import styles from "./profile.module.css";
import { useAuth } from "../../App";
import { api } from "../../db/api";

const Profile = () => {
  const { profData, token } = useAuth();

  const {
    name,
    mail,
    phone,
    bloodGroup,
    dob,
    gender,
    weight,
    height,
    address,
    totalDonations,
    donationStatus,
    lastDonationDate,
    profile,
    verified,
  } = profData;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("bn-BD");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSendMail = async () => {
    setIsLoading(true);
    fetch(`${api}/donor/veriFyMailSend`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setMsg(res.message);
        } else {
          alert(res.message);
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  };

  const handleBloodDonateUpdate = () => {
    setIsLoading(true);
    fetch(`${api}/donor/update/donateStatus`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          alert(res.message);
          window.location.reload();
        } else {
          alert(res.message);
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles.profileContainer}>
      {verified || (
        <div className={styles.verifyCard}>
          <button onClick={handleSendMail} disabled={isLoading}>
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              "Verify You Email"
            )}
          </button>
          {msg && <h3 style={{ color: "#155724" }}>{msg}</h3>}
        </div>
      )}

      <div className={styles.profileCard}>
        <div className={styles.profileLeft}>
          <img src={profile?.img} alt={name} className={styles.profileImg} />
          <h2>{name}</h2>
          <p className={styles.bloodGroup}>🩸{bloodGroup}</p>
          <p className={verified ? styles.verified : styles.notVerified}>
            {verified ? "✔️ ভেরিফাইড" : "❌ ভেরিফাইড না"}
          </p>
        </div>

        <div className={styles.profileRight}>
          <h3>ব্যক্তিগত তথ্য</h3>
          <ul>
            <li>
              <strong>ইমেইল:</strong> {mail}
            </li>
            <li>
              <strong>ফোন:</strong> {phone}
            </li>
            <li>
              <strong>ঠিকানা:</strong> {address}
            </li>
            <li>
              <strong>জন্ম তারিখ:</strong> {formatDate(dob)}
            </li>
            <li>
              <strong>লিঙ্গ:</strong> {gender === "male" ? "পুরুষ" : "নারী"}
            </li>
            <li>
              <strong>উচ্চতা:</strong> {height} মিটার
            </li>
            <li>
              <strong>ওজন:</strong> {weight} কেজি
            </li>
          </ul>

          <h3>রক্ত দানের তথ্য</h3>
          <ul>
            <li>
              <strong>মোট রক্তদান:</strong> {totalDonations} বার
            </li>
            <li>
              <strong>সর্বশেষ রক্তদান:</strong> {formatDate(lastDonationDate)}
            </li>
            <li>
              <strong>স্ট্যাটাস:</strong>{" "}
              <strong>
                {donationStatus === "donated" ? "✔️ Donated" : "Active"}
              </strong>
            </li>
          </ul>

          <button
            className={styles.updateBtn}
            disabled={donationStatus === "donated" ? true : false}
            style={
              donationStatus === "donated"
                ? { cursor: "no-drop", opacity: ".4" }
                : { cursor: "pointer", opacity: "1" }
            }
            onClick={handleBloodDonateUpdate}
          >
            {donationStatus === "donated" && (
              <span className={styles.tooltiptext}>
                {gender === "female"
                  ? "Please Update your donation Status after 150 days"
                  : "Please Update your donation Status after 120 days"}
              </span>
            )}

            {isLoading ? (
              <span className={styles.loader}></span>
            ) : donationStatus === "donated" ? (
              "রক্তদানের স্ট্যাটাস আপডেট করা হয়েছে"
            ) : (
              "রক্তদানের স্ট্যাটাস আপডেট করুন"
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
