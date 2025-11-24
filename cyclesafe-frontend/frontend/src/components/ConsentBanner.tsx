import { useEffect, useState, useContext } from "react";
import styles from "./ConsentBanner.module.css";
import { ThemeContext } from "../context/ThemeContext";

const ConsentBanner = () => {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cyclesafe-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const acceptConsent = () => {
    localStorage.setItem("cyclesafe-consent", "accepted");
    setVisible(false);
  };

  const rejectConsent = () => {
    // Do NOT store anything, just close the banner
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`${styles.banner} ${
        theme === "dark" ? styles.bannerDark : styles.bannerLight
      }`}
    >
      <p>
        CycleSafe only uses essential, safe analytics to improve your experience.
        You can continue using the platform without sharing data. View our{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>

      <div className={styles.btnGroup}>
        <button className={styles.acceptBtn} onClick={acceptConsent}>
          Accept
        </button>
        <button className={styles.rejectBtn} onClick={rejectConsent}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
