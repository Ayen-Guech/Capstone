import React, { useEffect, useRef } from 'react';

type Message = { sender: 'user'|'bot'; text: string };

interface Props {
  messages: Message[];
}

const ChatBox: React.FC<Props> = ({ messages }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={ref} style={{ maxHeight: 340, overflowY: 'auto', padding: 10 }}>
      {messages.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
          <div style={{
            background: m.sender === 'user' ? '#FF6F61' : '#f1f1f1',
            color: m.sender === 'user' ? 'white' : 'black',
            padding: '8px 12px',
            borderRadius: 12,
            maxWidth: '80%'
          }}>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
