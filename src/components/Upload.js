import React, { useState } from 'react';
import './Upload.css';

function Upload() {
  const [files, setFiles] = useState([]);
  const [semester, setSemester] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = () => {
    if (!semester) {
      alert('Please select a semester.');
      return;
    }

    if (files.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    setUploadedFiles((prev) => ({
      ...prev,
      [semester]: [...(prev[semester] || []), ...files],
    }));

    setFiles([]);
    setSemester('');
    alert('Files uploaded successfully!');
  };

  return (
    <div className="upload-page">
      <h1>Upload Files</h1>

      {/* Semester Selection */}
      <div className="form-group">
        <label htmlFor="semester">Select Semester:</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Fall 2025">Fall 2025</option>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Summer 2025">Summer 2025</option>
        </select>
      </div>

      {/* File Input */}
      <div className="form-group">
        <label htmlFor="file-upload">Select Files:</label>
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Button */}
      <button className="btn-primary" onClick={handleUpload}>
        Upload Files
      </button>

      {/* Display Uploaded Files */}
      {Object.keys(uploadedFiles).length > 0 && (
        <div className="uploaded-files">
          <h2>Uploaded Files</h2>
          {Object.entries(uploadedFiles).map(([sem, files]) => (
            <div key={sem}>
              <h3>{sem}</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Upload;
