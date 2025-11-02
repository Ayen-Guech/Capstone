import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home/home";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import ContraceptionDashboard from "./pages/ContraceptionDashboard";
import StiDashboard from "./pages/STIDashboard";
import MenstrualDashboard from "./pages/MenstrualDashboard";
import Footer from "./components/Footer/Footer";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import BlogPage from "./components/blog/BlogPage";
import BlogDetail from "./components/blog/BlogDetail";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle navigation (used by Header)
  const handleNavigate = (section: string) => {
    if (
      section === "contraception" ||
      section === "sti" ||
      section === "menstrual" ||
      section === "articles" ||
      section === "blog"
    ) {
      navigate(`/${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to section on home page
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <div>
      {/* 🩷 Header */}
      <Header onLoginClick={() => setShowAuth(true)} onNavigate={handleNavigate} />

      {/* 🔐 Login Modal */}
      {showAuth && (
        <div
          className="auth-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAuth(false);
          }}
        >
          <div className="auth-modal">
            <button
              className="btn btn-outline-secondary btn-sm close-btn"
              onClick={() => setShowAuth(false)}
            >
              ✕
            </button>
            <LoginPage {...({ onSuccess: () => setShowAuth(false) } as any)} />
          </div>
        </div>
      )}

      {/* 🌍 Main Routes */}
      <Routes>
        {/* 🏠 Default Home Page with Sections */}
        <Route
          path="/"
          element={
            <>
              <div id="home" className="section-offset">
                <Home />
              </div>
              <div id="about" className="section-offset">
                <About />
              </div>
              <div id="chatbot" className="section-offset">
                <ChatPage />
              </div>
            </>
          }
        />

        {/* 💊 Contraception Dashboard */}
        <Route path="/contraception" element={<ContraceptionDashboard />} />

        {/* 🧫 STI Dashboard */}
        <Route path="/sti" element={<StiDashboard />} />

        {/* 🩸 Menstrual Health Dashboard */}
        <Route path="/menstrual" element={<MenstrualDashboard />} />

        {/* 📰 Articles */}
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />

        {/* 🧾 Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* ❌ Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* 🦶 Footer */}
      <Footer />
    </div>
  );
};

export default App;
