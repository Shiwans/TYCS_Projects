import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import img2 from "../../assets/images/images1.png";
import img3 from "../../assets/images/images2.png";
import img4 from "../../assets/images/images3.png";
import img5 from "../../assets/images/images4.png";
import img6 from "../../assets/images/images5.png";
import profile from "../../assets/images/profile.png";
// import "./CardSection.css";
import HorizontalCard from "../HorizontalCard/HorizontalCard";
import "./HorizontalCardSection.css"

const HorizontalCardSection = ({
  onViewDetail,
  searchTerm = "",
  searchByRollNumber = false,
  year="",
  // batch = "",
  department = "",
  projectType = "",
  batchFilter = "",
}) => {
  const [projects, setProjects] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(13); // Number of items per page
  
  const images = [img2, img3, img4, img5, img6];
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // console.log("Fetching from:", import.meta.env.VITE_BACK_URL);
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/get-all-project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        const data = await response.json();
        // console.log(data);
        if (Array.isArray(data.data)) {
          setProjects(data.data);
          // console.log("Projects fetched and set:", data.data);
        } else {
          console.error("Fetched data is not an array:", data.data);
        }
      } catch (error) {
        console.error("Unable to fetch projects", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();

    // Filter by search term
    const matchesSearch = searchByRollNumber
      ? project.rollno?.toString().includes(term)
      : project.name?.toLowerCase().includes(term);

    // Filter by batch
    const matchesBatch = year ? project.year === year : true;

    // Filter by department
    const matchesDepartment = department ? project.department === department : true;

    // Filter by project type
    const matchesProjectType = projectType ? project.project === projectType : true;

    // Filter by batch filter
    const matchesBatchFilter = batchFilter ? project.batch === batchFilter : true;

    return matchesSearch && matchesBatch && matchesDepartment && matchesProjectType && matchesBatchFilter;
  });

  // Generate random images for each filtered project
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="horizontal-card-section">
      {currentProjects.length > 0 ? (
        currentProjects.map((project) => (
          <HorizontalCard
            key={project._id}
            rollNo={project.rollno}
            profilepic={project.userId.profilepic}
            title={project.title}
            description={project.description}
            name={project.name}
            onViewDetail={onViewDetail}
            project={project}

          />
        ))
      ) : (
        <div className="no-projects-container">
          <p className="no-projects-message">No Projects to Show</p>
        </div>
      )}
      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HorizontalCardSection;
