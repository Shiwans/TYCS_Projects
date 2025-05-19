import React, { useState } from "react";
import { toast, Slide } from "react-toastify";

import "./AddStudent.css";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollNo: "",
    year: "",
    department: "",
    batch: "",
    role:"student",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddStudent = async () => {
    // if (
    //   !student.name ||
    //   !student.email ||
    //   !student.rollNo ||
    //   !student.batch ||
    //   !student.department ||
    //   !student.batch
    // ) {
    //   alert("Please fill out all fields!");
    //   return;
    // }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/admin/addstudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
          credentials: "include",
        }
      );
      const data = await response.json(); // Parse response JSON
      // console.log("Server response:", data);

      if (response.ok) {
        setStudent({
          name: "",
          email: "",
          rollNo: "",
          year: "",
          department: "",
          batch: "",
          role:"student",
        });

        toast.success("Student added!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
      } else {
        toast.error(data.message, {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Failed to add student. Please try again!");
      toast.error("Failed to add student. Please try again!", {
        position: "top-right",
        theme: "dark",
        transition: Slide,
        autoClose: 1000,
      });

    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2 className="add-student-title">Add Student or Admin</h2>
        <form>
          {/* Grouped Name, Email, and Roll Number */}
          <div className="add-student-input-row">
            {/* Name */}
            <div className="add-student-input-group">
              <label className="add-student-label">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleInputChange}
                className="add-student-input"
                placeholder="Enter student name"
                required
              />
            </div>

            {/* Email */}
            <div className="add-student-input-group">
              <label className="add-student-label">Email</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleInputChange}
                className="add-student-input"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Roll Number */}
            <div className="add-student-input-group">
              <label className="add-student-label">Roll Number</label>
              <input
                type="text"
                name="rollNo" // Match the key in the student state
                value={student.rollNo} // Access the correct property
                onChange={handleInputChange}
                className="add-student-input"
                placeholder="Enter roll number"
                required
              />
            </div>
          </div>

          {/* Batch */}
          <div className="add-student-input-group">
            <label className="add-student-label">Year</label>
            <select
              name="year"
              value={student.year}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
          <div className="add-student-input-group">
            <label className="add-student-label">Role</label>
            <select
              name="role"
              value={student.role || "student"}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="student">student</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {/* Batch Group */}
          <div className="add-student-input-group">
            <label className="add-student-label">Batch</label>
            <select
              name="batch"
              value={student.batch}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Batch
              </option>
              <option value="Batch0">Batch0</option>
              <option value="Batch1">Batch1</option>
              <option value="Batch2">Batch2</option>
              <option value="Batch3">Batch3</option>
            </select>
          </div>

          {/* Department */}
          <div className="add-student-input-group">
            <label className="add-student-label">Department</label>
            <select
              name="department"
              value={student.department}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>

          {/* Add Student Button */}
          <div className="add-student-btn-container">
            <button
              type="button"
              onClick={handleAddStudent}
              className="add-student-btn"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
