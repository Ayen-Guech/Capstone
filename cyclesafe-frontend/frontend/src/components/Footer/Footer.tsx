import React, { useContext } from "react";
import styles from "./Footer.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Navigation behavior same as Header
  const goTo = (section: string) => {
    // Page routes
    if (
      section === "contraception" ||
      section === "sti" ||
      section === "menstrual" ||
      section === "articles" ||
      section === "blog" ||
      section === "srh-dashboard" ||
      section === "privacy-policy" ||
      section === "community-guidelines" ||
      section === "settings"
    ) {
      navigate(`/${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } 
    
    // Scrollable Homepage sections
    else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 220);
    }
  };

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
              <li><a onClick={() => goTo("home")}>Home</a></li>
              <li><a onClick={() => goTo("about")}>About</a></li>
              <li><a onClick={() => goTo("chatbot")}>Chatbot</a></li>
              <li><a onClick={() => goTo("donation")}>Donation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerCol}>
            <h4>Resources</h4>
            <ul>
              <li><a onClick={() => goTo("menstrual")}>Menstrual Health</a></li>
              <li><a onClick={() => goTo("contraception")}>Contraceptive Info</a></li>
              <li><a onClick={() => goTo("sti")}>STI Information</a></li>
              <li><a onClick={() => goTo("articles")}>Articles</a></li>
              <li><a onClick={() => goTo("blog")}>Blogs</a></li>
            </ul>
          </div>

          {/* Legal & Community */}
          <div className={styles.footerCol}>
            <h4>Legal & Community</h4>
            <ul>
              <li><a onClick={() => goTo("privacy-policy")}>Privacy Policy</a></li>
              <li><a onClick={() => goTo("community-guidelines")}>Community Guidelines</a></li>
              <li><a onClick={() => goTo("settings")}>Settings</a></li>
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
