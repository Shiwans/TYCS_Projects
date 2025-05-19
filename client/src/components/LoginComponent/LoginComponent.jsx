import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";

const LoginComponent = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Both email and password are required!");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Login failed. Please try again.";
  
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.error("Failed to parse error JSON:", jsonError);
        }
  
        setErrorMessage(errorMessage);
        return;
      }
      
      // Assuming the server sets a secure, HTTP-only cookie for authentication
      toast.success("Login successful!", {
        position: "top-right",
        theme: "light",
        transition: Slide,
        autoClose: 1000,
      });

      if (response.ok) {
        // console.log("Navigating now...");
        onLoginSuccess();
        navigate("/");
      }
      

    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please check your network connection.");
    }
    // navigate("/");
    // window.location.reload();
  };

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="toggle-link">
          Don't have a password?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="toggle-button"
          >
            Reset password
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
