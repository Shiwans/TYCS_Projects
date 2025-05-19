import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')} className="not-found-link">
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
