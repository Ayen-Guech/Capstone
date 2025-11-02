import React, { useContext, useState } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ThemeContext } from "../../context/ThemeContext";

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (section: string) => void; // navigation prop
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(false); // state to track toggle open/close

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setExpanded(false); // close the menu when link clicked
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className={`shadow-sm ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand
          onClick={() => handleNavClick("home")}
          className="fw-bold text-white"
          style={{ cursor: "pointer" }}
        >
          CycleSafe
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={() => handleNavClick("home")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("about")}>About</Nav.Link>
            <Nav.Link onClick={() => { onLoginClick(); setExpanded(false); }}>Login</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("chatbot")}>Chatbot</Nav.Link>

            {/* 🩸 Resources Dropdown */}
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

            {/* 🔗 Links Dropdown */}
            <NavDropdown title="Links" id="links-dropdown">
              <NavDropdown.Item onClick={() => handleNavClick("blog")}>
                Blog
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link onClick={() => handleNavClick("donation")}>
              Donation
            </Nav.Link>

            {/* 🌓 Theme toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setExpanded(false); // close menu when toggling theme
              }}
              className={`btn btn-sm ms-3 ${
                theme === "light" ? "btn-outline-dark" : "btn-outline-light"
              }`}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
