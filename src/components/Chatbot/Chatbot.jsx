import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';
import ReactMarkdown from 'react-markdown';
import chatbotImg from '../../assets/customer-service.gif';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! Ask me anything about this portfolio 👋' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post('https://portfolio-backend-chatbot.onrender.com/api/chat', {
        messages: updatedMessages
      },  { headers: { 'Content-Type': 'application/json' } }
    );

      setMessages([...updatedMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Oops! Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-wrapper">
      {/* Toggle Button */}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : <img src={chatbotImg} alt="Chat" className="chat-icon relative left-1.5" width={48} height={48}/>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Rohit's Portfolio Assistant</span>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.role=='assistant' ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
              </div>
            ))}
            {loading && <div className="message assistant">Typing...</div>}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}