import React from "react";
import styles from "./About.module.css";
import founderImg from "../../assets/founder.png"; // Replace with your actual path
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEarth } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>আমাদের সম্পর্কে</h1>
        <p className={styles.description}>
          ফেডারেল ব্লাড ওয়েভ একটি সম্পূর্ণ মানবিক উদ্যোগ যা রক্তদানের মাধ্যমে
          সমাজে একটি বড় পরিবর্তন আনার লক্ষ্যে প্রতিষ্ঠিত হয়েছে। আমরা বিশ্বাস
          করি, প্রতিটি জীবন মূল্যবান এবং এক ফোঁটা রক্ত অনেকের প্রাণ বাঁচাতে
          পারে। আমাদের প্ল্যাটফর্মটি স্বেচ্ছাসেবী রক্তদাতাদের সহজে খুঁজে পাওয়ার
          সুবিধা দেয় এবং প্রয়োজনে তাৎক্ষণিক সহায়তা করে। আমরা প্রযুক্তি ও
          মানুষের মানবিক মনোভাবকে একত্রিত করে একটি সুস্থ সমাজ গড়ে তুলতে কাজ
          করছি। আমাদের সার্ভিস বিনামূল্যে, এবং আমরা সবসময় খোলা মনে সবাইকে
          স্বাগত জানাই। আমরা নিরাপদ রক্তদান নিশ্চিত করতে সর্বোচ্চ গুরুত্ব দিয়ে
          থাকি। আমাদের লক্ষ্য প্রতিটি থানা পর্যায়ে ব্লাড নেটওয়ার্ক গড়ে তোলা।
          মানুষের সেবাই আমাদের প্রধান উদ্দেশ্য এবং সেই লক্ষ্যেই আমরা নিরলসভাবে
          কাজ করে যাচ্ছি।
        </p>

        <h2 className={styles.subtitle}>
          ফেডারেল ব্লাড ওয়েভ কেন শুরু করা হয়েছে?
        </h2>
        <p className={styles.reason}>
          ১. রক্তের সংকট মেটাতে
          <br />
          ২. জরুরি পরিস্থিতিতে দ্রুত রক্তদাতা খুঁজে পেতে
          <br />
          ৩. রক্তদানের সচেতনতা বাড়াতে
          <br />
          ৪. একটি সুশৃঙ্খল ব্লাড ডোনেশন নেটওয়ার্ক গড়ে তুলতে
          <br />
          ৫. প্রযুক্তি ব্যবহার করে মানবতার সেবা নিশ্চিত করতে
          <br />
          ৬. মানুষের মধ্যে সহমর্মিতা ও মানবিকতা জাগিয়ে তুলতে
          <br />
          ৭. তরুণ সমাজকে স্বেচ্ছাসেবী কাজে উদ্বুদ্ধ করতে
        </p>

        <h2 className={styles.subtitle}>আমাদের মিশন</h2>
        <ul className={styles.list}>
          <li>সকলের জন্য রক্তদানের সুযোগ নিশ্চিত করা</li>
          <li>দ্রুত রক্তদাতা সংগ্রহে সহায়তা করা</li>
          <li>বিনামূল্যে সেবা প্রদান</li>
          <li>সত্যতা যাচাই করা ডোনার তালিকা প্রদান</li>
          <li>সামাজিক যোগাযোগ ও একতাবদ্ধতা বৃদ্ধি করা</li>
          <li>প্রতিটি এলাকায় রক্তদাতার ডাটাবেজ তৈরি করা</li>
        </ul>

        <h2 className={styles.subtitle}>আমাদের ভিশন</h2>
        <ul className={styles.list}>
          <li>রক্তের জন্য আর কোনো প্রাণ যেন হারাতে না হয়</li>
          <li>প্রতিটি থানা ও ওয়ার্ডে ব্লাড ব্যাংক গড়ে তোলা</li>
          <li>একটি ভার্চুয়াল রক্তদাতা কমিউনিটি তৈরি করা</li>
          <li>সকলের জন্য দ্রুত, নিরাপদ ও বিনামূল্যে সেবা</li>
          <li>রক্তদানের একটি সংস্কৃতি গড়ে তোলা</li>
          <li>সামাজিক দায়িত্ববোধ বৃদ্ধি করা</li>
          <li>ভবিষ্যৎ প্রজন্মকে সচেতন ও মানবিক হিসেবে গড়ে তোলা</li>
        </ul>

        <h2 className={styles.subtitle}>আমরা বর্তমানে কাজ করছি</h2>
        <p className={styles.areas}>
          ✅ ঢাকা শহরের বিভিন্ন এলাকা যেমন – মিরপুর, মোহাম্মদপুর, ধানমন্ডি,
          বসুন্ধরা, গুলশান, উত্তরা, বাড্ডা, খিলগাঁও, মালিবাগ ও পুরান ঢাকা।
        </p>

        <h2 className={styles.subtitle}>প্রতিষ্ঠাতা সম্পর্কে</h2>
        <div className={styles.founderSection}>
          <div className={styles.founderInfo}>
            <img src={founderImg} alt="Founder" className={styles.founderImg} />
            <p>
              <strong style={{ fontSize: "1.5rem" }}>Hi</strong> আমি আবদুল্লাহ
              সাঈদ, একজন ওয়েব ডেভেলপার ও প্রযুক্তিপ্রেমী। ফেডারেল ব্লাড ওয়েভের
              প্রতিষ্ঠাতা হিসেবে আমার লক্ষ্য হচ্ছে প্রযুক্তিকে মানবতার সেবায়
              কাজে লাগানো। আমি দীর্ঘদিন ধরে ওয়েব প্রযুক্তির সঙ্গে জড়িত এবং
              সমাজসেবামূলক কাজে আগ্রহী। রক্তের জন্য মানুষের আকুলতা দেখে আমি এই
              উদ্যোগ শুরু করি। এটি শুধু একটি প্ল্যাটফর্ম নয়, বরং একটি কমিউনিটির
              অংশ। আমার ইচ্ছা, প্রতিটি মানুষ যেন প্রয়োজনে নিরাপদ রক্ত পেতে
              পারে। আমি সর্বদা বিশ্বাস করি, প্রযুক্তি দিয়ে সমাজে বড় পরিবর্তন
              আনা সম্ভব। এই উদ্যোগে সকলের সহযোগিতা কাম্য।
              <br />
              <br />
              ধন্যবাদ, <br />
              আবদুল্লাহ সাঈদ
            </p>
          </div>
          <div className={styles.founderSocial}>
            <Link
              to={"https://www.instagram.com/abdullah_shayed/"}
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/heyabdullahbro"}
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
            <Link to={"https://x.com/MrPieX"} target="_blank">
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
            <Link to={"https://www.facebook.com/profile.php?id=100040632451349"} target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link to={"https://github.com/heyabdullahbruh"} target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link to={"https://abdullah-shayed.vercel.app/about"} target="_blank">
              <FontAwesomeIcon icon={faEarth} />
            </Link>
            <Link to={"mailto:abdullah.shayed@protonmail.com"} target="_blank">
              📧
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
