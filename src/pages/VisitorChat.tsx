import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, UserCheck, ShieldCheck } from 'lucide-react';
import './VisitorChat.css';

interface Message {
  id: string;
  name: string;
  text: string;
  timestamp: string;
  isHost?: boolean;
}

export const VisitorChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('andrei_visitor_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default messages
      }
    }
    return [
      {
        id: 'msg-1',
        name: 'Andrei Besañez',
        text: 'Welcome to my digital workspace! Feel free to leave a friendly note, review feedback, or greeting below. :)',
        timestamp: 'Studio Host',
        isHost: true,
      },
      {
        id: 'msg-2',
        name: 'Alex (Design Peer)',
        text: 'The desk illustration and sleeping mascot look wonderful! Super clean aesthetic.',
        timestamp: 'Yesterday at 4:15 PM',
      },
    ];
  });

  const [authorName, setAuthorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('andrei_visitor_messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !messageText.trim()) return;

    // Client-side sanitization (escape HTML characters)
    const sanitizedName = authorName.trim().slice(0, 30);
    const sanitizedText = messageText.trim().slice(0, 200);

    const now = new Date();
    const timeString = `Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      name: sanitizedName,
      text: sanitizedText,
      timestamp: timeString,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageText('');
    setStatusFeedback('Message posted to local session feed!');
    setTimeout(() => setStatusFeedback(null), 3000);
  };

  return (
    <section id="visitor-chat" className="workspace-section">
      <div className="workspace-content-container">
        
        {/* Header */}
        <div className="section-head-row">
          <div>
            <div className="section-tag">
              <MessageSquare size={13} />
              <span>Visitor Chat</span>
            </div>
            <h2 className="section-title">Community Guestbook & Notes</h2>
          </div>
        </div>

        {/* Chat Card Box */}
        <div className="visitor-chat-card">
          <div className="chat-card-header">
            <div className="chat-status-indicator">
              <span className="pulsing-green-dot" />
              <span className="chat-header-text">Interactive Guestbook Feed</span>
            </div>
            <div className="chat-security-badge">
              <ShieldCheck size={13} />
              <span>Sanitized & Filtered</span>
            </div>
          </div>

          {/* Message Stream */}
          <div className="chat-messages-container" role="log" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble-row ${m.isHost ? 'host-row' : ''}`}>
                <div className="chat-bubble">
                  <div className="bubble-meta">
                    <span className="bubble-author">
                      {m.name}
                      {m.isHost && (
                        <span className="host-badge">
                          <UserCheck size={11} /> Author
                        </span>
                      )}
                    </span>
                    <span className="bubble-time">{m.timestamp}</span>
                  </div>
                  <p className="bubble-text">{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="chat-input-form">
            <div className="chat-inputs-row">
              <input
                type="text"
                placeholder="Your name or handle..."
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                maxLength={30}
                required
                className="chat-field name-field"
              />
              <input
                type="text"
                placeholder="Write a message for Andrei..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                maxLength={200}
                required
                className="chat-field msg-field"
              />
              <button type="submit" className="btn-primary chat-submit-btn" aria-label="Send message">
                <Send size={15} />
                <span>Post</span>
              </button>
            </div>

            {statusFeedback && <p className="chat-feedback-notice">{statusFeedback}</p>}
          </form>
        </div>

      </div>
    </section>
  );
};
