import { NavLink, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import SidebarMenu from "./SidebarMenu";

const SideBar = ({ children,  isLoggedIn, userRole, setIsLoggedIn, setUserRole}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [theme, setTheme] = useState("dark"); // Theme state

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  // Apply default theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Routes Configuration
  const routes = [
    { path: "/", name: "Home", icon: <FaHome />, roles: ["all"] },
    {
      path: "/my-projects",
      name: "My Projects",
      icon: <FaFolderOpen />,
      roles: ["student", "loggedIn"],
    },
    {
      path: "/about-us",
      name: "About Us",
      icon: <FaFileAlt />,
      roles: ["all"],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
      roles: ["admin", "loggedIn"],
    },
    {
      path: "/mass-student-upload",
      name: "Mass Student Upload",
      icon: <FaHome />,
      roles: ["admin", "loggedIn"],
    },
    {
      path: "/management/attendance-sessions",
      name: "Attendance Sessions",
      icon: <FaLock />,
      roles: ["admin", "loggedIn"],
    },
    {
      path: "/file-manager",
      name: "Management",
      icon: <FaFolderOpen />,
      roles: ["admin", "loggedIn"],
      subRoutes: [
        { path: "/management/students", name: "Student", icon: <FaUser /> },
        {
          path: "/management/projects",
          name: "Project",
          icon: <FaMoneyBill />,
        },
      ],
    },
  ];


  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        // window.location.reload();
        setIsLoggedIn(false);
        setUserRole(null);
      } else {
        console.warn("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  // Filter Routes Based on Role and Login Status
  const getVisibleRoutes = () => {
    return routes.filter((route) => {
      if (route.roles.includes("all")) return true;
      if (isLoggedIn && route.roles.includes("loggedIn")) {
        return route.roles.includes(userRole);
      }
      return false;
    });
  };

  // console.log("DESKTOP:", userRole);
  const visibleRoutes = getVisibleRoutes();

  return (
    <div className="main-container">
      <div className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="top-area">
          <div className="top_section">
            {isOpen && (
              <div className="header-content">
                <h1 className="logo">Project Library</h1>
                <button onClick={toggleTheme} className="theme-toggle-btn">
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </div>
            )}
          </div>

          <section className="routes">
            {visibleRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    route={route}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => isMobileOpen && toggleMobileMenu()}
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <div className="link_text">{route.name}</div>}
                </NavLink>
              );
            })}
          </section>
        </div>
        <div className="bottom_section">
  {isLoggedIn ? (
    <>
      {userRole !== "admin" && (
        <NavLink to="/profile" className="link" activeClassName="active">
          <div className="icon">
            <FaUser />
          </div>
          {isOpen && <div className="link_text">Profile</div>}
        </NavLink>
      )}
      <NavLink
        to="/login"
        className="link"
        onClick={handleLogout}
        activeClassName="active"
      >
        <div className="icon">
          <FaLock />
        </div>
        {isOpen && <div className="link_text">Logout</div>}
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/login" className="link" activeClassName="active">
        <div className="icon">
          <FaLock />
        </div>
        {isOpen && <div className="link_text">Login</div>}
      </NavLink>
      <NavLink to="/register" className="link" activeClassName="active">
        <div className="icon">
          <FaUser />
        </div>
        {isOpen && <div className="link_text">Reset Password</div>}
      </NavLink>
    </>
  )}
</div>

      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
