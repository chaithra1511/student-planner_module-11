// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Homej from './components/Homej';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Upload from './components/Upload';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';
import RegistrationPage from './components/RegistrationPage';
import ContactUs from './components/ContactUs';
import ResourcesPage from './components/ResourcesPage';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <Router>
      <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

function MainLayout({ darkMode, setDarkMode }) {
  const location = useLocation();

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      {!["/login", "/register", "/contact", "/resources", "/"].includes(location.pathname) && (
        <>
          <Sidebar />
          {/* 🔘 Dark Mode Toggle */}
          <div className="dark-toggle">
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              Dark Mode
            </label>
          </div>
        </>
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={<Homej />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;



