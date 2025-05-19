import React from 'react';
import { FaTh, FaList } from 'react-icons/fa';
import './Filter.css'

export const Filter = ({
  searchTerm, setSearchTerm,
  searchByRollNumber, setSearchByRollNumber,
  year, setYear,
  department, setDepartment,
  // categoryType, setCategoryType,
  projectType, setProjectType,
  batchFilter, setBatchFilter,
  isGridView, toggleGridView
}) => {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const toggleSearchMode = () => {
    setSearchByRollNumber(!searchByRollNumber);
    setSearchTerm('');
  };
  
  return (
    <div className="filter-container">
      <input
        type="text"
        className="filter-input"
        placeholder={searchByRollNumber ? "Search by Roll Number..." : "Search by Name..."}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="toggle-button" onClick={toggleSearchMode}>
        {searchByRollNumber ? "Search by Name" : "Search by Roll"}
      </button>
      <select
        className="filter-dropdown"
        value={year}
        onChange={(e) => {
          // console.log("Year selected:", e.target.value);
          setYear(e.target.value)
        }}
      >
        <option value="">Select Year</option>
        <option value="2024-2025">2024-2025</option>
        <option value="2025-2026">2025-2026</option>
      </select>
      <select
        className="filter-dropdown"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">Select Department</option>
        <option value="CS">CS</option>
        <option value="IT">IT</option>
      </select>
      <select
        className="filter-dropdown"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
      >
        <option value="">Select Project</option>
        <option value="Project One">Project 1</option>
        <option value="Project Two">Project 2</option>
      </select>
      {/* <select
        className="filter-dropdown"
        value={categoryType}
        onChange={(e) => setCategoryType(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Web Developmen">Web Development</option>
        <option value="App Developmen">App Development</option>
        <option value="Game Developmen">Game Development</option>
      </select> */}
      <select
        className="filter-dropdown"
        value={batchFilter}
        onChange={(e) => setBatchFilter(e.target.value)}
      >
        <option value="">Select Batch</option>
        <option value="Batch1">Batch 1</option>
        <option value="Batch2">Batch 2</option>
        <option value="Batch3">Batch 3</option>
      </select>
      <div className="view-toggle-container">
        <button className="view-toggle-button" onClick={toggleGridView}>
          {isGridView ? <FaList /> : <FaTh />}
        </button>
      </div>
    </div>
  );
};

export default Filter;
