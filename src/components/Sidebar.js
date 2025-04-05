import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import QuickStart from './Quickstart'; // Import QuickStart Component

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Assignment Tracker</h2>

      {/* Quick Start Button Added Below Assignment Tracker */}
      <QuickStart />

      <ul>
        <li>
          <Link to="/">Home</Link> {/* Navigates to Home.js */}
        </li>
        <li>
          <Link to="/home">Student Dashboard</Link> {/* Navigates to Home.js */}
        </li>
        <li>
          <Link to="/upload">Upload</Link> {/* Navigates to Upload.js */}
        </li>
        <li>
          {/* Open Notes in a New Tab */}
          <a href="/notes" target="_blank" rel="noopener noreferrer">Notes</a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;


