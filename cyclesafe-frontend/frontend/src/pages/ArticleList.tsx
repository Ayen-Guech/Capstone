import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// ✅ Local Axios instance for the article API only (safe for 5173 → 8000)
const articleApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/articles',
});

export default function ArticleList() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    articleApi
      .get('/articles/')
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading articles...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4 text-danger fw-bold">Health & Wellness Articles</h2>

      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-semibold text-primary">{article.title}</h5>
                <p className="card-text text-muted">{article.summary}</p>
                <Link
                  to={`/articles/${article.slug}`}
                  className="btn btn-outline-danger btn-sm mt-2"
                >
                  Read More
                </Link>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between small text-secondary">
                <span>❤️ {article.like_count}</span>
                <span>{article.comments.length} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
