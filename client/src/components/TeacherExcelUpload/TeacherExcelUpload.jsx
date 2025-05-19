import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./TeacherExcelUpload.css";
import excelTemplate from "../../assets/images/example.png"; // Add your image in the public folder or src

const TeacherExcelUpload = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    setError(""); // Reset error message on new upload
    const file = acceptedFiles[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        if (parsedData.length === 0) {
          setError("The uploaded file is empty or has an invalid format.");
          return;
        }

        // Store data in localStorage
        localStorage.setItem("excelData", JSON.stringify(parsedData));
        
        // Navigate to the table view
        navigate("/table");
      } catch (err) {
        setError("Failed to process the file. Please check the format.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: [".xlsx", ".xls"],
  });

  return (
    <div className="teacher-excel-upload-container">
      <h2 className="teacher-excel-upload-title">Upload Excel File</h2>

      <div {...getRootProps()} className="teacher-excel-upload-dropzone">
        <input {...getInputProps()} />
        <div className="dropzone-overlay">
          <p>Drag & Drop or Click to Upload</p>
          <p className="file-info">Accepted file formats: .xlsx, .xls</p>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="excel-template-section">
        <h3>Expected Excel Format:</h3>
        <img src={excelTemplate} alt="Excel Format Example" className="excel-template-image" />
        <p className="template-info">Ensure your Excel file follows this format before uploading.</p>
      </div>
    </div>
  );
};

export default TeacherExcelUpload;
