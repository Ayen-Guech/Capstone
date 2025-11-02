import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Local Axios instance for article endpoints (safe)
const articleApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  const loadArticle = async () => {
    try {
      const res = await articleApi.get(`/articles/${slug}/`);
      setArticle(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading article:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const addComment = async () => {
    if (!comment.trim()) return;
    await articleApi.post(`/articles/${slug}/comments/`, {
      name: 'Reader',
      body: comment,
    });
    setComment('');
    loadArticle();
  };

  const toggleLike = async () => {
    await articleApi.post(`/articles/${slug}/like/`);
    loadArticle();
  };

  if (loading) return <p className="text-center mt-5">Loading article...</p>;
  if (!article) return <p className="text-center mt-5 text-danger">Article not found.</p>;

  return (
    <div className="container mt-5 mb-5">
      <Link to="/articles" className="btn btn-outline-secondary mb-3">
        ← Back to Articles
      </Link>

      <div className="card shadow-sm p-4 border-0">
        <h2 className="fw-bold text-danger mb-3">{article.title}</h2>
        <p className="text-muted">{article.body}</p>

        <div className="d-flex align-items-center mt-4">
          <button onClick={toggleLike} className="btn btn-outline-danger btn-sm">
            ❤️ {article.like_count}
          </button>
        </div>

        <hr />
        <h5 className="mt-4">Comments</h5>

        {article.comments.length > 0 ? (
          article.comments.map((c: any) => (
            <div key={c.id} className="border rounded p-2 mb-2 bg-light">
              <strong>{c.name}</strong>
              <p className="mb-0">{c.body}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-3">
          <textarea
            className="form-control mb-2"
            rows={3}
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={addComment} className="btn btn-danger btn-sm">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
