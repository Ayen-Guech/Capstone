import React, { useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

interface MentorBookingModalProps {
  show: boolean;
  onHide: () => void;
  mentor: any;
  topic: string;
}

// 🌍 Base backend URL (shared for local + production)
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

const MentorBookingModal: React.FC<MentorBookingModalProps> = ({
  show,
  onHide,
  mentor,
  topic,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!firstName || !lastName || !datetime) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/srh/book/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentor_id: mentor?.id,
          topic,
          first_name: firstName,
          last_name: lastName,
          preferred_datetime: datetime,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed.");

      setSuccess(
        data.message || "🎉 Your session has been booked successfully!"
      );
      setFirstName("");
      setLastName("");
      setDatetime("");
      setNotes("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Book a Mentor Session — {mentor?.name || "SRH Mentor"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && (
          <Alert variant="success" className="text-center">
            🎉 {success}
          </Alert>
        )}

        {!success && (
          <>
            <div className="text-center mb-3">
              <h5 style={{ color: "#B00059", fontWeight: 600 }}>
                {mentor?.name}
              </h5>
              <p className="text-muted mb-1">{mentor?.title}</p>
              <p style={{ fontSize: "0.9rem" }}>{mentor?.bio}</p>
              <p>
                <strong>Topic:</strong> {topic}
              </p>
            </div>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preferred Date & Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Notes (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any topics or details you’d like to discuss..."
                />
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {!success ? (
          <Button
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--button-text)",
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Book Session"}
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MentorBookingModal;
