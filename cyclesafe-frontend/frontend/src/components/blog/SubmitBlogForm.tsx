import React, { useState } from "react";
import axios from "axios";
import styles from "./SubmitBlogForm.module.css";

// 🌍 Backend URL for BOTH Localhost & Vercel
const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

const SubmitBlogForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    content: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 📌 Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📎 Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.files ? e.target.files[0] : null,
    });
  };

  // 🚀 Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value as any);
    });

    try {
      const res = await axios.post(`${VITE_BACKEND_URL}api/blog/submit-post/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({
        type: "success",
        text:
          res.data?.message ||
          "🎉 Thank you! Your blog has been submitted and is now awaiting review by our team.",
      });

      // Reset form
      setFormData({ name: "", email: "", title: "", content: "", image: null });

    } catch (error: any) {
      console.error(error);

      let backendMsg = "⚠️ We couldn’t save your blog. Please check your details and try again.";

      // Show actual backend error if available
      if (error.response?.data) {
        backendMsg =
          typeof error.response.data === "string"
            ? `⚠️ ${error.response.data}`
            : `⚠️ ${JSON.stringify(error.response.data)}`;
      }

      setMessage({ type: "error", text: backendMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Share Your Story</h2>
      <p className={styles.subtitle}>
        Share your experience or knowledge. After review, it will appear in our community blog.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Write your story..."
          rows={6}
          value={formData.content}
          onChange={handleChange}
          required
        />

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Blog"}
        </button>

        {message && (
          <p
            className={`${styles.responseMessage} ${
              message.type === "success" ? styles.success : styles.error
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default SubmitBlogForm;
