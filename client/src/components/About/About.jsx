import React from "react";
import "./About.css";
import { Link, Navigate } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <div className="about-section">
        <h2>What This Website Is About</h2>
        <p className="about-section-p">
          This website was created to showcase the final-year projects of
          TYCSstudents from Guru Nanak Khalsa College, Computer Science
          Department.It provides a platform where students can share their
          projects withtheir peers. Students can deploy their projects
          externally usingplatforms like Netlify, Heroku, or even Appetize.io
          for mobile apps,which allows them to run their apps in a browser as an
          emulator. Afterdeployment, students can submit the project link
          through our website.Once submitted, the project card will be displayed
          on the home screen,allowing others in the class to easily view and
          access the projectsonline. Additionally, an admin panel has been
          introduced for department project teachers. The admin panel allows
          teachers to Create attendance sessions and mark student attendance.
          View all students and their profiles. View all student projects
          submitted to the platform. Manage attendance records, tracking which
          students were present or absent in each session. For students, a
          profile page has been added where they can View attendance records,
          showing which sessions they were present or absent for. Edit their
          profile details,updating their information as needed. With these new
          features, the platform not only serves as a project showcase but also
          as acentralized system for managing project-related activities
          efficiently.
        </p>
      </div>

      <div className="about-section">
        <h2>Inspiration</h2>
        <p className="about-section-p">
          This project was inspired by the need for a more organized way to
          present and access final-year projects during the project sessions.
          Instead of individually presenting projects through local setups like{" "}
          <strong>VS Code</strong>, students can now simply submit a deployed
          link to this website. This not only makes it easier for students to
          showcase their work but also provides teachers with a centralized
          platform to search for and view student projects by name, along with
          detailed descriptions and ideas. It streamlines the entire process,
          making project reviews more efficient and accessible for everyone.
        </p>
      </div>

      <div className="about-section">
        <h2>Technology Stack</h2>
        <p className="about-section-p">
          This project is built using the MERN stack, which includes: MongoDB
          for the database Express.js for the backend React.js for the frontend
          Node.js for server-side operations Together, these technologies
          provide a full-stack solution that allows for efficient, scalable, and
          dynamic web development. The entire project is powered by the MERN
          stack, making it a complete and robust solution for organizing and
          displaying student projects.
        </p>
      </div>

      <div className="about-section">
        <h2>Meet the Developers</h2>
        <p className="about-section-p">
          This website was developed by Dev (Roll No. 421) and Shiwans (Roll No.
          477), students from the TYCS class at Guru Nanak Khalsa College. We
          built this platform in just 28 hours, and it's still a work in
          progress. If you encounter any bugs or have suggestions for
          improvement, please feel free to{" "}
          <a
            href="https://forms.gle/MewwVorSko7ctt3C8"
            target="_blank"
            rel="noopener noreferrer"
          >
            fill out this form
          </a>.
          To learn more about us, <Link to="/developer-info">click here</Link> to view our dedicated developer page, where you will find our photos and detailed descriptions about our roles in the project.
        </p>
      </div>
    </div>
  );
};

export default About;
