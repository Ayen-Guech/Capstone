import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
} from "react-bootstrap";
import MentorBookingModal from "../components/MentorBookingModal";

/* ------------------------------------------------
    Interfaces for Strong TypeScript Typing
------------------------------------------------ */
interface SearchResult {
  title: string;
  source: string;
  type: string;
  snippet: string;
  url: string;
}

interface SourceData {
  title: string;
  url: string;
  summary: string[];
  error?: string;
}

interface Mentor {
  id: number;
  name: string;
  title: string;
  bio: string;
  hourlyRate: string;
}

/* ------------------------------------------------
    Endpoint Configs (Correctly Using VITE_BACKEND_URL)
------------------------------------------------ */
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api/srh/";

const FETCH_URL = `${BACKEND_URL}fetch/`;
const DOWNLOAD_URL = `${BACKEND_URL}download/`;

const SAMPLE_MENTORS: Mentor[] = [
  {
    id: 1,
    name: "Dr. Amina Noor",
    title: "SRH Counselor",
    bio: "10+ years of experience in reproductive health counseling.",
    hourlyRate: "$25/hr",
  },
  {
    id: 2,
    name: "John Kimathi",
    title: "Health Educator",
    bio: "Certified in adolescent and sexual health education.",
    hourlyRate: "$20/hr",
  },
];

/* ------------------------------------------------
    Main Dashboard Component
------------------------------------------------ */
const SRHDashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sourceModal, setSourceModal] = useState(false);
  const [sourceData, setSourceData] = useState<SourceData | null>(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedTopic, setSelectedTopic] = useState("");

  const fetchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed.");
      setResults(data.results || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openSource = async (url: string) => {
    setSourceModal(true);
    setSourceData(null);

    try {
      const res = await fetch(`${FETCH_URL}?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load article.");
      setSourceData(data);
    } catch (err: any) {
      setSourceData({ title: "", url, summary: [], error: err.message });
    }
  };

  const openBooking = (topic: string) => {
    setSelectedMentor(SAMPLE_MENTORS[0]);
    setSelectedTopic(topic);
    setBookingModal(true);
  };

  return (
    <Container className="py-5 section text-center">
      <h2 className="section-title mb-3" style={{ color: "#B00059" }}>
        Sexual & Reproductive Health (SRH) Dashboard
      </h2>

      <p
        style={{
          maxWidth: 700,
          margin: "0 auto 1.5rem",
          color: "var(--text-color)",
          fontSize: "1.1rem",
        }}
      >
        Search verified global sources and research on SRH topics. View
        summaries, download safe resources, or book a mentor for guidance.
      </p>

      {/* Search Input */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search SRH topics e.g. contraception, safe pregnancy..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          onClick={fetchResults}
          style={{
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
          }}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Search"}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search Results */}
      <Row>
        {results.map((r, i) => (
          <Col md={6} lg={4} key={i} className="mb-4">
            <Card
              className="shadow-sm border-0 contraception-card"
              style={{
                backgroundColor: "var(--card-bg)",
                borderRadius: "14px",
                minHeight: "320px",
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title style={{ color: "#B00059", fontWeight: 600 }}>
                    {r.title}
                  </Card.Title>
                  <Card.Subtitle className="text-muted mb-2">
                    {r.source} • {r.type}
                  </Card.Subtitle>
                  <Card.Text style={{ minHeight: 80, fontSize: "0.95rem" }}>
                    {(r.snippet || "").slice(0, 180)}...
                  </Card.Text>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => openSource(r.url)}
                  >
                    Read More
                  </Button>

                  <a
                    href={`${DOWNLOAD_URL}?url=${encodeURIComponent(r.url)}`}
                    className="btn btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "var(--button-bg)",
                      color: "var(--button-text)",
                    }}
                  >
                    Download
                  </a>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => openBooking(r.title)}
                  >
                    Book Mentor
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Read More Modal */}
      <Modal
        show={sourceModal}
        onHide={() => {
          setSourceModal(false);
          setSourceData(null);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{sourceData?.title || "Loading..."}</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {!sourceData && (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          )}

          {sourceData?.error && (
            <Alert variant="danger">{sourceData.error}</Alert>
          )}

          {sourceData && !sourceData.error && (
            <>
              <p>
                <strong>Source:</strong>{" "}
                <span style={{ color: "gray" }}>
                  Locked — complete comprehension check to access.
                </span>
              </p>

              {Array.isArray(sourceData.summary) && (
                <>
                  <h6 style={{ color: "#B00059", fontWeight: 600 }}>
                    Summary:
                  </h6>

                  {sourceData.summary.map((p: string, i: number) => (
                    <p key={i} style={{ textAlign: "justify" }}>
                      {p}
                    </p>
                  ))}
                </>
              )}

              <hr />
              <ProtectedAccess
                sourceUrl={sourceData.url}
                topic={sourceData.title}
              />
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Booking Modal */}
      <MentorBookingModal
        show={bookingModal}
        onHide={() => setBookingModal(false)}
        mentor={selectedMentor}
        topic={selectedTopic}
      />
    </Container>
  );
};

export default SRHDashboard;

/* ------------------------------------------------
    Protected Access Component (No endpoint changes needed)
------------------------------------------------ */
interface ProtectedProps {
  sourceUrl: string;
  topic: string;
}

const ProtectedAccess: React.FC<ProtectedProps> = ({ sourceUrl, topic }) => {
  const [agreed, setAgreed] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  const topicQuestions = (topic: string) => {
    const lower = topic.toLowerCase();

    if (lower.includes("contraceptive") || lower.includes("birth")) {
      return [
        {
          question: "What does 'contraceptive efficacy' mean?",
          options: [
            { id: "a", text: "How well a method prevents pregnancy" },
            { id: "b", text: "How comfortable it feels" },
            { id: "c", text: "Its price or cost" },
          ],
          correct: "a",
        },
        {
          question: "Which hormone is often present in oral contraceptives?",
          options: [
            { id: "a", text: "Estrogen" },
            { id: "b", text: "Insulin" },
            { id: "c", text: "Thyroxine" },
          ],
          correct: "a",
        },
      ];
    }

    if (lower.includes("hiv") || lower.includes("sti")) {
      return [
        {
          question: "What does the 'I' in HIV stand for?",
          options: [
            { id: "a", text: "Immunodeficiency" },
            { id: "b", text: "Infection" },
            { id: "c", text: "Inflammation" },
          ],
          correct: "a",
        },
        {
          question: "What is the main way HIV spreads?",
          options: [
            { id: "a", text: "Unprotected sexual contact" },
            { id: "b", text: "Sharing food" },
            { id: "c", text: "Mosquito bites" },
          ],
          correct: "a",
        },
      ];
    }

    if (lower.includes("pregnancy")) {
      return [
        {
          question: "What does 'prenatal care' mean?",
          options: [
            { id: "a", text: "Care provided during pregnancy" },
            { id: "b", text: "Care after childbirth" },
            { id: "c", text: "Infant feeding support" },
          ],
          correct: "a",
        },
        {
          question: "What nutrient is essential for preventing birth defects?",
          options: [
            { id: "a", text: "Folic acid" },
            { id: "b", text: "Vitamin C" },
            { id: "c", text: "Calcium" },
          ],
          correct: "a",
        },
      ];
    }

    return [
      {
        question: "What does 'etiology' refer to?",
        options: [
          { id: "a", text: "The cause or origin of a condition" },
          { id: "b", text: "The treatment used" },
          { id: "c", text: "A body organ" },
        ],
        correct: "a",
      },
      {
        question: "If someone is 'asymptomatic', what does it mean?",
        options: [
          { id: "a", text: "They have no visible symptoms" },
          { id: "b", text: "They are contagious" },
          { id: "c", text: "They are recovering" },
        ],
        correct: "a",
      },
    ];
  };

  const questions = topicQuestions(topic);
  const q = questions[current];

  const handleNext = () => {
    if (!agreed) return alert("Please confirm you understand technical terms.");

    if (answer === q.correct) {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setAnswer(null);
      } else {
        setUnlocked(true);
      }
    } else {
      setFailed(true);
    }
  };

  return (
    <div>
      {!unlocked && !failed ? (
        <div>
          <Form.Check
            type="checkbox"
            label="I confirm I am comfortable reading medical and technical articles."
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mb-3"
          />

          <div style={{ textAlign: "left" }}>
            <strong>Comprehension Check:</strong>
            <p>{q.question}</p>

            {q.options.map((o) => (
              <Form.Check
                key={o.id}
                type="radio"
                name="quiz"
                label={o.text}
                checked={answer === o.id}
                onChange={() => setAnswer(o.id)}
              />
            ))}

            <Button
              className="mt-3"
              size="sm"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              onClick={handleNext}
            >
              {current + 1 === questions.length ? "Submit" : "Next Question"}
            </Button>
          </div>
        </div>
      ) : failed ? (
        <Alert variant="warning" className="mt-3">
          It looks like this article might be too advanced. Consider reviewing
          our beginner SRH resources or booking a mentor before proceeding.
        </Alert>
      ) : (
        <div className="text-start">
          <Alert variant="success">
            Excellent — comprehension confirmed. You may now read or download
            the article.
          </Alert>

          <div className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              size="sm"
              className="me-2"
              onClick={() => window.open(sourceUrl, "_blank")}
            >
              Open Original
            </Button>

            <Button
              size="sm"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              onClick={() =>
                window.open(
                  `${DOWNLOAD_URL}?url=${encodeURIComponent(sourceUrl)}`,
                  "_blank"
                )
              }
            >
              Download Clean Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
