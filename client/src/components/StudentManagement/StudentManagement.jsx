// src/pages/AdminAttendance.jsx
import React from "react";
import { useState, useEffect } from "react";
import "./StudentManagement.css";
import { RowComponentForStudent } from "../RowComponent/RowComponent";
import { toast, Slide } from "react-toastify";

const StudentManagement = () => {
  const [allstudents, setallstudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    year: "",
    projectNumber: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredStudents = allstudents.filter((stud) => {
    return (
      (!filters.department || stud.department === filters.department) &&
      (!filters.batch || stud.batch === filters.batch) &&
      (!filters.year || stud.year === filters.year) &&
      (!filters.projectNumber || stud.projectNumber === filters.projectNumber) &&
      (!filters.category || stud.category === filters.category)
    );
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/admin/getstudent`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed
        });

        const data = await response.json();
        console.log('frontend',data)
        if (response.ok) {
          setallstudents(data.data || []); // Assuming `data` contains `data` field with students array
          toast.success("Data fetched!", {
            position: "top-right",
            theme: "light",
            transition: Slide,
            autoClose: 1000,
          });
        } else {
          console.error("Server error:", data.message);
          toast.error("Student data is not fetched!", {
            position: "top-right",
            theme: "dark",
            transition: Slide,
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to fetch students. Please try again!", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Student Management</h1>
        <p>Here you can mark and manage attendance for students.</p>

        {/* Filter Section */}
        <div className="filter-section">
          <label>
            Department:
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
            </select>
          </label>

          <label>
            Batch:
            <select
              name="batch"
              value={filters.batch}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Batch1">Batch 1</option>
              <option value="Batch2">Batch 2</option>
              <option value="Batch3">Batch 3</option>
            </select>
          </label>

          <label>
            Year:
            <select
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </label>
        </div>

        {/* Student Table */}
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>No Of Days Present</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {/* {allstudents.map((student, index) => (
              <RowComponentForStudent
                key={student.rollNo}
                srNo={index + 1}
                rollNo={student.rollNo}
                name={student.email}
                noOfDaysPresent={student.noOfDayPresent || "N/A"}
                department={student.department}
              />
            ))} */}
            {filteredStudents.map((student, index) => (
              <RowComponentForStudent
                key={student.rollNo}
                srNo={index + 1}
                rollNo={student.rollNo}
                name={student.email}
                noOfDaysPresent={student.noOfDaysPresent}
                department={student.department}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
