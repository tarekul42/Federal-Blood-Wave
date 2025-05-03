// Footer Component with FontAwesome & Module CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./footer.module.css";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Logo Section */}
        <div className={styles.footerLogo}>
          <img src={logo} alt="Federal Blood Wave Logo" />
          <p>মানবতার জন্য একধাপ এগিয়ে...</p>
        </div>

        {/* Quick Links */}
        <div className={styles.footerLinks}>
          <h4>গুরুত্বপূর্ণ লিংক</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">AboutUs</Link>
            </li>
            <li>
              <Link to="/community">community</Link>
            </li>
            <li>
              <Link to="/terms">Terms&Condition</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.footerContact}>
          <h4>যোগাযোগ</h4>
          <p>
            <strong>📍 ঠিকানা:</strong> ঢাকা, বাংলাদেশ
          </p>
          <p>
            <strong>📞 ফোন:</strong> +8801603070892
          </p>
          <p>
            <strong>📧 ইমেইল:</strong>{" "}
            <a
              href="mailto:federalbloodwave@gmail.com"
              style={{ color: "white", fontWeight: "bold" }}
            >
              federalbloodwave@gmail.com
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div className={styles.footerSocial}>
          <h4>আমাদের অনুসরণ করুন</h4>
          <div className={styles.socialIcons}>
            <Link to="https://www.facebook.com/federalbloodwave" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link to="#">
              <FontAwesomeIcon icon={faXTwitter} />
            </Link>
            <Link to="https://www.instagram.com/federalbloodwave.orga/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="#">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Federal Blood Wave. All right reserve</p>
      </div>
    </footer>
  );
};

export default Footer;
