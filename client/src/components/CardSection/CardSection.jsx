import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import img2 from "../../assets/images/images1.png";
import img3 from "../../assets/images/images2.png";
import img4 from "../../assets/images/images3.png";
import img5 from "../../assets/images/images4.png";
import img6 from "../../assets/images/images5.png";
import "./CardSection.css";

const CardSection = ({
  onViewDetail,
  searchTerm = "",
  searchByRollNumber = false,
  batch = "",
  department = "",
  projectType = "",
  batchFilter = "",
}) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16); // Number of items per page

  const images = [img2, img3, img4, img5, img6];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/get-all-project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
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

    const matchesSearch = searchByRollNumber
      ? project.rollno?.toString().includes(term)
      : project.name?.toLowerCase().includes(term);

    const matchesBatch = batch ? project.batch === batch : true;

    const matchesDepartment = department ? project.department === department : true;

    const matchesProjectType = projectType ? project.project === projectType : true;

    const matchesBatchFilter = batchFilter ? project.batch === batchFilter : true;

    return matchesSearch && matchesBatch && matchesDepartment && matchesProjectType && matchesBatchFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="card-section">
      {currentProjects.length > 0 ? (
        currentProjects.map((project) => (
          <Card
            key={project._id}
            image={getRandomImage()}
            title={project.title}
            description={project.description}
            name={project.name}
            onViewDetail={onViewDetail}
            project={project}
            // profileImage="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            profilepic={project.userId.profilepic}
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

export default CardSection;
