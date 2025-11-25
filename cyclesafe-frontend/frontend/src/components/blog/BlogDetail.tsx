import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from "./BlogPage.module.css";

interface Comment {
  id: number;
  name: string;
  comment_text: string;
  created_at: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  name: string;
  submitted_at: string;
  likes_count: number;
  comments?: Comment[];
}

// 🌍 Backend URL for both Localhost & Production (FIXED WITH SLASH)
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  // 📌 Fetch single blog
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}api/blog/approved-posts/${id}/`
        );
        setPost(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // ❤️ Like button
  const handleLike = async () => {
    if (!id) return;

    const sessionId =
      localStorage.getItem("sessionId") || Math.random().toString(36);
    localStorage.setItem("sessionId", sessionId);

    try {
      await axios.post(`${API_BASE_URL}api/blog/${id}/like/`, {
        session_id: sessionId,
      });

      const updated = await axios.get(
        `${API_BASE_URL}api/blog/approved-posts/${id}/`
      );
      setPost(updated.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // 💬 Submit comment
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !id) return;

    try {
      await axios.post(`${API_BASE_URL}api/blog/comment/`, {
        post: id,
        name: "Anonymous",
        comment_text: commentText,
      });

      setCommentText("");

      const updated = await axios.get(
        `${API_BASE_URL}api/blog/approved-posts/${id}/`
      );
      setComments(updated.data.comments || []);
      setPost(updated.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) return <p className={styles.loading}>Loading blog...</p>;
  if (!post) return <p className={styles.error}>Blog not found.</p>;

  return (
    <div className={styles.detailContainer}>
      {post.image && (
        <img src={post.image} alt={post.title} className={styles.detailImage} />
      )}

      <h1 className={styles.detailTitle}>{post.title}</h1>
      <p className={styles.detailAuthor}>👤 {post.name}</p>
      <p className={styles.detailDate}>
        📅 {new Date(post.submitted_at).toLocaleDateString("en-GB")}
      </p>

      <div className={styles.detailContent}>{post.content}</div>

      {/* === Like button === */}
      <div className={styles.detailActions}>
        <button onClick={handleLike} className={styles.likeBtn}>
          {post.likes_count}
        </button>
      </div>

      {/* === Comment input === */}
      <div className={styles.commentContainer}>
        <textarea
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className={styles.commentBox}
        />
        <button onClick={handleCommentSubmit} className={styles.sendArrow}>
          ➤
        </button>
      </div>

      {/* === Comments list === */}
      <div className={styles.commentList}>
        <h4 className={styles.commentHeader}>
          💬 Comments ({comments.length})
        </h4>

        {comments.length ? (
          comments.map((c) => (
            <div key={c.id} className={styles.commentItem}>
              <strong>{c.name}</strong>: {c.comment_text}
              <p className={styles.commentDate}>
                {new Date(c.created_at).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))
        ) : (
          <p className={styles.noComments}>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      <Link to="/blog" className={styles.backLink}>
        ← Back to all blogs
      </Link>
    </div>
  );
};

export default BlogDetail;
