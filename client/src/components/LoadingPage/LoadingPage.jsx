import React, { useState, useEffect } from "react";
import "./LoadingPage.css";

const messages = [
  "Preparing something awesome...",
  "Just a moment, magic is happening...",
  "Good things take time...",
  "Almost there, stay with us...",
  "Setting up the experience..."
];

const LoadingPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{messages[messageIndex]}</p>
      <div className="bouncing-dot">✨</div>
    </div>
  );
};

export default LoadingPage;