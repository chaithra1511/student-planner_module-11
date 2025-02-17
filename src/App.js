import React from 'react';
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
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation(); // Get the current route

  return (
    <div className="App">
      {/* Sidebar should be hidden only on these pages */}
      {!["/login", "/register", "/contact", "/resources", "/"].includes(location.pathname) && <Sidebar />}

      
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


