import React from "react";
import "./ProjectDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const ProjectDetail = ({ project, onBack }) => {
  // console.log(project);
  return (
    <div className="project-detail-container">
      <div className="title-button-container">
        <button onClick={onBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} className="back-button-icon" />
          Back
        </button>
        <h2 className="project-title">
          {project ? project.title : "Add New Project"}
        </h2>
      </div>

      <div className="project-detail-row">
        <div>
          <strong>Name:</strong> {project.name}
        </div>
        <div>
          <strong>Roll Number:</strong> {project.rollno}
        </div>
        <div>
          <strong>Email:</strong> {project.email}
        </div>
        <div>
          <strong>Category:</strong> {project.category}
        </div>
      </div>

      <div className="project-detail-row">
      {project.deployed && (
        <div>
          <strong>Deployed Link:</strong>
          <a
            href={project.deployed}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit deployed site"
            className="icon-only-link"
          >
            <FontAwesomeIcon icon={faLink} className="link-icon" />
          </a>
        </div>)}
      </div>

      <div className="project-detail-description">
        <strong>Project Description:</strong>
        <p>{project.description}</p>
      </div>
      {(project.future && (
      <div className="project-detail-description">
        <strong>Future Enhancement:</strong>
        <p>{project.future}</p>
      </div>
      ))}

      {(project.github ||
        project.linkedin ||
        project.instagram ||
        project.twitter) && (
        <div className="social-media-section">
          <h3>Social Media Links</h3>
          <div className="social-media-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="social-icon" />{" "}
                GitHub
              </a>
            )}
            {project.linkedin && (
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />{" "}
                LinkedIn
              </a>
            )}
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="social-icon" />{" "}
                Instagram
              </a>
            )}
            {project.twitter && (
              <a
                href={project.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} className="social-icon" />{" "}
                Twitter
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
