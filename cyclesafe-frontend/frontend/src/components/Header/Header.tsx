import React, { useContext, useState } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "../../context/ThemeContext";
import AuthPage from "../../pages/LoginPage";

interface HeaderProps {
  onNavigate: (section: string) => void;
  onLoginClick?: () => void; // ✅ Added this line
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLoginClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setExpanded(false);
  };

  const handleLoginClick = () => {
    setExpanded(false);
    setShowAuth(true);
    if (onLoginClick) onLoginClick(); // ✅ optional callback if parent passes it
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        fixed="top"
        className={`custom-navbar ${
          theme === "dark" ? "navbar-dark" : "navbar-light"
        }`}
      >
        <Container fluid className="no-padding-container">
          <Navbar.Brand
            onClick={() => handleNavClick("home")}
            className="fw-bold text-white brand-click"
          >
            CycleSafe
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
            className="custom-toggler"
          >
            <span className="custom-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end text-center"
          >
            <Nav className="align-items-center">
              <Nav.Link onClick={() => handleNavClick("home")}>Home</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("about")}>About</Nav.Link>
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("chatbot")}>
                Chatbot
              </Nav.Link>

              <NavDropdown title="Resources" id="resources-dropdown">
                <NavDropdown.Item onClick={() => handleNavClick("menstrual")}>
                  Menstrual Health
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick("contraception")}>
                  Contraceptive Info
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick("sti")}>
                  STI Information
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleNavClick("blog")}>Blog</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("donation")}>Donation</Nav.Link>

              <button
                onClick={() => {
                  toggleTheme();
                  setExpanded(false);
                }}
                className={`theme-toggle-btn ${
                  theme === "light" ? "light-mode" : "dark-mode"
                }`}
              >
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {showAuth && <AuthPage onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default Header;
