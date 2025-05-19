import React, { useState } from "react";
import "./SetPassword.css";
import { toast, Slide } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSetpass = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Provide email!", {
        position: "top-right",
        theme: "light",
        transition: Slide,
      });
      return;
    }

    // // Example regex for G.N. Khalsa email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gnkhalsa\.edu\.in$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid G.N. Khalsa email!", { autoClose: 1000 });
      return;
    }

    try {
      // const response = await fetch("https://tycs-projects-backend-bnlr.onrender.com/auth/send-email", {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const checkdata = await response.json();

      if (response.ok) {
        toast.success("Email has been sent to your email", {
          autoClose: 4000,
          position: "top-right",
          theme: "light",
          transition: Slide,
        });

        toast.success("OTP to create password will be only working for 5 minute", {
          autoClose: 5000,
          position: "top-right",
          theme: "light",
          transition: Slide,
        });

        navigate("/otp",{state:email});
      } else {
        // console.log("Registration failed", checkdata.errorMessage || checkdata.message);
        toast.error("Unable to send data to server", {
          position: "top-right",
          theme: "light",
          transition: Slide,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Looks like it's not a valid email!", {
        position: "top-right",
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <div className="login-register-container">
      <div className="login-register-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSetpass}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Get OTP <FaEnvelope />
          </button>
        </form>
        <p className="toggle-link">
          Already have a password?{" "}
          <button
            type="button"
            className="link-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SetPassword;
