// src/components/MenstrualCard.tsx
import React from "react";

export type MenstrualResult = {
  title: string;
  snippet: string;
  source: string;
  url: string;
  type?: string;
  published?: string | null;
};

interface Props {
  item: MenstrualResult;
  onOpen: (url: string, title: string) => void;
}

const MenstrualCard: React.FC<Props> = ({ item, onOpen }) => {
  return (
    <div className="menstrual-card shadow-sm">
      <div className="menstrual-card-top">
        <h4>{item.title}</h4>
        <div className="menstrual-meta">{item.source}{item.published ? ` • ${item.published}` : ""}</div>
      </div>
      <div className="menstrual-card-body">
        <p>{item.snippet}</p>
      </div>
      <div className="menstrual-card-footer">
        <button className="btn btn-outline-primary" onClick={() => onOpen(item.url, item.title)}>Open</button>
        <a className="btn btn-primary" href={item.url} target="_blank" rel="noopener noreferrer">Open in new tab</a>
      </div>
    </div>
  );
};

export default MenstrualCard;
