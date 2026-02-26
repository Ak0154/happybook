"use client";

import { useState } from 'react';

export default function AiTutorPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your AI Tutor. I can help you with math, essay writing, or explaining complex concepts. What are you working on today?" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: "That's an interesting question! Let's break it down step by step. First, recall that..."
            }]);
        }, 1000);
    };

    return (
        <div className="tutor-shell">
            <div className="chat-container">
                <div className="messages-area">
                    {messages.map((msg, i) => (
                        <div key={i} className={`message-row ${msg.role}`}>
                            {msg.role === 'assistant' && <div className="avatar">🤖</div>}
                            <div className="bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSend} className="input-area">
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="send-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>

            <style jsx>{`
        .tutor-shell {
          height: calc(100vh - 140px); /* Adjust based on header/padding */
          display: flex;
          flex-direction: column;
        }

        .chat-container {
          flex: 1;
          background: var(--card);
          border-radius: 20px;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .messages-area {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-row {
          display: flex;
          gap: 12px;
          max-width: 80%;
        }
        .message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        
        .avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--primary);
          display: grid;
          place-items: center;
          font-size: 18px;
        }

        .bubble {
          padding: 12px 18px;
          border-radius: 16px;
          line-height: 1.5;
          font-size: 15px;
        }
        .assistant .bubble {
          background: var(--surface);
          color: var(--on-surface);
          border-top-left-radius: 4px;
        }
        .user .bubble {
          background: var(--primary);
          color: var(--on-primary);
          border-top-right-radius: 4px;
        }

        .input-area {
          padding: 16px;
          background: var(--surface);
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex;
          gap: 12px;
        }
        .input-area input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.1);
          outline: none;
          font-family: inherit;
        }
        .input-area input:focus { border-color: var(--primary); }
        
        .send-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--on-primary);
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .send-btn:hover { transform: scale(1.05); }
      `}</style>
        </div>
    );
}
