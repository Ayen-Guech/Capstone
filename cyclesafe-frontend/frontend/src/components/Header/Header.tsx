import React, { useContext, useState } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onNavigate: (section: string) => void;
  onLoginClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLoginClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false);
  const nav = useNavigate();

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setExpanded(false);
  };

  const handleLoginClick = () => {
    setExpanded(false);

    // Go to login page
    nav("/login");

    if (onLoginClick) onLoginClick();
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
          {/* Brand */}
          <Navbar.Brand
            onClick={() => handleNavClick("home")}
            className="fw-bold text-white brand-click"
          >
            CycleSafe
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(!expanded)}
            className="custom-toggler"
          >
            <span className="custom-toggler-icon"></span>
          </Navbar.Toggle>

          {/* Desktop Navbar */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end text-center"
          >
            <Nav className="align-items-center">
              <Nav.Link onClick={() => handleNavClick("home")}>Home</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("about")}>About</Nav.Link>

              {/* Updated Login link */}
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
                <NavDropdown.Item onClick={() => onNavigate("srh-dashboard")}>
                  General SRH Dashboard
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleNavClick("blog")}>Blog</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("donation")}>
                Donation
              </Nav.Link>

              <button
                onClick={() => {
                  toggleTheme();
                  setExpanded(false);
                }}
                className={`theme-toggle-btn ${
                  theme === "light" ? "light-mode" : "dark-mode"
                }`}
              >
                {theme === "light" ? " Dark" : " Light"}
              </button>
            </Nav>
          </Navbar.Collapse>

          {/* Mobile Slide-In Drawer */}
          <div className={`slide-collapse ${expanded ? "show-slide" : ""}`}>
            <Nav className="align-items-center flex-column text-center mt-4">
              <Nav.Link onClick={() => handleNavClick("home")}>Home</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("about")}>About</Nav.Link>

              {/* Updated Login for mobile */}
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>

              <Nav.Link onClick={() => handleNavClick("chatbot")}>
                Chatbot
              </Nav.Link>

              <NavDropdown title="Resources" id="resources-dropdown-mobile">
                <NavDropdown.Item onClick={() => handleNavClick("menstrual")}>
                  Menstrual Health
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick("contraception")}>
                  Contraceptive Info
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick("sti")}>
                  STI Information
                </NavDropdown.Item>
                 <NavDropdown.Item onClick={() => handleNavClick("srh-dashboard")}>
                  General SRH Dashboard
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleNavClick("blog")}>Blog</Nav.Link>
              <Nav.Link onClick={() => handleNavClick("donation")}>
                Donation
              </Nav.Link>

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
          </div>
        </Container>
      </Navbar>

      {/* Backdrop Overlay */}
      {expanded && (
        <div
          className="navbar-backdrop active"
          onClick={() => setExpanded(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
