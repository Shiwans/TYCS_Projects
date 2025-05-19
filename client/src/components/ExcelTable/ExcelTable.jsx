import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../TeacherExcelUpload/TeacherExcelUpload.css";

const ExcelTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const storedData = localStorage.getItem("excelData");

  useEffect(() => {
    if (storedData) {
      setData(JSON.parse(storedData));
      
    // console.log(storedData);
    } else {
      navigate("/"); // Redirect if no data is available
    }
  }, [navigate]);

  const handleContinue = async() => {
    // console.log("Continue button clicked");
    // Perform further actions here, such as saving the data to the database or making API requests
    // const response = await fetch(`${import.meta.env.VITE_BACK_URL}/admin/student-data-upload?student=${storedData}`, { credentials: "include" });


    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/admin/student-data-upload?students=${storedData}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.parse(storedData),
        credentials: "include", // Include cookies if needed
      }
    );
        const data = await response.json();
        // console.log(data);
    // You can define further navigation or actions here
  };

  return (
    <div className="table-container">
      <h2>Excel Data</h2>
      {data.length > 0 ? (
        <>
          <table className="teacher-excel-upload-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-buttons">
            <button className="back-button" onClick={() => navigate("/")}>
              Back
            </button>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </>
      ) : (
        <p>No data available. Please upload an Excel file.</p>
      )}
    </div>
  );
};

export default ExcelTable;
