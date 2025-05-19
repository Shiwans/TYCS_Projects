// src/components/Content.jsx
import React from "react";
import "./Content.css"; // Add styles for Content

const Content = ({ children }) => {
  return (
    <div className="content">
      {children}
    </div>
  );
};

export default Content;
