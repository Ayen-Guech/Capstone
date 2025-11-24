import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, ListGroup } from "react-bootstrap";
import { contraceptions } from "../data/contraceptions";
import type { ContraceptionType } from "../types/types";
import ContraceptionCard from "../components/ContraceptionCard";

const ContraceptionDashboard: React.FC = () => {
  const [compareList, setCompareList] = useState<ContraceptionType[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(contraceptions.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = contraceptions.slice(indexOfFirst, indexOfLast);

  const handleCompare = (item: ContraceptionType) => {
    const exists = compareList.find((c) => c.id === item.id);
    if (exists) {
      setCompareList(compareList.filter((c) => c.id !== item.id));
    } else {
      setCompareList([...compareList, item]);
    }
  };

  const openModal = () => {
    if (compareList.length > 0) setShowModal(true);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container className="py-5">
      {/* Heading */}
      <h2 className="text-center mb-3" style={{ color: "var(--heading-color)" }}>
        Contraceptive Methods
      </h2>

      {/* Intro Paragraph */}
      <p
        className="text-center mx-auto mb-5"
        style={{
          maxWidth: "850px",
          color: "var(--text-color)",
          fontSize: "1.05rem",
          lineHeight: "1.7",
        }}
      >
        Learn more about contraceptive methods, get to compare them based on
        their pros and cons, and explore more about how each method works.
        Discover safe, effective, and informed choices that fit your health
        needs and lifestyle.
      </p>

      {/* Contraception Cards */}
      <Row>
        {currentItems.map((item) => (
          <Col md={4} sm={6} key={item.id} className="mb-4">
            <ContraceptionCard data={item} onCompare={handleCompare} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="text-center mt-3">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="me-2"
        >
          ← Previous
        </Button>
        <span style={{ fontWeight: "bold", color: "var(--heading-color)" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="ms-2"
        >
          Next →
        </Button>
      </div>

      {/* Compare Button */}
      {compareList.length > 0 && (
        <div className="text-center mt-4">
          <Button
            style={{
              backgroundColor: "var(--button-bg)",
              color: "var(--button-text)",
            }}
            onClick={openModal}
          >
            Compare Selected ({compareList.length})
          </Button>
        </div>
      )}

      {/* Comparison Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "var(--heading-color)" }}>
            Comparison Results
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ color: "var(--text-color)" }}>
          <Row>
            {compareList.map((item) => (
              <Col md={6} key={item.id} className="mb-4">

                {/* Name */}
                <h5 style={{ color: "var(--heading-color)" }}>{item.name}</h5>

                {/* Description */}
                <p style={{ fontWeight: "500" }}>{item.description}</p>

                {/* Pros */}
                <h6 className="mt-3">Pros</h6>
                <ListGroup variant="flush">
                  {item.pros.map((pro, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-color)",
                      }}
                    >
                      {pro}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {/* Cons */}
                <h6 className="mt-3">Cons</h6>
                <ListGroup variant="flush">
                  {item.cons.map((con, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "var(--card-bg)",
                        color: "var(--text-color)",
                      }}
                    >
                      {con}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ContraceptionDashboard;
