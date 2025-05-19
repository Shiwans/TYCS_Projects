// src/pages/AdminAttendance.jsx
//admin
import "./ProjectManagement.css";
// import student from "../../data/students"
import { toast, Slide } from "react-toastify";
import { RowComponentForProjects } from "../RowComponent/RowComponent"
import { useState,useEffect } from "react";

// getproject
const ProjectManagement = () => {
  const [allprojects, setallprojects] = useState([]);
    const [filters, setFilters] = useState({
      department: "",
      batch: "",
      year: "",
      project: "",
      category: "",
    });
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    };
  
    const filteredStudents = allprojects.filter((project) => {
      return (
        (!filters.department || project.department === filters.department) &&
        (!filters.batch || project.batch === filters.batch) &&
        (!filters.year || project.year === filters.year) &&
        (!filters.project || project.project === filters.project) &&
        (!filters.category || project.category === filters.category)
      );
    });
    // console.log(filteredStudents)

      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}/admin/getproject`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Include cookies if needed
            });
    
            const data = await response.json();
            if (response.ok) {
              setallprojects(data.data || []); // Assuming `data` contains `data` field with students array
              toast.success("Data fetched!", {
                position: "top-right",
                theme: "light",
                transition: Slide,
                autoClose: 1000,
              });
            } else {
              console.error("Server error:", data.message);
              toast.error("Project data is not fetched!", {
                position: "top-right",
                theme: "dark",
                transition: Slide,
                autoClose: 1000,
              });
            }
          } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast.error("Failed to fetch projects. Please try again!", {
              position: "top-right",
              theme: "dark",
              transition: Slide,
              autoClose: 1000,
            });
          }
        };
    
        fetchProjects();
      }, []); 
  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Project Management</h1>
        <p>Here you can mark and manage attendance for students.</p>

        <div className="filter-section">
          <label>
            Department:
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
            </select>
          </label>

          <label>
            Batch:
            <select
              name="batch"
              value={filters.batch}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Batch1">Batch 1</option>
              <option value="Batch2">Batch 2</option>
              <option value="Batch3">Batch 3</option>
            </select>
          </label>

          <label>
            Year:
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </label>

          <label>
            Project Number:
            <select
              name="project"
              value={filters.project}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Project One">Project 1</option>
              <option value="Project Two">Project 2</option>
            </select>
          </label>

          <label>
            Category:
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Web Development">Web Development</option>
              <option value="Game Dev">Game Development</option>
              <option value="App Dev">App Development</option>
              <option value="Ml Al">ML/AI</option>
            </select>
          </label>
        </div>


        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Project Name</th>
              <th>Project Number</th>
              <th>Project Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((project, index) => (
              <RowComponentForProjects
                key={project._id }
                srNo={index + 1}
                rollNo={project.rollno}
                name={project.name}
                projectName={project.title}
                projectNo={project.project}
                projectLink={project.deployed}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
