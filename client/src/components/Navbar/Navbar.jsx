import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css"; // Ensure you have this CSS file for styling
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
import SidebarMenuAndroid from "../Sidebar/SidebarMenuAndroid";

const Navbar = ({isLoggedIn, userRole, setIsLoggedIn, setUserRole}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu visibility
  
  const [isOpen, setIsOpen] = useState(true); // For desktop sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile menu state

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the mobile menu
    setIsMobileOpen(!isMobileOpen);  // Also toggle the isMobileOpen state
  };
  
  const [theme, setTheme] = useState("dark"); // Theme state

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
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
          setIsLoggedIn(false);
          setUserRole(null);
        } else {
          console.warn("Logout failed:", await response.text());
        }
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    };


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

  const getVisibleRoutes = () => {
    return routes.filter((route) => {
      if (route.roles.includes("all")) return true;
      if (isLoggedIn && route.roles.includes("loggedIn")) {
        return route.roles.includes(userRole);
      }
      return false;
    });
  };
  // console.log("MOBILE:", userRole);
  const visibleRoutes = getVisibleRoutes();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <h1>Project Library</h1>
          <button onClick={toggleTheme} className="theme-toggle-btn">
                            {theme === "light" ? <FaMoon /> : <FaSun />}
                          </button>
        </div>
      </div>

      {/* Hamburger icon for mobile view */}
      <div className="navbar-right">
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      {/* Navbar links */}
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <section className="navbar-link">
          {visibleRoutes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenuAndroid
                  key={index}
                  route={route}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  showAnimation={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  handleMenuToggle={handleMenuToggle}
                />
              );
            }
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active"
                onClick={() => {
                  if (isMobileOpen) handleMenuToggle(); // Close menu on mobile click
                }}
              >
                <div className="icon">{route.icon}</div>
                {isOpen && <div className="link_text">{route.name}</div>}
              </NavLink>
            );
          })}
        </section>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="navbar-link" onClick={handleMenuToggle}>
              Profile
            </Link>
            <Link to="/login" className="navbar-link" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link" onClick={handleMenuToggle}>
              Login
            </Link>
            <Link to="/register" className="navbar-link" onClick={handleMenuToggle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
