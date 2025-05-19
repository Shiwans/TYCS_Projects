import "./App.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import SideBar from "./components/Sidebar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SetPassword from "./components/SetPassword/SetPassword";
import MyProjects from "./components/MyProjects/MyProjects";
import AdminAttendance from "./components/AttendanceManagement/AdminAttendance";
import ProjectManagement from "./components/ProjectManagement/ProjectManagement";
import StudentManagement from "./components/StudentManagement/StudentManagement";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import EventDetailsForm from "./components/CreateEventForm/EventDetailsFrom";
import OtpInput from "./components/OtpInput/OtpComponent";
import AddStudent from "./components/AddStudent/AddStudent";
import CreateAttendanceSession from "./components/CreateAttendanceSession/CreateAttendanceSession";
import CreateSessionForm from "./components/CreateSessionForm/CreateSessionForm";
import { useState, useEffect } from "react";
import ExportDataComponent from "./components/ExportDataComponent/ExportDataComponent";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import MassStudentUpload from "./pages/MassStudentUpload";
import ExcelTable from "./components/ExcelTable/ExcelTable";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import DeveloperPage from "./components/DeveloperPage/DeveloperPage";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To manage the login state

  const navigate = useNavigate();
  const fetchUserRole = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/user-role`,
        { credentials: "include" }
      );
      const data = await response.json();

      setUserRole(data.role);
      setIsLoggedIn(data.role === "admin" || data.role === "student");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Run this effect **whenever `isLoggedIn` changes**
  useEffect(() => {
    // console.log("Fetching user role from App.jsx", isLoggedIn);
    fetchUserRole();
  }, [isLoggedIn]);

  // Function to manually refresh login state after login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // console.log("APP.jsx loggedIn Check", isLoggedIn);
  // console.log("APP.jsx userRole check", userRole)

  // useEffect(() => {
  //   console.log("Fetching user role from App.jsx", isLoggedIn);
  //   const fetchUserRole = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACK_URL}/auth/user-role`,
  //         { credentials: "include" }
  //       );
  //       const data = await response.json();
  //       // console.log(data.role);
  //       setUserRole(data.role);
  //       // console.log("HELLOOOOOOOOOOO", userRole);
  //       setIsLoggedIn((prevState) => {
  //         const newLoginState =
  //           data.role === "admin" || data.role === "student";
  //         // console.log("Setting isLoggedIn:", newLoginState);
  //         return newLoginState;
  //       });
  //       // navigate("/");
  //     } catch (error) {
  //       console.error("Error fetching user role:", error);
  //       setIsLoggedIn(false); // Set to false if there is an error fetching role
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserRole();
  // }, []);
  // useEffect(() => {
  //   console.log("Updated userRole:", userRole);
  // }, [userRole]);

  // useEffect(() => {
  //   console.log("Updated isLoggedIn:", isLoggedIn);
  // }, [isLoggedIn]);
  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {isDesktop ? (
        <SideBar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
        >
          <Routes>
            {/* NORMAL USER ROUTES */}
            {isLoggedIn && userRole === "student" ? (
              <>
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/create-project" element={<EventDetailsForm />} />
                <Route
                  path="/profile"
                  element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                />
              </>
            ) : null}

            {/* ADMIN ROUTES (Protected) */}
            {isLoggedIn && userRole === "admin" ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/table" element={<ExcelTable />} />
                <Route
                  path="/management/students"
                  element={<StudentManagement />}
                />
                <Route
                  path="/management/attendance-sessions"
                  element={<CreateAttendanceSession />}
                />
                <Route path="/create-session" element={<CreateSessionForm />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route
                  path="/management/attendance"
                  element={<AdminAttendance />}
                />
                <Route
                  path="/management/projects"
                  element={<ProjectManagement />}
                />
                <Route path="/export-data" element={<ExportDataComponent />} />
                <Route
                  path="/mass-student-upload"
                  element={<MassStudentUpload />}
                />
              </>
            ) : isLoggedIn && userRole === "student" ? (
              <Route path="*" element={<NotFoundPage />} />
            ) : null}

            {/* COMMON ROUTES */}
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/developer-info" element={<DeveloperPage />} />
            <Route path="/about-us" element={<About />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginComponent onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <SetPassword />}
            />
            <Route
              path="/otp"
              element={isLoggedIn ? <Navigate to="/" /> : <OtpInput />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SideBar>
      ) : (
        <>
          <Navbar 
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole} />
          <Routes>
            {/* NORMAL STUDENT ROUTES */}
            {isLoggedIn && userRole === "student" ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/my-projects" element={<MyProjects />} />
                <Route path="/create-project" element={<EventDetailsForm />} />
                <Route
                  path="/profile"
                  element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
                />
              </>
            ) : null}

            {/* ADMIN ROUTES (Protected) */}
            {isLoggedIn && userRole === "admin" ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/table" element={<ExcelTable />} />
                <Route
                  path="/management/students"
                  element={<StudentManagement />}
                />
                <Route
                  path="/management/attendance-sessions"
                  element={<CreateAttendanceSession />}
                />
                <Route
                  path="/management/projects"
                  element={<ProjectManagement />}
                />
                <Route
                  path="/management/attendance"
                  element={<AdminAttendance />}
                />
                <Route path="/create-session" element={<CreateSessionForm />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/export-data" element={<ExportDataComponent />} />
                <Route
                  path="/mass-student-upload"
                  element={<MassStudentUpload />}
                />
              </>
            ) : isLoggedIn && userRole === "student" ? (
              <Route path="*" element={<NotFoundPage />} />
            ) : null}

            {/* COMMON ROUTES */}
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/developer-info" element={<DeveloperPage />} />
            <Route path="/about-us" element={<About />} />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginComponent onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/register"
              element={isLoggedIn ? <Navigate to="/" /> : <SetPassword />}
            />
            <Route
              path="/otp"
              element={isLoggedIn ? <Navigate to="/" /> : <OtpInput />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
