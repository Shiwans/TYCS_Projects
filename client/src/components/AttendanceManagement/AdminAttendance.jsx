import React, { useState, useEffect } from "react";
import "./AdminAttendance.css";
import { RowComponentForAttendance } from "../RowComponent/RowComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../LoadingPage/LoadingPage";

const AdminAttendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, sessionToView } = location.state || {};
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [loading, setLoading] = useState(true);

  let main = [];
  let sessionId = null;
  let date = null;
  let sessionNo = null;
  //only working when created session
  //it contains message and session details with students in there...
  //email is null in there 
  // console.log("admin attendance data console.log",data) 
  if (data?.session) {
    main = data.session.students;
    sessionId = data.session._id;
    sessionNo =  data.session.sessionNo;
    date = data.session.date;
  }
  //this has only student data which are inside session
  // console.log("main after data?.session",main)

  // console.log("now viewing SessionToview",sessionToView)
  // but error in here is it is not getting in main or data  
  if (sessionToView) {
    main = sessionToView.students || [];
    sessionId = sessionToView._id;
    sessionNo = sessionToView.sessionNo;
    date = sessionToView.date;
  }
  // console.log("main in here",main)
  // Fetch attendance data when the component loads
  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      // console.log(userId);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/admin/attendance/status/${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        // console.log("UNNECESSARY",data);

        if (response.ok) {
          // Update attendanceStatus with the fetched data
          const status = main.reduce((acc, student) => {
            acc[student._id] = data.attendance[student._id] || null; // Use fetched status or null if not available
            return acc;
          }, {});
          // console.log("STATUS", status);
          setAttendanceStatus(status);
        } else {
          console.error("Failed to fetch attendance:", data.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceStatus();
  }, [sessionId, main]);

  const handleAttendanceMarked = (userId, status) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [userId]: status, // Update the status for the specific student
    }));
    // console.log("checking what is stored in attendance status",attendanceStatus)
  };

  const handleBack = () => {
    navigate("/management/attendance-sessions");
  };

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <div className="admin-attendance-page">
      <div className="content">
        <div className="attendance-head">
          <div className="attendance-head-left">
            <h1>Attendance Management</h1>
            <p>Here you can mark and manage attendance for students.</p>
            <p>{date}</p>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Project Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {main.length === 0 ? (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            ) : (
              main.map((student, index) => (
                <RowComponentForAttendance
                key={student._id}
                srNo={index + 1}
                rollNo={student.rollNo}
                // batch={student.batch}
                name={student.name}
                  projectName={student.projectName}
                  sessionId={sessionId}
                  // projectName={student.projectName}
                  sessionNo={sessionNo}
                  userId={student.userId}
                  date={date}
                  onAttendanceMarked={(status) =>
                    handleAttendanceMarked(student._id, status)
                  }
                  status={main.status}
                />
              ))
            )}
          </tbody>
        </table>

        <div className="attendance-buttons">
          {/* {sessionToView ? ( */}
            {/* <> */}
              <button className="attendance-student-back" onClick={handleBack}>
                Back
              </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAttendance;
