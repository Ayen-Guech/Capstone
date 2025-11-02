import React, { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Article {
  views: ReactNode;
  author: ReactNode;
  category: ReactNode;
  id: number;
  title: string;
  summary: string;
}

export const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/articles/")
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      {articles.map(article => (
        <div key={article.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <h2>{article.title}</h2>
          <p>Category:{article.category}</p>
          <p>Author:{article.author}</p>
          <p>Views:{article.views}</p>
          <p>{article.summary}</p>
          <Link to={`/articles/${article.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};
export default ArticleList;