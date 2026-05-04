"use client";

import React, { useState } from 'react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can we help you today?", isBot: true }
  ]);

  const quickQuestions = [
    { q: "Visa Requirements", a: "We provide support for UK, USA, Canada, and more. What country are you interested in?" },
    { q: "Bank Solvency", a: "We provide verified bank solvency documents for any amount within 24-48 hours." },
    { q: "Office Address", a: "Our office is at 10/2, Gawsia Kashem Center (4th floor), Motijheel, Dhaka." },
    { q: "Talk to Agent", a: "Sure! Please click the WhatsApp button to chat with our expert directly." }
  ];

  const handleQuestion = (q: string, a: string) => {
    setMessages(prev => [
      ...prev, 
      { text: q, isBot: false },
      { text: a, isBot: true }
    ]);
  };

  return (
    <div style={{ position: 'fixed', bottom: '100px', right: '30px', zIndex: 1000 }}>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '300px',
          height: '400px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '20px',
          border: '1px solid #eee'
        }}>
          {/* Header */}
          <div style={{ backgroundColor: '#007bff', color: '#fff', padding: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
            <span>BD Trippers Bot 🤖</span>
            <span onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }}>&times;</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                marginBottom: '10px', 
                textAlign: msg.isBot ? 'left' : 'right' 
              }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '8px 12px', 
                  borderRadius: '15px', 
                  backgroundColor: msg.isBot ? '#e9ecef' : '#007bff',
                  color: msg.isBot ? '#333' : '#fff',
                  fontSize: '14px',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {quickQuestions.map((item, i) => (
              <button 
                key={i} 
                onClick={() => handleQuestion(item.q, item.a)}
                style={{ 
                  fontSize: '12px', 
                  padding: '5px 10px', 
                  borderRadius: '10px', 
                  border: '1px solid #007bff', 
                  backgroundColor: 'transparent',
                  color: '#007bff',
                  cursor: 'pointer'
                }}
              >
                {item.q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px 20px',
          borderRadius: '30px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 15px rgba(0,123,255,0.4)',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '120px'
        }}
      >
        {isOpen ? <i className="fas fa-times me-2"></i> : <i className="fas fa-comment-dots me-2"></i>}
        {isOpen ? 'Close' : 'Live Chat'}
      </button>
    </div>
  );
};

export default ChatBot;
