import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerNavbar from '../Components/CustomerNavbar';

function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchMessages();
  }, []);

const fetchMessages = async () => {
  try {
    const res = await axios.get(`http://localhost:5050/questions/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    });
    setMessages(res.data);
  } catch (err) {
    console.error(err);
  }
};


  const handleSend = async () => {
    if (!question.trim()) return;

    try {
  await axios.post(
    'http://localhost:5050/questions/ask',
    {
      userId,
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    }
  );
  setQuestion('');
  fetchMessages();
} catch (err) {
  console.error(err);
}

  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
    <CustomerNavbar />
   
    <div className="container py-4" style={{ maxWidth: '40%', height: '80vh' }}>
      <div className="border rounded shadow-sm d-flex flex-column h-100 w-100">
        {/* Header */}
        <div className="bg-warning text-white text-center py-2 rounded-top">
          <h5 className="mb-0">Ask Your Questions</h5>
        </div>

        {/* Chat Body */}
        <div
          className="flex-grow-1 p-3 overflow-auto"
          style={{ background: '#f8f9fa' }}
        >
          {messages.map((msg) => (
            <div key={msg.id}>
              {/* User Question */}
              <div className="d-flex justify-content-end mb-2">
                <div className="bg-primary text-white p-2 rounded" style={{ maxWidth: '75%' }}>
                  <small><strong>You:</strong></small>
                  <div>{msg.question}</div>
                </div>
              </div>

              {/* Admin Answer */}
              {msg.isAnswered && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="bg-light border p-2 rounded" style={{ maxWidth: '75%' }}>
                    <small><strong>Admin:</strong></small>
                    <div>{msg.answer}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="d-flex border-top p-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-warning" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
     </>
  );
}

export default AskQuestion;
