import React, { useState } from "react";
import axios from "axios";
import "./ChatPage.css";

// ✅ Use environment variable for backend (same as other pages)
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

console.log("🌍 Tracker backend:", `${BACKEND_URL}api/tracker/chat/`);

const PeriodTracker: React.FC = () => {
  const [message, setMessage] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [phone, setPhone] = useState("");
  const [allowSms, setAllowSms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("cyclesafe_token");

  const handleChat = async () => {
    if (!message.trim()) {
      alert("Please describe your period dates before submitting.");
      return;
    }

    if (!token) {
      alert("Please log in first.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Use deployed backend endpoint dynamically
      const res = await axios.post(
        `${BACKEND_URL}api/tracker/chat/`,
        {
          message,
          cycle_length: cycleLength ? Number(cycleLength) : null,
          phone_number: phone.trim() || null,
          allow_sms: allowSms,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 25000,
        }
      );

      setResponse(res.data);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          alert("⚠️ Session expired. Please log in again.");
          localStorage.removeItem("cyclesafe_token");
          window.location.href = "/login";
          return;
        }
        setError(
          `Server error (${error.response.status}): ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        setError(
          "No response from backend. Please make sure your server is running."
        );
      } else {
        setError("Unexpected error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* 🌸 Hero Section */}
      <div className="headerSection">
        {/* Left Side */}
        <div className="infoCard">
          <h1 className="mainTitle">Welcome to Your Period Tracker</h1>
          <p className="subText">
            Understand your body better through science, care, and personalized
            AI insights.
          </p>

          <div className="chatIntro">
            <p>
              Monitoring your menstrual cycle is more than simply tracking
              dates. It is about understanding your health. Your cycle reflects
              your hormones, emotions, and overall wellbeing.
            </p>
            <p>
              With <strong>CycleSafe</strong>, you receive AI-powered
              predictions, helpful reminders, and personalized insights that
              empower you every month.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="chatCard">
          <div className="chatBox">
            <textarea
              className="input"
              rows={3}
              placeholder="e.g. My last period was from Oct 25 to Oct 28, 2025"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <input
              type="number"
              className="input"
              placeholder="Enter your cycle length (e.g. 28)"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              min={20}
              max={40}
            />

            <input
              type="tel"
              className="input"
              placeholder="Enter your phone number (optional, e.g. +2507...)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="smsLabel">
              <input
                type="checkbox"
                checked={allowSms}
                onChange={(e) => setAllowSms(e.target.checked)}
              />
              Receive SMS reminders for your next period and ovulation
            </label>

            <button onClick={handleChat} disabled={loading} className="sendBtn">
              {loading ? "Analyzing..." : "Submit"}
            </button>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="errorBox">
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Results */}
      {response && (
        <div className="resultsSection">
          <h3 className="resultHeader">Your Cycle Overview</h3>
          <p className="resultSub">
            Based on your input, here’s your personalized cycle prediction.
          </p>

          <div className="cardContainer">
            <div className="resultCard">
              <div className="icon">💧</div>
              <div>
                <p className="cardLabel">Next Period</p>
                <p className="cardValue">
                  {new Date(response.next_period).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="resultCard">
              <div className="icon">🩸</div>
              <div>
                <p className="cardLabel">Ovulation</p>
                <p className="cardValue">
                  {new Date(response.ovulation).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="resultCard">
              <div className="icon">🌸</div>
              <div>
                <p className="cardLabel">Fertile Window</p>
                <p className="cardValue">{response.fertile_window}</p>
              </div>
            </div>
          </div>

          <div className="cycleSummaryCenter">
            <p className="cycleLengthText">
              Cycle length used: {response.cycle_length} days
            </p>

            {response.message && (
              <div className="aiSummary fadeIn">
                <h4>Personalized Cycle Summary</h4>
                <p>{response.message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodTracker;
