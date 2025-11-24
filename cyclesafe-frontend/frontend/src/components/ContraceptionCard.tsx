import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import type { ContraceptionType } from "../types/types";

interface Props {
  data: ContraceptionType;
  onCompare: (item: ContraceptionType) => void;
}

const ContraceptionCard: React.FC<Props> = ({ data, onCompare }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Contraceptive Card */}
      <Card
        className="shadow-sm rounded-4 border-0 mb-4 contraception-card"
        style={{
          backgroundColor: "var(--card-bg)",
          color: "var(--text-color)",
        }}
      >
        <Card.Img
          src={data.image}
          alt={data.name}
          className="rounded-top-4"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title style={{ color: "var(--heading-color)" }}>
            {data.name}
          </Card.Title>

          <Card.Text>{data.description}</Card.Text>

          <div className="d-flex justify-content-between mt-3">
            {/* Compare button */}
            <Button
              variant="outline-danger"
              onClick={() => onCompare(data)}
              style={{
                borderColor: "var(--button-bg)",
                color: "var(--button-bg)",
              }}
            >
              Compare
            </Button>

            {/* Read More modal button */}
            <Button
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              onClick={() => setShowModal(true)}
            >
              Read More
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* READ MORE MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "var(--heading-color)" }}>
            {data.name} — Full Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ color: "var(--text-color)" }}>
          {/* Summary */}
          <h5 style={{ color: "var(--heading-color)" }}>Summary</h5>
          <p>{data.summary}</p>

          {/* Definitions */}
          {data.definitions && (
            <>
              <h6 className="mt-3">Definitions (Hard Words)</h6>
              <ul style={{ paddingLeft: "18px" }}>
                {data.definitions.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </>
          )}

          {/* Ethical Note */}
          {data.ethicalNote && (
            <>
              <h6 className="mt-3">Ethical Note</h6>
              <p>{data.ethicalNote}</p>
            </>
          )}

          {/* External link */}
          <h6 className="mt-3">External Resource</h6>
          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            This is a trusted source.  
            Make sure you understand all the definitions above before leaving the app.
          </p>

          <a
            href={data.moreInfo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--link-color)", fontWeight: 600 }}
          >
            Open Full Article →
          </a>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
            style={{
              borderColor: "var(--button-bg)",
              color: "var(--button-bg)",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContraceptionCard;
