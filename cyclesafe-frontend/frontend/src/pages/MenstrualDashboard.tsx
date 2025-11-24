import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap"
import type { SearchResult } from "../types/types"; //  Shared type

//  Dynamic backend base URL (Vercel + Local)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

//  Log to confirm the actual backend being used
console.log(" Using backend:", `${BACKEND_URL}api/search/`);

const MenstrualDashboard: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [query, setQuery] = useState("menstrual health");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{
    url: string;
    title: string;
  } | null>(null);

  //  Check if user has confirmed age
  const hasConfirmedAge = localStorage.getItem("isAdultConfirmed") === "true";

  //  Fetch menstrual health resources from backend
  const fetchResults = async () => {
    setLoading(true);
    setError("");
    try {
      //  Always point to /api/search/
      const response = await fetch(
        `${BACKEND_URL}api/search/?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();

      setSummary(data.summary || "");
      setResults((data.results || []) as SearchResult[]);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  //  Handle “Read More” click
  const handleReadMore = (item: SearchResult) => {
    const restrictedSources = [
      "World Health Organization",
      "World Bank Data",
      "PubMed",
    ];

    if (restrictedSources.includes(item.source)) {
      if (hasConfirmedAge) {
        window.open(item.url, "_blank", "noopener noreferrer");
      } else {
        setSelectedArticle({ url: item.url, title: item.title });
        setShowModal(true);
      }
    } else {
      window.open(item.url, "_blank", "noopener noreferrer");
    }
  };

  // Confirm age and open restricted article
  const handleConfirmAge = () => {
    if (selectedArticle) {
      localStorage.setItem("isAdultConfirmed", "true");
      window.open(selectedArticle.url, "_blank", "noopener noreferrer");
    }
    setShowModal(false);
  };

  //  Cancel age confirmation modal
  const handleCancelAge = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  return (
    <Container className="py-5">
      <h2
        className="text-center mb-4"
        style={{
          color: "var(--heading-color)",
          fontWeight: "700",
        }}
      >
         Menstrual Health Dashboard
      </h2>

      {/* 🔍 Search bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          placeholder="Search menstrual health topics..."
          className="form-control w-50 me-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchResults()}
        />
        <Button
          onClick={fetchResults}
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
          }}
        >
          Search
        </Button>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      {error && <Alert variant="danger"> {error}</Alert>}

      {/*  AI Summary */}
      {!loading && summary && (
        <Card
          className="p-3 mb-4 shadow-sm border-0"
          style={{ backgroundColor: "#fff5f7", borderRadius: "1rem" }}
        >
          <Card.Title
            style={{ color: "#c2185b", fontWeight: "600", fontSize: "1.25rem" }}
          >
            Summary
          </Card.Title>
          <Card.Text style={{ color: "#444", lineHeight: 1.7 }}>
            {summary}
          </Card.Text>
        </Card>
      )}

      {/*  Educational Cards */}
      <Row>
        {results.map((item, index) => {
          const restricted =
            item.source === "World Health Organization" ||
            item.source === "World Bank Data" ||
            item.source === "PubMed";

          return (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card
                className="shadow-sm rounded-4 border-0 h-100"
                style={{
                  backgroundColor: "var(--card-bg)",
                  transition: "transform 0.2s ease",
                }}
              >
                <Card.Body>
                  <Card.Title
                    style={{ color: "var(--heading-color)", fontWeight: "600" }}
                  >
                    {item.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.source} — {item.type}
                  </Card.Subtitle>
                  <Card.Text style={{ lineHeight: "1.7" }}>
                    {item.snippet}
                  </Card.Text>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      restricted ? (
                        <Tooltip id={`tooltip-${index}`}>
                          Restricted to readers aged 18+
                        </Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <Button
                      onClick={() => handleReadMore(item)}
                      className="btn btn-sm mt-3"
                      style={{
                        backgroundColor: "var(--button-bg)",
                        color: "var(--button-text)",
                        fontWeight: "600",
                        borderRadius: "10px",
                        padding: "0.5rem 1.2rem",
                      }}
                    >
                      {restricted ? "Explore More (18+)" : "Read More →"}
                    </Button>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/*  No results */}
      {!loading && !summary && results.length === 0 && (
        <p className="text-center mt-4" style={{ color: "var(--text-color)" }}>
          No results yet. Try searching for “period hygiene” or “PMS management”.
        </p>
      )}

      {/* Age Confirmation Modal */}
      <Modal show={showModal} onHide={handleCancelAge} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "600", color: "#c2185b" }}>
            Age Confirmation Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: "1rem", color: "#333" }}>
            The article <strong>{selectedArticle?.title}</strong> may contain
            advanced or medical information.
          </p>
          <p>
            It is meant for readers who are{" "}
            <strong>18 years or older</strong> and can read and understand
            health content independently.
          </p>
          <p style={{ color: "#777", fontSize: "0.9rem" }}>
            If not, please continue exploring the lessons here. They’re written
            in simple, friendly language just for you!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelAge}>
            No, Stay Here
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmAge}
            style={{ backgroundColor: "var(--button-bg)" }}
          >
            Yes, I’m 18 or Older
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MenstrualDashboard;
