import React from 'react';
import './ProjectCard.css';
import img from '../../assets/images/images.png';

const ProjectCard = ({ project, onEdit, onDelete }) => {
    // console.log("project card ",project)
    return (
        <div className="project-card">
            <img src={img} alt={project.title} className="project-image" />
            <div>
                <span className="project-title-myproject">{project.title}</span>
                {/* <span className='project-title-myproject'>{project.project}</span> */}
            </div>
            <div className="project-buttons">
                <button className="edit-button" onClick={() => onEdit(project._id)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(project._id)}>Delete</button>
            </div>
        </div>
        
    );
};

export default ProjectCard;