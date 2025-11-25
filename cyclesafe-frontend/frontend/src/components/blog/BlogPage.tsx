import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BlogPage.module.css";
import SubmitBlogForm from "./SubmitBlogForm";
import { Link } from "react-router-dom";

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
  image: string;
  name: string;
  submitted_at: string;
  likes_count: number;
  comments_count: number;
}

//  Backend URL for BOTH Localhost & Vercel
const VITE_BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [visibleComments, setVisibleComments] = useState<number[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Fetch all approved blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}api/blog/approved-posts/`);
        setBlogs(res.data.results || res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  //  Like a blog (instant + sync)
  const handleLike = async (id: number) => {
    const sessionId =
      localStorage.getItem("sessionId") || Math.random().toString(36);
    localStorage.setItem("sessionId", sessionId);

    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, likes_count: blog.likes_count + 1 } : blog
      )
    );

    try {
      await axios.post(`${VITE_BACKEND_URL}api/blog/${id}/like/`, {
        session_id: sessionId,
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // 💬 Submit comment (instant + sync)
  const handleCommentSubmit = async (id: number) => {
    const text = commentTexts[id];
    if (!text?.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: "Anonymous",
      comment_text: text,
      created_at: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], newComment] : [newComment],
    }));

    setCommentTexts((prev) => ({ ...prev, [id]: "" }));

    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? { ...blog, comments_count: blog.comments_count + 1 }
          : blog
      )
    );

    try {
      await axios.post(`${VITE_BACKEND_URL}api/blog/comment/`, {
        post: id,
        name: "Anonymous",
        comment_text: text,
      });
      fetchComments(id);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  //  Fetch comments for one blog
  const fetchComments = async (id: number) => {
    try {
      const res = await axios.get(
        `${VITE_BACKEND_URL}api/blog/approved-posts/${id}/`
      );
      setComments((prev) => ({ ...prev, [id]: res.data.comments || [] }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 👁 Toggle comment visibility
  const toggleComments = (id: number) => {
    setVisibleComments((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        fetchComments(id);
        return [...prev, id];
      }
    });
  };

  if (loading) return <p className={styles.loading}>Loading blogs...</p>;

  return (
    <div className={styles.container}>
      {/* Blog Header */}
      <div className={styles.blogHeader}>
        <h1>Welcome to the CycleSafe Community Blog</h1>
        <p>
          A safe space for women and girls to share stories, support each other,
          and learn about reproductive health. Every voice matters.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.mainContent}>
        {blogs.map((post) => (
          <div
            key={post.id}
            className={`${styles.card} ${
              visibleComments.includes(post.id) ? styles.expandedCard : ""
            }`}
          >
            {post.image && (
              <img src={post.image} alt={post.title} className={styles.image} />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.author}>👤 {post.name}</p>
              <p className={styles.date}>
                Published:{" "}
                {new Date(post.submitted_at).toLocaleDateString("en-GB")}
              </p>

              {/* Likes */}
              <div className={styles.actions}>
                <button
                  onClick={() => handleLike(post.id)}
                  className={styles.likeBtn}
                >
                  ❤️ {post.likes_count}
                </button>
              </div>

              {/*  Rules Notice */}
              <div className={styles.rulesNotice}>
                🛡 Community Rules Apply —{" "}
                <Link to="/community-guidelines" className={styles.rulesLink}>
                  View Guidelines »
                </Link>
              </div>

              {/* Comment Input */}
              <div className={styles.commentContainer}>
                <textarea
                  placeholder="Add a comment..."
                  value={commentTexts[post.id] || ""}
                  onChange={(e) =>
                    setCommentTexts((prev) => ({
                      ...prev,
                      [post.id]: e.target.value,
                    }))
                  }
                  className={styles.commentBox}
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className={styles.sendArrow}
                  title="Send comment"
                >
                  
                </button>
              </div>

              {/* Actions */}
              <div className={styles.commentActionRow}>
                <button
                  onClick={() => toggleComments(post.id)}
                  className={styles.commentBtn}
                >
                  💬 Comment ({post.comments_count})
                </button>

                <Link to={`/blog/${post.id}`} className={styles.readMore}>
                  Read more →
                </Link>
              </div>

              {/* Comment Section */}
              <div
                className={`${styles.commentSection} ${
                  visibleComments.includes(post.id)
                    ? styles.commentVisible
                    : ""
                }`}
              >
                {visibleComments.includes(post.id) && (
                  <div className={styles.commentList}>
                    {comments[post.id]?.length ? (
                      comments[post.id].map((c) => (
                        <div key={c.id} className={styles.commentItem}>
                          <strong>{c.name}</strong>: {c.comment_text}
                          <p className={styles.commentDate}>
                            {new Date(c.created_at).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className={styles.noComments}>No comments yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SIDEBAR */}
      <div className={styles.sidebar}>
        <h3>Latest Blogs</h3>
        <ul>
          {blogs.slice(0, 5).map((post) => (
            <li key={post.id} className={styles.sidebarItem}>
              <p className={styles.sidebarTitle}>{post.title}</p>
              <Link to={`/blog/${post.id}`} className={styles.readMore}>
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* BLOG FORM */}
      <div className={styles.formWrapper}>
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles.toggleButton}
        >
          {showForm ? "✖ Close Blog Form" : " Write a Blog"}
        </button>
        {showForm && (
          <div className={styles.formSection}>
            <SubmitBlogForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
