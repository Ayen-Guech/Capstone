import React from "react";
import { stiData } from "../data/stiData";
import STICard from "../components/STICard/STICard";
import styles from "./STIDashboard.module.css";

const STIDashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.heroSection}>
        <div className={styles.overlay}>
          <h1>Sexually Transmitted Infections (STIs)</h1>
          <p>
            In crowded or resource-limited areas, STIs can spread more easily, and ignoring symptoms can put your health at serious risk. 
    This platform is here to provide clear, reliable information so you can protect yourself and your community. Welcome, and take the first step to learning and staying safe.
          </p>
        </div>
      </div>

      <section className={styles.cardsSection}>
        <div className={styles.grid}>
          {stiData.map((sti) => (
            <STICard key={sti.id} sti={sti} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default STIDashboard;
