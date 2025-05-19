import React, { useState, useEffect } from "react";
import "./EventDetailsForm.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EventDetailsForm = ({
  editingProjectId,
  // userdata,
  initialData = {},
}) => {
  const [user,setUserD] = useState({})
  const [name, setName] = useState(initialData.name || "");
  const [rollNo, setRollNo] = useState(initialData.rollno || "");
  const [projectTitle, setProjectTitle] = useState(initialData.title || "");
  const [projectDescription, setProjectDescription] = useState(
    initialData.description || ""
  );
  const [projectCategory, setProjectCategory] = useState(
    initialData.category || ""
  );
  const [department, setDepartment] = useState(initialData.department || "");
  const [year, setYear] = useState(initialData.year || "");
  const [deployedLink, setDeployedLink] = useState(initialData.deployed || "");
  const [githubLink, setGithubLink] = useState(initialData.github || "");
  const [futureEnhancements, setFutureEnhancements] = useState(
    initialData.future || ""
  );
  const [twitterLink, setTwitterLink] = useState(initialData.twitter || "");
  const [instagramLink, setInstagramLink] = useState(
    initialData.instagram || ""
  );
  const [linkedinLink, setLinkedinLink] = useState(initialData.linkedin || "");
  const [progressColor, setProgressColor] = useState("red");
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(
    initialData.project || ""
  );
  const [selectedBatch, setSelectedBatch] = useState(initialData.batch || "");
  const [isCompletedProject, setIsCompletedProject] = useState(
    initialData.iscompleted || true
  );

  // console.log("data coming",userdata)
  useEffect(() => {
    if (!isCompletedProject) {
      setDeployedLink("");
    }
  }, [isCompletedProject]);
  
  useEffect(() => {
    const getUserDt = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/data`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        
        const data = await response.json();
        // console.log(data)
        if (response.ok) {
          setUserD(data.userData);
          setName(data.userData.name)
          setRollNo(data.userData.rollno)
          setYear(data.userData.year)
          setSelectedBatch(data.userData.batch)
          setDepartment(data.userData.department)
           // Store user data in state
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };
    
    getUserDt();
  }, []);

  const resetForm = () => {
    setName("");
    setRollNo("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectCategory("");
    setSelectedBatch("");
    setSelectedProject("");
    setDepartment("");
    setYear("");
    setDeployedLink("");
    setFutureEnhancements("");
    setGithubLink("");
    setTwitterLink("");
    setInstagramLink("");
    setLinkedinLink("");

    setCompletionPercentage(0);
    setProgressColor("red");
    setIsCompletedProject(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the name to uppercase
    // console.log("name from userstate",name)
    const upperCaseName = name.toUpperCase();
    try {
      const url = editingProjectId
        ? `${import.meta.env.VITE_BACK_URL}/${editingProjectId}`
        : // ? `https://tycs-projects-backend-bnlr.onrender.com/${editingProjectId}`
          `${import.meta.env.VITE_BACK_URL}`;
      // : "https://tycs-projects-backend-bnlr.onrender.com/";
      const method = editingProjectId ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: upperCaseName,
          rollno: rollNo,
          description: projectDescription,
          category: projectCategory,
          title: projectTitle,
          deployed: deployedLink,
          future: futureEnhancements,
          department: department,
          year: year,
          github: githubLink,
          twitter: twitterLink,
          linkedin: linkedinLink,
          instagram: instagramLink,
          project: selectedProject,
          batch: selectedBatch,
          iscompleted: isCompletedProject, // Add this field to the backend
        }),
        credentials: "include",
      });

      const data = await response.json();
      // console.log("Response Data:", data);

      if (response.ok) {
        const successMessage = data.message || (editingProjectId ? "Project updated!" : "Project added!");

        navigate("/my-projects");
        toast.success(
          successMessage,
          { autoClose: 1000 }
        );
        resetForm();
        // setTimeout(()=>{
        //   setEditProjectId(null);
        // },1000)
        // window.location.reload();
        window.location.reload();
        // setTimeout(() => {
        // }, 1500);
      } else {
        // Log error details
        console.error("Error details:", data);
        // toast.error(
          // `Error ${editingProjectId ? "updating" : "saving"} project!`,
          // { autoClose: 1000 }
        // );
        // console.log(data.message)
        toast.error(data.message || `Error occurred. `, { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Network or unknown error:", error);
    toast.error("Something went wrong. Please try again.", { autoClose: 1000 });
    }
  };

  const calculateCompletionPercentage = () => {
    const totalFields = 15; // Total fields to track
    let completedFields = 0;

    // Count filled fields
    if (name) completedFields++;
    if (rollNo) completedFields++;
    if (projectTitle) completedFields++;
    if (projectDescription) completedFields++;
    if (projectCategory) completedFields++;
    if (isCompletedProject && deployedLink) completedFields++;
    if (department) completedFields++;
    if (year) completedFields++;
    if (githubLink) completedFields++;
    if (futureEnhancements) completedFields++;
    if (twitterLink) completedFields++;
    if (instagramLink) completedFields++;
    if (linkedinLink) completedFields++;
    if (selectedProject) completedFields++; // Project selection
    if (selectedBatch) completedFields++; // Batch selection

    const percentage = (completedFields / totalFields) * 100;
    setCompletionPercentage(percentage);

    const requiredFieldsFilled =
      name &&
      rollNo &&
      projectTitle &&
      projectDescription &&
      department &&
      projectCategory &&
      selectedProject && // Check for selected project
      selectedBatch && // Check for selected batch
      // githubLink && // Check for
      (isCompletedProject ? deployedLink : true
      );

    setProgressColor(requiredFieldsFilled ? "#007bff" : "red");
  };

  useEffect(() => {
    calculateCompletionPercentage();
  }, [
    name,
    rollNo,
    projectTitle,
    projectDescription,
    projectCategory,
    deployedLink,
    department,
    year,
    githubLink,
    futureEnhancements,
    twitterLink,
    instagramLink,
    linkedinLink,
    selectedProject,
    selectedBatch,
  ]);

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
      <h3> {editingProjectId ? "Update Project" : "Add Project"}</h3>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${completionPercentage}%`,
            backgroundColor: progressColor,
          }}
        />
      </div>
      <div className="progress-percentage">
        {completionPercentage.toFixed(0)}%
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setName(e.target.value)}
            placeholder={user.name}
            minLength={3}
            maxLength={20}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label>
            Roll No: <span className="required">*</span>
          </label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 3 && /^[4][0-9]{0,2}$/.test(value)) {
                setRollNo(value);
              }
            }}
            placeholder="Enter your roll number"
            required
            minLength="3"
            maxLength="3"
            disabled
          />
        </div>

        <div className="form-group">
          <label>
            Project Title: <span className="required">*</span>
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter the project title"
            required
            minLength={3}
            maxLength={30}
          />
        </div>
        <div className="form-group">
          <label>
            Is Completed Project: <span className="required">*</span>
          </label>
          <input
            type="checkbox"
            checked={isCompletedProject}
            onChange={(e) => setIsCompletedProject(e.target.checked)}
          />
        </div>
      </div>

      <div className="form-row full-width">
        <div className="form-group full-width">
          <label>
            Project Description: <span className="required">*</span>
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project..."
            minLength={100}
            maxLength={4000}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label>
            Project Category: <span className="required">*</span>
          </label>
          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Game Development">Game Development</option>
            <option value="Blockchain">Blockchain</option>
          </select>
        </div>
        {/* New Project Selection Dropdown */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Project: <span className="required">*</span>
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Project
              </option>
              <option value="Project One">Project One</option>
              <option value="Project Two">Project Two</option>
            </select>
          </div>
        </div>

        {/* New Batch Selection Dropdown */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Batch: <span className="required">*</span>
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              required
              disabled
            >
              <option value="" disabled>
                Select Batch
              </option>
              <option value="Batch1">Batch 1</option>
              <option value="Batch2">Batch 2</option>
              <option value="Batch3">Batch 3</option>
            </select>
          </div>
        </div>

        {/* Department */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Department: <span className="required">*</span>
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              disabled
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Year: <span className="required">*</span>
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              disabled
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
        </div>
        <div className="form-group half-width">
          <label>
            Deployed Link: <span className="required">*</span>
          </label>
          <input
            type="url"
            value={deployedLink}
            onChange={(e) => setDeployedLink(e.target.value)}
            placeholder="Enter the deployed link"
            required={isCompletedProject} // Only required if the checkbox is checked
            disabled={!isCompletedProject} // Disable if the checkbox is not checked
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label>Future Enhancements:</label>
          <textarea
            value={futureEnhancements}
            onChange={(e) => setFutureEnhancements(e.target.value)}
            placeholder="Describe future enhancements (optional)"
          />
        </div>
      </div>

      <h4 className="social-media-title">Social Media Links</h4>
      <div className="social-media-links">
        <div className="form-group">
          <label>Twitter Link:</label>
          <input
            type="url"
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
            placeholder="Enter Twitter link"
          />
        </div>
        <div className="form-group">
          <label>Instagram Link:</label>
          <input
            type="url"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            placeholder="Enter Instagram link"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn Link:</label>
          <input
            type="url"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            placeholder="Enter LinkedIn link"
          />
        </div>
        <div className="form-group">
          <label>
            Github Link:
          </label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="Enter GitHub link"
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        {editingProjectId ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default EventDetailsForm;
