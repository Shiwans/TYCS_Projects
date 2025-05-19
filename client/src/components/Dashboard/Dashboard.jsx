import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState("Project One"); //Project 1 or Project Two
  const [currentSession, setCurrentSession] = useState(1);
  const [data, setData] = useState({}); //all data

  useEffect(() => {
    const fetchdash = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACK_URL
          }/admin/dashboard?project=${currentProject}`,
          {
            credentials: "include",
          }
        );
        const datas = await response.json();

        setData(datas);
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      }
    };

    fetchdash();
  }, [currentProject, currentSession]);

  // console.log(data);

  const currentProjectData = data || { totalStudents: 0, sessions: {} };
  const sessionData = data.sessions;
  const attendanceData = sessionData?.map((session, index) => ({
    session: `Session ${index + 1}`,
    present: session?.presentCount || 0,
    absent: session?.absentCount || 0
  })) || [];
  

  const recentUploads = data?.latestProjects || [];
  const projects = ["Project One", "Project Two"];
  const currentIndex = projects.indexOf(currentProject);
  const switchProject = (direction) => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentProject(projects[newIndex]);
    }
  };

  // const handleExport = async () => {
  //   try {
  //     const response = await fetch(
  //       // `${import.meta.env.VITE_BACK_URL}/admin/export?project=${currentProject}`,
  //       `${import.meta.env.VITE_BACK_URL}/admin/exportdata`,
  //       {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to export data");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `Export_${currentProject}.csv`; // Change format if needed
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error("Error exporting data:", error);
  //   }
  // };
  const handleExport = () => {
    // console.log("Exporting data...");
    navigate("/export-data");
    // window.open(`${import.meta.env.VITE_BACK_URL}/admin/exportdata`, "_blank");
  };
  const handleAddStudent = () => {
    navigate("/add-student"); // Navigate to the add-student page when the button is clicked
  };

  const switchSession = (direction) => {
    if (
      direction === "next" &&
      currentSession < currentProjectData.totalSessions
    ) {
      setCurrentSession((prev) => prev + 1);
    } else if (direction === "prev" && currentSession > 1) {
      setCurrentSession((prev) => prev - 1);
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <button className="button primary" onClick={handleExport}>
            Export Data
          </button>
          <button className="button secondary" onClick={handleAddStudent}>
            Add Student
          </button>
        </div>
      </header>

      {/* Project Selector */}
      <div className="project-selector">
        <button
          onClick={() => switchProject("prev")}
          disabled={currentProject === "Project One"}
          className="nav-button"
        >
          <ChevronLeft />
        </button>
        <h2 className="project-title">{currentProject}</h2>
        <button
          onClick={() => switchProject("next")}
          disabled={currentProject === "Project Two"}
          className="nav-button"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-value">{data.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Students in Class</h3>
          <p className="stat-value">{data.projectOneStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Project Uploaded</h3>
          <p className="stat-value">{data.projectOneCompleted}</p>
        </div>
        <div className="stat-card">
          <h3>Projects Not Uploaded</h3>
          <p className="stat-value">{data.projectOneNotUploaded}</p>
        </div>
        <div className="stat-card">
          <h3>Total Session</h3>
          <p className="stat-value">{data.totalSessions}</p>
        </div>
      </div>

      {/* Session Container */}
      <div className="session-container">
        <h2 className="section-title">Session Attendance</h2>
        <div className="session-nav">
          <button
            onClick={() => switchSession("prev")}
            disabled={currentSession === 1}
            className="nav-button"
          >
            <ChevronLeft />
          </button>
          <h3 className="session-title">Session {currentSession}</h3>
          <button
            onClick={() => switchSession("next")}
            disabled={currentSession === currentProjectData.totalSessions}
            className="nav-button"
          >
            <ChevronRight />
          </button>
        </div>

        {sessionData && sessionData[currentSession - 1] ? (
          <div className="attendance-stats">
            <div className="attendance-stat">
              <p className="label">Present</p>
              <p className="value present">
                {sessionData[currentSession - 1].presentCount}
              </p>
            </div>
            <div className="attendance-stat">
              <p className="label">Absent</p>
              <p className="value absent">
                {sessionData[currentSession - 1].absentCount}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading session data...</p>
        )}
      </div>

      {/* Charts */}
      <div className="chart-and-table">
     <div className="charts-grid">
        <div className="chart-container">
          <h2 className="section-title">Attendance Trend</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="session" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#28a745" />
                <Line type="monotone" dataKey="absent" stroke="#dc3545" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container">
          <h2 className="section-title">Project Completion Status</h2>
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[{
                name: 'Projects',
                uploaded: data.projectOneCompleted,
                notUploaded: data.projectOneNotUploaded
              }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uploaded" fill="#28a745" name="Uploaded" />
                <Bar dataKey="notUploaded" fill="#dc3545" name="Not Uploaded" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div> 

        {/* Recent Uploads Table */}
        <div className="table-container">
          <h2 className="section-title">Latest Project Uploads</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Title</th>
                <th>Rollno</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((upload, index) => (
                <tr key={index}>
                  <td>{upload.name}</td>
                  <td>{upload.title}</td>
                  <td>{upload.rollno}</td>
                  <td>{upload.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}; 

export default Dashboard;

// session data ko map laga kar show kar de
