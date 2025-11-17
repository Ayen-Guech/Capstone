import React from "react";
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
import SRHDashboard from "./pages/SRHDashboard";
import Footer from "./components/Footer/Footer";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import BlogPage from "./components/blog/BlogPage";
import BlogDetail from "./components/blog/BlogDetail";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();

  // Handle navigation from Header
  const handleNavigate = (section: string) => {
    if (
      section === "contraception" ||
      section === "sti" ||
      section === "menstrual" ||
      section === "articles" ||
      section === "blog" ||
      section === "srh-dashboard"
    ) {
      navigate(`/${section}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <div>
      {/* Header */}
      <Header onNavigate={handleNavigate} />

      {/* MAIN ROUTES */}
      <Routes>
        {/* HOME sections */}
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

        {/* LOGIN PAGE (standalone) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboards & content */}
        <Route path="/contraception" element={<ContraceptionDashboard />} />
        <Route path="/sti" element={<StiDashboard />} />
        <Route path="/menstrual" element={<MenstrualDashboard />} />
        <Route path="/srh-dashboard" element={<SRHDashboard />} />

        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* REDIRECT unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
