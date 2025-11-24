import React from "react";

interface ConsentModalProps {
  onAccept: () => void;
  onDecline: () => void;
  onViewPolicy: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ onAccept, onDecline, onViewPolicy }) => {
  return (
    <div style={overlay}>
      <div style={box}>
        <h2>CycleSafe Period Tracking Consent</h2>
        <p>We only save period start/end dates. You may delete your data at any time.</p>
        <button onClick={onAccept}>Save & Continue</button>
        <button onClick={onDecline}>Use Without Saving</button>
        <button onClick={onViewPolicy}>View Policy</button>
      </div>
    </div>
  );
};

const overlay: React.CSSProperties = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
  alignItems: "center", justifyContent: "center"
};

const box: React.CSSProperties = {
  background: "white", padding: "20px", borderRadius: "10px",
  width: "300px", textAlign: "center"
};

export default ConsentModal;
