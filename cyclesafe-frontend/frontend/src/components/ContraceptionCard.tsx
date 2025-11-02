import React, { useState } from "react";
import { Card, Button, Modal, Spinner } from "react-bootstrap";
import type { ContraceptionType } from "../types/types";

// ✅ Django proxy base URL
const BACKEND_PROXY =
  import.meta.env.VITE_BACKEND_PROXY || "http://127.0.0.1:8000/api/proxy/?url=";

interface Props {
  data: ContraceptionType;
  onCompare: (item: ContraceptionType) => void;
}

const ContraceptionCard: React.FC<Props> = ({ data, onCompare }) => {
  const [showModal, setShowModal] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => setLoading(false);

  const handleIframeError = () => {
    setLoading(false);
    setIframeError(true);

    // ✅ Auto open proxied page in new tab
    const proxiedUrl = `${BACKEND_PROXY}${encodeURIComponent(data.moreInfo)}`;
    window.open(proxiedUrl, "_blank", "noopener,noreferrer");

    // Then close the modal
    setTimeout(() => setShowModal(false), 1500);
  };

  // ✅ Smart YouTube + Proxy logic
  const getProxyOrEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return `${BACKEND_PROXY}${encodeURIComponent(url)}`;
  };

  const proxyUrl = getProxyOrEmbedUrl(data.moreInfo);

  return (
    <>
      {/* Contraceptive Info Card */}
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

            {/* Learn More button */}
            <Button
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              onClick={() => {
                setIframeError(false);
                setLoading(true);
                setShowModal(true);
              }}
            >
              Learn More
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        fullscreen="md-down"
        className="contraceptive-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "var(--heading-color)" }}>
            {data.name} — Learn More
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            position: "relative",
            minHeight: "80vh",
            paddingBottom: "5rem",
          }}
        >
          {/* Spinner */}
          {loading && !iframeError && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Spinner animation="border" variant="danger" />
            </div>
          )}

          {/* Iframe */}
          {!iframeError && (
            <iframe
              src={proxyUrl}
              title={data.name}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{
                width: "100%",
                height: "75vh",
                border: "none",
                borderRadius: "12px",
                display: loading ? "none" : "block",
              }}
            />
          )}

          {/* ✅ Centered return button (always visible) */}
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1051,
              textAlign: "center",
            }}
          >
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(false)}
              style={{
                borderColor: "var(--button-bg)",
                color: "var(--button-bg)",
                backgroundColor: "var(--card-bg)",
                fontWeight: "600",
                borderWidth: "2px",
                borderRadius: "10px",
                padding: "0.6rem 1.6rem",
                boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.25)",
              }}
            >
              ← Return to Dashboard
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContraceptionCard;
