import React, { useState, useEffect } from "react";
import "./CreateAttendanceSession.css";
import EventDetailsForm from "../CreateEventForm/EventDetailsFrom";
import { toast, Slide } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const CreateAttendanceSession = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
            `${import.meta.env.VITE_BACK_URL}/admin/fetchsession`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", 
          }
        );
        const data = await response.json();
        // console.log('data from createattendancesession',data.session)
        if (response.ok) {
          setSessions(data.session || []);
        }
      } catch (error) {
        console.error("Failed to fetch Sessions:", error);
        toast.error("Failed to fetch Sessions. Please try again!", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    };

    fetchSession();
  }, []);

  const handleView = async (sessionId) => {
    const sessionToView = sessions.find((session) => session._id === sessionId);
    if (sessionToView) {
      // console.log("handle view",sessionToView)
      navigate("/management/attendance", {
        state: { data: null, sessionToView },
      });
    }
  };

  const handleDelete = async (sessionId) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session._id !== sessionId)
    );
    await fetch(`${import.meta.env.VITE_BACK_URL}/admin/deletesession`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }), // Properly formatted body
      credentials: "include",
    });

    toast.success("Session deleted!", { autoClose: 1000 });
    // console.log("Response", response);
  };

  return (
    <div className="create-attendance-session-container">
      <h2 className="create-attendance-session-header">
        My Attendance Sessions
      </h2>

      {/* Always display the "Create Attendance Session" button */}
      <div className="create-attendance-session-card">
        <NavLink to="/create-session" className="add-session-btn">
          +
        </NavLink>
        <p className="create-session-text">Create an Attendance Session</p>
      </div>
      <>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div className="attendance-session-card" key={session._id}>
              <div className="create-attendance-session-header">
                <h3 className="create-attendance-session-title">
                  {session.sessionNo}
                </h3>
              </div>
              <div className="session-card-body">
                <p>
                  <strong>Department:</strong> {session.department}
                </p>
                <p>
                  <strong>Year:</strong> {session.year}
                </p>
                <p>
                  <strong>Project Number:</strong> {session.project}
                </p>
                <p>
                  <strong>Batch:</strong> {session.batch}
                </p>
              </div>
              <div className="session-card-footer">
                <button
                  className="create-attendance-session-view-button"
                  onClick={() => handleView(session._id)}
                >
                  View
                </button>

                <button
                  className="create-attendance-session-delete-button"
                  onClick={() => handleDelete(session._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sessions available.</p>
        )}
      </>
    </div>
  );
};

export default CreateAttendanceSession;