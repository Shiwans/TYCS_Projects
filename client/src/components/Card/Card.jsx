import React from "react";
import "./Card.css";

const Card = ({ image, title, description, onViewDetail, name, project, profilepic }) => {
  const defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    const handleImageError = (e) => {
      e.target.src = defaultProfilePic;
    };
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-name">
          ~{name.length > 10 ? `${name.substring(0, 5)}...` : name.split(" ")[0]}
        </p>
        <button className="main-card-button" onClick={() => onViewDetail(project)}>
          View Details
        </button>
      </div>
      {/* Profile Picture */}
      <img src={profilepic} alt={defaultProfilePic} className="profile-picture" onError={handleImageError}   />
    </div>
  );
};

export default Card;
