import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import "./login.css";

type Mode = "login" | "signup" | "reset";

interface AuthPageProps {
  onClose?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onClose }) => {
  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const nav = useNavigate();

  const clearFields = () => {
    setPassword("");
    setNewPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (mode === "login") {
        const res = await api.post("/api/auth/token/", { username, password });
        const token = res.data.access;
        localStorage.setItem("cyclesafe_token", token);
        setAuthToken(token);
        setSuccess("Login successful! Redirecting...");
        setFadeClass("fade-out");
        setTimeout(() => {
          onClose?.();
          nav("/chatbot");
        }, 400);
      } else if (mode === "signup") {
        await api.post("/api/auth/register/", { username, password });
        setSuccess("Registration successful! You can now log in.");
        setMode("login");
        clearFields();
      } else if (mode === "reset") {
        await api.post("/api/auth/password-reset/", {
          username,
          new_password: newPassword,
        });
        setSuccess("Password reset successful! You can now log in.");
        setMode("login");
        clearFields();
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Action failed. Please try again.");
      clearFields();
    }
  };

  const handleClose = () => {
    setFadeClass("fade-out");
    setTimeout(() => onClose?.(), 400);
  };

  return (
    <div
      className="auth-overlay"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`auth-popup ${fadeClass}`}>
        <Card
          className="p-4 shadow"
          style={{
            maxWidth: 400,
            width: "100%",
            borderRadius: "15px",
            border: "none",
            backgroundColor: "#ffffffcc",
            overflowY: "auto",
          }}
        >
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>

          <h2
            style={{
              textAlign: "center",
              color: "#D6336C",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            {mode === "login"
              ? "Welcome Back"
              : mode === "signup"
              ? "Create Account"
              : "Reset Password"}
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#6c757d", fontWeight: 500 }}>
                Username
              </Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your full name"
                style={{ borderRadius: "10px", padding: "10px" }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ color: "#6c757d", fontWeight: 500 }}>
                {mode === "reset" ? "New Password" : "Password"}
              </Form.Label>
              <Form.Control
                type="password"
                value={mode === "reset" ? newPassword : password}
                onChange={(e) =>
                  mode === "reset"
                    ? setNewPassword(e.target.value)
                    : setPassword(e.target.value)
                }
                placeholder={
                  mode === "reset"
                    ? "Enter new password"
                    : "Enter your password"
                }
                style={{ borderRadius: "10px", padding: "10px" }}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              style={{
                width: "100%",
                borderRadius: "10px",
                background: "linear-gradient(to right, #FF69B4, #D6336C)",
                border: "none",
                fontWeight: 600,
                padding: "10px",
              }}
            >
              {mode === "login"
                ? "Login"
                : mode === "signup"
                ? "Sign Up"
                : "Reset Password"}
            </Button>
          </Form>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#6c757d",
              fontSize: "0.95rem",
            }}
          >
            {mode === "login" && (
              <>
                Don’t have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>{" "}
                |{" "}
                <span className="auth-link" onClick={() => setMode("reset")}>
                  Forgot Password?
                </span>
              </>
            )}
            {mode === "signup" && (
              <span className="auth-link" onClick={() => setMode("login")}>
                Already have an account? Login
              </span>
            )}
            {mode === "reset" && (
              <span className="auth-link" onClick={() => setMode("login")}>
                Back to Login
              </span>
            )}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
