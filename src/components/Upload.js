import React, { useState } from 'react';
import './Upload.css';

function Upload() {
  const [files, setFiles] = useState([]);
  const [semester, setSemester] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingSemester, setEditingSemester] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({}); // Track progress for each file

  // Accepted file types and size limit
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    // Validate files
    const validFiles = newFiles.filter((file) => {
      if (!file || typeof file.name === 'undefined') {
        alert('Invalid file selected.');
        return false;
      }
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        alert(`${file.name} is not an accepted file type. Only PNG, JPEG, and PDF files are allowed.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} exceeds the size limit of 5 MB.`);
        return false;
      }
      return true;
    });

    if (editingIndex !== null) {
      // Handle editing: Replace only if a valid file is selected
      if (validFiles.length > 0) {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles[editingIndex] = validFiles[0];
          return updatedFiles;
        });
      } 
      setEditingIndex(null);
    } else if (editingSemester !== null) {
      // Handle editing for uploaded files
      if (validFiles.length > 0) {
        setUploadedFiles((prev) => {
          const updatedFiles = { ...prev };
          updatedFiles[editingSemester][editingIndex] = validFiles[0];
          return updatedFiles;
        });
      } 
      setEditingSemester(null);
      setEditingIndex(null);
    } else {
      // Add new valid files to the state
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }

    event.target.value = ""; // Reset file input
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

    // Simulate upload progress for each file
    files.forEach((file) => {
      let progress = 0;

      const intervalId = setInterval(() => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));

        if (progress >= 100) {
          clearInterval(intervalId);

          // Add file to uploaded files once upload is complete
          setUploadedFiles((prev) => ({
            ...prev,
            [semester]: [...(prev[semester] || []), file],
          }));

          // Clear progress for the uploaded file
          setUploadProgress((prevProgress) => {
            const updatedProgress = { ...prevProgress };
            delete updatedProgress[file.name];
            return updatedProgress;
          });
        }

        progress += 10; // Increment progress by 10%
      }, 150); // Simulate upload every 200ms
    });

    setTimeout(() => {
      setFiles([]);
      setSemester('');
      alert('All files uploaded successfully!');
    }, files.length * 2000); // Wait for all files to "upload"
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeUploadedFile = (sem, index) => {
    setUploadedFiles((prev) => {
      const updatedFiles = { ...prev };
      updatedFiles[sem].splice(index, 1);
      if (updatedFiles[sem].length === 0) {
        delete updatedFiles[sem];
      }
      return updatedFiles;
    });
  };

  const handlePreview = (file) => {
    if (!file || typeof file.name === 'undefined') {
      alert('Invalid file selected for preview.');
      return;
    }
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    document.getElementById('file-upload').click();
  };

  const handleEditUploaded = (sem, index) => {
    setEditingSemester(sem);
    setEditingIndex(index);
    document.getElementById('file-upload').click();
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
        <label htmlFor="file-upload">
          Select Files (Accepted: PNG, JPEG, PDF | Max Size: 5MB):
        </label>
        <input type="file" id="file-upload" multiple onChange={handleFileChange} />
        <p className="file-info">
          Accepted file types: PNG, JPEG, PDF. Max size: 5MB.
        </p>
      </div>

      {/* Show Selected Files Before Upload */}
      {files.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                {uploadProgress[file.name] ? (
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    >
                      {uploadProgress[file.name]}%
                    </div>
                  </div>
                ) : (
                  <>
                    <button className="preview-btn" onClick={() => handlePreview(file)}>Preview</button>
                    <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="remove-btn" onClick={() => removeFile(index)}>Remove</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <div className="upload-container">
        <button className="btn-primary" onClick={handleUpload}>Upload Files</button>

        {/* Tooltip */}
        <div 
          className="info-icon" 
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ℹ️
          {showTooltip && (
            <div className="tooltip">
              This page allows you to upload assignment files, study notes, or course-related materials for organized access. 
              Start by selecting the semester, then choose the files you wish to store.
            </div>
          )}
        </div>
      </div>

      {/* Display Uploaded Files */}
      {Object.keys(uploadedFiles).length > 0 && (
        <div className="uploaded-files">
          <h2>Uploaded Files</h2>
          {Object.entries(uploadedFiles).map(([sem, files]) => (
            <div key={sem}>
              <h3>{sem}</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <button className="preview-btn" onClick={() => handlePreview(file)}>Preview</button>
                    <button className="edit-btn" onClick={() => handleEditUploaded(sem, index)}>Edit</button>
                    <button className="remove-btn" onClick={() => removeUploadedFile(sem, index)}>Remove</button>
                  </li>
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
