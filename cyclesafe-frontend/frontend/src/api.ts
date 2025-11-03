import axios from "axios";

// 🌍 Automatically pick correct backend base URL
const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

// 🧩 Create a preconfigured Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000, // 20s timeout
});

// ✅ Helper to attach/remove tokens
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 🌸 Helpful for verifying correct environment during deploy
console.log("🌍 Backend Base URL:", API_BASE);

export default api;
