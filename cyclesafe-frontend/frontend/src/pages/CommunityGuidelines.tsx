import React, { useContext } from "react";
import styles from "./Community.module.css"; // ✔ Correct import
import { ThemeContext } from "../context/ThemeContext"; // ✔ Dark/Light Mode

const CommunityGuidelines = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.guidelinesWrapper} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <h1 className={styles.title}>CycleSafe Community Guidelines</h1>

      <p className={styles.intro}>
        CycleSafe provides a safe space for girls and women to support each other
        and learn about menstrual and reproductive health. To protect all users —
        especially minors — everyone must follow these rules:
      </p>

      <h2 className={styles.sectionTitle}>1. Respect & Dignity</h2>
      <ul className={styles.rulesList}>
        <li>Be kind and supportive</li>
        <li>No body shaming, insults, or personal attacks</li>
        <li>Do not judge others for their beliefs or experiences</li>
      </ul>

      <h2 className={styles.sectionTitle}>2. Privacy & Anonymity</h2>
      <ul className={styles.rulesList}>
        <li>Do NOT share names, photos, phone numbers, or locations</li>
        <li>Do NOT request personal information from others</li>
        <li>All posts and comments must remain anonymous</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. Safe Conversations</h2>
      <ul className={styles.rulesList}>
        <li>Keep discussions supportive and educational</li>
        <li>No pressure to share personal experiences</li>
        <li>No unsafe medical advice or misinformation</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Protection of Minors</h2>
      <ul className={styles.rulesList}>
        <li>No sexual content or explicit discussions</li>
        <li>No grooming, flirting, or requesting identity</li>
        <li>Sensitive topics must remain educational only</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Prohibited Content</h2>
      <ul className={styles.rulesList}>
        <li>No harassment, hate speech, or bullying</li>
        <li>No false medical claims</li>
        <li>No sale of products, drugs, or services</li>
        <li>No requests for personal data</li>
        <li>No sexually explicit language</li>
      </ul>

      <h2 className={styles.sectionTitle}>6. Educational Disclaimer</h2>
      <p className={styles.intro}>
        Community content does not replace professional medical advice. If you experience pain,
        irregular bleeding, or medical emergencies, contact a healthcare provider immediately.
      </p>

      <h2 className={styles.sectionTitle}>7. Moderation Rules</h2>
      <ul className={styles.rulesList}>
        <li>Harmful or unsafe content may be removed</li>
        <li>Repeated violations may lead to restrictions</li>
        <li>Reports are reviewed within 24–48 hours</li>
      </ul>

      <h2 className={styles.sectionTitle}>8. Cultural Sensitivity</h2>
      <ul className={styles.rulesList}>
        <li>Respect diverse cultures, beliefs, and traditions</li>
        <li>Use inclusive, non-offensive language</li>
        <li>Avoid insults toward cultures, tribes, or religions</li>
      </ul>

      <h2 className={styles.sectionTitle}>9. Purpose of the Community</h2>
      <p className={styles.intro}>
        CycleSafe exists to educate, support, and empower girls and women.
        Each member contributes to a safe environment built on dignity, learning, and trust.
      </p>

      <p className={styles.notice}>
        By posting or commenting, you agree to follow these guidelines.
      </p>
    </div>
  );
};

export default CommunityGuidelines;
