import React, { useState } from "react";
import styles from "./STICard.module.css";
import type { STIData } from "../../data/stiData";

interface STICardProps {
  sti: STIData;
}

const STICard: React.FC<STICardProps> = ({ sti }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`${styles.stiCard} shadow`}>
        <div className={styles.content}>
          <h3>{sti.name}</h3>
          <p>{sti.description}</p>
          <button
            className={styles.button}
            onClick={() => setShowModal(true)}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{sti.name}</h2>
              <button
                className={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <iframe
              src={sti.moreInfo}
              title={sti.name}
              className={styles.iframe}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default STICard;
