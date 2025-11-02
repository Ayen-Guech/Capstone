import React, { useContext } from "react";
import styles from "./Footer.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`${styles.footer} ${
        theme === "dark" ? styles.footerDark : styles.footerLight
      }`}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Brand Info */}
          <div className={styles.footerCol}>
            <h4>CycleSafe</h4>
            <p>
              Your trusted space for women’s health and wellness.
              Empowering women with education, resources, and support.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#chatbot">Chatbot</a></li>
              <li><a href="#donation">Donation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <ul>
              <li><a href="#menstrual">Menstrual Health</a></li>
              <li><a href="#contraception">Contraceptive Info</a></li>
              <li><a href="#sti">STI Information</a></li>
              <li><a href="#articles">Articles</a></li>
              <li><a href="#blogs">Blogs</a></li>
            </ul>
          </div>

          {/* Contact + Socials */}
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@cyclesafe.org">info@cyclesafe.org</a></li>
              <li><a href="#">Kakuma Refugee Camp, Kenya</a></li>
            </ul>
            <div className={styles.socialLinks}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} CycleSafe. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
