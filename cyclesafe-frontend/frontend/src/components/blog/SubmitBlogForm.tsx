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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.files ? e.target.files[0] : null,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });

    try {
      await axios.post(`${VITE_BACKEND_URL}api/blog/submit-post/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("🎉 Your blog has been submitted for review!");
      setFormData({ name: "", email: "", title: "", content: "", image: null });
    } catch (error) {
      console.error(error);
      setSuccessMessage("❌ There was an error submitting your blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Share Your Story</h2>
      <p className={styles.subtitle}>
        Share your knowledge, tips, or personal experience. Once approved by the
        CycleSafe team, your story will appear in our blog section.
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
          placeholder="Write your story here..."
          rows={6}
          value={formData.content}
          onChange={handleChange}
          required
        />

        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Blog"}
        </button>

        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SubmitBlogForm;
