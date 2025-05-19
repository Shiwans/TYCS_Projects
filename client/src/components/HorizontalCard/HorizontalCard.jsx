import React from "react";
import "./HorizontalCard.css";

const HorizontalCard = ({ profilepic, title, name, rollNo, onViewDetail, project }) => {
  const defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // Function to handle image load error and fall back to default image
  const handleImageError = (e) => {
    e.target.src = defaultProfilePic;
  };
  return (
    <div className="horizontal-card">
      {/* Left section with profile picture, name, and roll number */}
      <div className="horizontal-card-left">
        <img
          src={profilepic}
          alt={name}
          className="horizontal-card-profile-pic"
          onError={handleImageError}
        />
        <div className="horizontal-card-name-roll">
          <p className="horizontal-card-name">
            {name}
          </p>
        </div>
      </div>

        <div className="horizontal-card-middle">
      {/* Center section with project title */}
      <p className="horizontal-card-title">{title}</p>
      <p className="horizontal-card-roll">Roll No: {rollNo}</p>
      </div>

<div className="horizontal-card-right">
      {/* Right section with the button */}
      <button
        className="horizontal-card-button"
        onClick={() => onViewDetail(project)}
      >
        View Details
      </button>
      </div>
    </div>
  );
};

export default HorizontalCard;
