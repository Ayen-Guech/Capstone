import React, { useState } from "react";
import "./login.css";
import api, { setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
        setTimeout(() => nav("/chatbot"), 700);

      } else if (mode === "signup") {
        await api.post("/api/auth/register/", { username, password });
        setSuccess("Account created successfully!");
        setMode("login");
        clearFields();

      } else if (mode === "reset") {
        await api.post("/api/auth/password-reset/", {
          username,
          new_password: newPassword,
        });
        setSuccess("Password reset successful!");
        setMode("login");
        clearFields();
      }

    } catch (err: any) {
      setError(err.response?.data?.detail || "Action failed. Please try again.");
      clearFields();
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="auth-page-container">

        <div className="auth-card">

          {/* CLOSE BUTTON */}
          <button className="login-close-btn" onClick={() => nav("/")}>
            ✕
          </button>

          <h2 className="auth-title">
            {mode === "login"
              ? "Login"
              : mode === "signup"
              ? "Create Account"
              : "Reset Password"}
          </h2>

          {error && <div className="alert-box error">{error}</div>}
          {success && <div className="alert-box success">{success}</div>}

          <form onSubmit={handleSubmit}>

            <div className="inputbox">
              <input
                type="text"
                required
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="inputbox">
              <input
                type="password"
                required
                placeholder=" "
                value={mode === "reset" ? newPassword : password}
                onChange={(e) =>
                  mode === "reset"
                    ? setNewPassword(e.target.value)
                    : setPassword(e.target.value)
                }
              />
              <label>{mode === "reset" ? "New Password" : "Password"}</label>
            </div>

            <button type="submit" className="auth-btn">
              {mode === "login"
                ? "Login"
                : mode === "signup"
                ? "Sign Up"
                : "Reset Password"}
            </button>
          </form>

          {mode === "login" && (
            <div className="auth-links">
              <a onClick={() => setMode("reset")}>Forgot Password?</a>
            </div>
          )}

          <div className="register-msg">
            {mode === "login" ? (
              <p>
                Don’t have an account?{" "}
                <a onClick={() => setMode("signup")}>Sign Up</a>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <a onClick={() => setMode("login")}>Login</a>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
