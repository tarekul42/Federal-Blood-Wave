import React from "react";
import styles from "./joinRules.module.css";
import { Link } from "react-router";

const JoinRules = ({ open, setOpen }) => {
  return (
    <div
      className={styles.jrModal}
      style={{ display: open ? "flex" : "none" }}
      onClick={() => setOpen(false)}
    >
      <div className={styles.jrClose}>
        <button className={styles.jrCloseBtn} onClick={() => setOpen(false)}>
          ❌
        </button>
      </div>

      <div className={styles.jrContent} onClick={(e) => e.stopPropagation()}>
        <h1 className={styles.jrTitle}>রক্তদাতা হওয়ার নিয়মাবলী</h1>

        <div className={styles.ruleGroup}>
          <h2 className={styles.ruleHeading}>🧬 মৌলিক যোগ্যতা</h2>
          <ul className={styles.jrList}>
            <li>✅ বয়স ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে।</li>
            <li>✅ ওজন কমপক্ষে ৫০ কেজি হতে হবে।</li>
            <li>✅ রক্তদানের পূর্বে অন্তত ৪ মাস ব্যবধান থাকতে হবে।</li>
            <li>✅ BMI (Body Mass Index) ১৮.৫ থেকে ২৪.৯ এর মধ্যে থাকতে হবে।</li>
            <li>✅ রক্তদানের আগে হালকা খাবার খাওয়া আবশ্যক।</li>
          </ul>
        </div>

        <div className={styles.ruleGroup}>
          <h2 className={styles.ruleHeading}>⚠️ নিষেধাজ্ঞা</h2>
          <ul className={styles.jrList}>
            <li>❌ গুরুতর বা সংক্রামক রোগ থাকলে রক্তদান করা যাবে না।</li>
            <li>❌ বড় কোনো অপারেশনের পর নির্দিষ্ট সময় রক্তদান নিষেধ।</li>
            <li>❌ জ্বর, ইনফেকশন বা অস্থায়ী অসুস্থতায় রক্তদান করা যাবে না।</li>
            <li>
              ❌ মাদকসেবী বা অতিরিক্ত ধূমপানকারীদের জন্য রক্তদান অনুপযুক্ত।
            </li>
            <li>
              ❌ মহিলাদের ক্ষেত্রে গর্ভাবস্থা বা মাসিক চলাকালে রক্তদান নয়।
            </li>
          </ul>
        </div>

        <div className={styles.bmiInfo}>
          <h2 className={styles.ruleHeading}>🧮 আপনার BMI যাচাই করুন</h2>
          <p className={styles.bmiText}>
            রক্তদানে যোগ্যতা নিশ্চিত করতে আপনার BMI যাচাই করে নিন। সঠিক ওজন ও
            উচ্চতার ভিত্তিতে এই মান নির্ধারিত হয়।
          </p>
          <Link to="/bmicalc" className={styles.bmiLink}>
            <button>👉 এখানে ক্লিক করে BMI ক্যালকুলেট করুন</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRules;
