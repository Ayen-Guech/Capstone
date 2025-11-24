import React, { useContext } from "react";
import styles from "./PrivacyPolicy.module.css";
import { ThemeContext } from "../context/ThemeContext";

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.policyWrapper} ${theme === "dark" ? styles.dark : styles.light}`}>
      <h1 className={styles.title}>CycleSafe Privacy Policy & End-User Agreement</h1>
      <p className={styles.effective}><strong>Effective Date:</strong> January 2025</p>

      <h2 className={styles.sectionTitle}>1. Our Promise</h2>
      <p className={styles.textBlock}>
        CycleSafe is designed to protect the dignity, privacy, and safety of girls and women.
        We collect only the minimum data necessary and allow full anonymous usage to ensure
        user control and safety, especially in vulnerable environments such as refugee camps.
      </p>

      <h2 className={styles.sectionTitle}>2. Data We Collect</h2>
      <p className={styles.textBlock}>CycleSafe only collects the following optional information:</p>
      <ul className={styles.list}>
        <li>Menstrual period start date</li>
        <li>Menstrual period end date</li>
        <li>Anonymous community posts and comments</li>
      </ul>
      <p className={styles.textBlock}>We do NOT collect:</p>
      <ul className={styles.list}>
        <li>Names, phone numbers, photos, or locations</li>
        <li>Sexual activity, pregnancy data, or medical records for minors</li>
        <li>Email, login credentials, or identity-related information</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. Consent</h2>
      <p className={styles.textBlock}>
        Before any menstrual data is saved, users must give clear consent. If consent is not given,
        CycleSafe remains usable in view-only mode. Users may withdraw consent at any time
        without losing access to the app's features.
      </p>

      <h2 className={styles.sectionTitle}>4. User Rights</h2>
      <p className={styles.textBlock}>Every user has the right to:</p>
      <ul className={styles.list}>
        <li>Delete their data permanently</li>
        <li>Download or export their data</li>
        <li>Continue using the app anonymously</li>
        <li>Change consent decisions freely</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Protection of Minors</h2>
      <p className={styles.textBlock}>
        CycleSafe does not collect any sexual or reproductive health data that could risk
        a minor’s safety. The community section is moderated to prevent harassment or
        exploitation. No sexual content or contact information is allowed.
      </p>

      <h2 className={styles.sectionTitle}>6. Community Safety</h2>
      <p className={styles.textBlock}>Anonymous posts and comments are moderated. Prohibited content includes:</p>
      <ul className={styles.list}>
        <li>Harassment, bullying, or shaming of any kind</li>
        <li>Personal data sharing or requests</li>
        <li>False medical information</li>
        <li>Sexually explicit content</li>
        <li>Promotion or solicitation of services</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Liability Disclaimer</h2>
      <p className={styles.textBlock}>
        CycleSafe provides educational information only. The app does not diagnose or treat
        medical conditions. Users must seek professional healthcare advice for emergencies or health concerns.
      </p>

      <h2 className={styles.sectionTitle}>8. Data Protection</h2>
      <p className={styles.textBlock}>CycleSafe stores all data locally on the user’s device. We do not:</p>
      <ul className={styles.list}>
        <li>Sell or share data with third parties</li>
        <li>Store identity-linked information</li>
        <li>Automatically sync to internet servers</li>
      </ul>

      <h2 className={styles.sectionTitle}>9. Legal Compliance</h2>
      <p className={styles.textBlock}>CycleSafe aligns with the following privacy laws and ethical frameworks:</p>
      <ul className={styles.list}>
        <li>GDPR (General Data Protection Regulation – EU Children’s Data)</li>
        <li>Kenya Data Protection Act 2019</li>
        <li>UNHCR Refugee Data Protection Guidelines</li>
        <li>Ethical principles of autonomy, privacy, and harm reduction</li>
      </ul>

      <h2 className={styles.sectionTitle}>10. Agreement</h2>
      <p className={styles.textBlock}>
        By using CycleSafe, you agree to this Privacy Policy, the Community Guidelines,
        and the End-User Terms. You may withdraw or delete your data at any time.
      </p>

      <p className={styles.textBlock}><strong>For safety:</strong> Never share personal identity, exact location, or contact details inside the app.</p>
    </div>
  );
};

export default PrivacyPolicy;
