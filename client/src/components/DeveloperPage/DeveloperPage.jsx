import React, { useState } from "react";
import "./DeveloperPage.css";

const DeveloperPage = () => {
  const [feedback, setFeedback] = useState(localStorage.getItem("userFeedback") || "");
  const [animate, setAnimate] = useState(false);

  const handleFeedback = (type) => {
    if (feedback === type) {
      setFeedback("");
      localStorage.removeItem("userFeedback");
    } else {
      setFeedback(type);
      localStorage.setItem("userFeedback", type);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
  };

  const developers = [
    {
      name: "Dev Ghildiyal",
      rollNo: "421",
      college: "Guru Nanak Khalsa College",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/dev-ghildiyal-8777a8329/",
      github: "https://github.com/DEV-GHILDIYAL",
      skills: ["React", "CSS", "Javascript", "Node.js", "MongoDB"],
      image: "https://media.licdn.com/dms/image/v2/D5603AQHRVwb-Ssicug/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729701992550?e=1746057600&v=beta&t=nOeB0xqKbdTjpujMkxtn9T3cgBkhsxhtjQZYiyrVB3E"
    },
    {
      name: "Shiwans Vaishya",
      rollNo: "477",
      college: "Guru Nanak Khalsa College",
      role: "Full Stack Developer",
      linkedin: "https://www.linkedin.com/in/shiwans-vaishya/",
      github: "https://github.com/Shiwans/",
      skills: ["Express.js", "JavaScript", "CSS", "MongoDB", "Node.js"],
      image: "https://media.licdn.com/dms/image/v2/D4D03AQH6e9hsUBRIUg/profile-displayphoto-shrink_800_800/B4DZU1iKGgG4Ac-/0/1740359917573?e=1746057600&v=beta&t=wpMq4t8OBrB2qbcKlqJPEXGN7lWmCeRhiy6kiLn70lo"
    }
  ];

  return (
    <div className="developer-container">
      <h1 className="developer-title">Meet the Developers</h1>
      <div className="developer-grid">
        {developers.map((dev, index) => (
          <div key={index} className="developer-card">
            <img src={dev.image} alt={dev.name} className="developer-image" />
            <h2 className="developer-name">{dev.name}</h2>
            <p className="developer-info">Roll No: {dev.rollNo}</p>
            <p className="developer-info">{dev.college}</p>
            <p className="developer-info">Role: {dev.role}</p>
            <p className="developer-skills">Skills: {dev.skills.join(", ")}</p>
            <div className="developer-links">
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="developer-link">LinkedIn</a>
              <a href={dev.github} target="_blank" rel="noopener noreferrer" className="developer-link">GitHub</a>
            </div>
          </div>
        ))}
      </div>
      <div className="feedback-section">
        <p>Do you like this project?</p>
        <div className="feedback-buttons">
          <button 
            className={`feedback-button ${feedback === "like" ? "active-like" : ""} ${animate ? "animate" : ""}`} 
            onClick={() => handleFeedback("like")}
          >
            👍 Like
          </button>
          <button 
            className={`feedback-button ${feedback === "dislike" ? "active-dislike" : ""} ${animate ? "animate" : ""}`} 
            onClick={() => handleFeedback("dislike")}
          >
            👎 Dislike
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
