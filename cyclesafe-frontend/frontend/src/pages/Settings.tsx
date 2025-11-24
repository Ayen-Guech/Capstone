import React, { useContext, useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { ThemeContext } from "../context/ThemeContext";

const Settings: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");

  // Read consent status from localStorage
  useEffect(() => {
    const consent = localStorage.getItem("cyclesafe-consent") === "accepted";
    setConsentGiven(consent);
  }, []);

  const handleGiveConsent = () => {
    localStorage.setItem("cyclesafe-consent", "accepted");
    setConsentGiven(true);
    setFeedback("Your consent has been saved. Thank you for trusting CycleSafe.");
  };

  const handleRevokeConsent = () => {
    localStorage.removeItem("cyclesafe-consent");
    setConsentGiven(false);
    setFeedback(
      "Your consent has been revoked. You can still use CycleSafe in view-only mode."
    );
  };

  const handleClearData = () => {
    const confirmClear = window.confirm(
      "This will clear your local CycleSafe data from this device. This cannot be undone. Do you want to continue?"
    );
    if (!confirmClear) return;

    // Remove known local keys safely (adjust keys as needed for your app)
    localStorage.removeItem("cyclesafe-consent");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("cyclesafe-data"); // if you store cycle logs here

    setConsentGiven(false);
    setFeedback("Your local CycleSafe data has been cleared from this device.");
  };

  return (
    <div
      className={`${styles.settingsWrapper} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <h1 className={styles.title}>CycleSafe Settings</h1>
      <p className={styles.subtitle}>
        Manage your privacy, consent, and local data on this device.
      </p>

      {/* Consent Card */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Consent & Privacy</h2>
        <p className={styles.text}>
          CycleSafe is designed for anonymous, safe usage. You can choose whether your
          menstrual and health tracking data is stored on this device. You can change
          this decision at any time.
        </p>

        <p className={styles.status}>
          <strong>Current Consent Status:</strong>{" "}
          {consentGiven ? "Consent Given" : "No Consent Saved"}
        </p>

        <div className={styles.buttonRow}>
          <button onClick={handleGiveConsent} className={styles.primaryButton}>
             Give / Update Consent
          </button>
          <button onClick={handleRevokeConsent} className={styles.secondaryButton}>
             Revoke Consent
          </button>
        </div>
      </div>

      {/* Data Card */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>My Data on This Device</h2>
        <p className={styles.text}>
          You can remove locally stored CycleSafe data from this device if you no longer
          wish to keep it. This action does not affect other devices.
        </p>

        <button onClick={handleClearData} className={styles.dangerButton}>
          Clear & Reset My Data
        </button>
      </div>

      {feedback && <p className={styles.feedback}>{feedback}</p>}

      <p className={styles.note}>
        For your safety, never share your real name, contact details, or exact location
        inside CycleSafe.
      </p>
    </div>
  );
};

export default Settings;
