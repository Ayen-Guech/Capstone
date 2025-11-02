import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  articleTitle?: string;
}

const AgeConfirmModal: React.FC<Props> = ({ show, onConfirm, onCancel, articleTitle }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Age Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: "1rem", color: "#333" }}>
          The article <strong>{articleTitle || "this resource"}</strong> contains detailed medical or educational
          information. It’s meant for readers who are <strong>18 years or older</strong> and can read health content independently.
        </p>
        <p>Are you 18 or older and want to continue?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>No, Stay Here</Button>
        <Button variant="primary" onClick={onConfirm} style={{ backgroundColor: "var(--button-bg)" }}>
          Yes, Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AgeConfirmModal;
