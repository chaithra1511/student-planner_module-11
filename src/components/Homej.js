import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Homej.css';

function HomePage() {
    const navigate = useNavigate(); // Hook for programmatic navigation

    return (
        <div className="home-page">
            {/* Header Section */}
            <header className="header">
                {/* <div className="logo">
                    <img 
                        src="https://api.deepai.org/job-view-file/c3b05fc8-2a72-4132-b8ed-26463b405b7a/outputs/output.jpg" 
                        alt="Logo" 
                        className="logo-image" 
                    />
                </div> */}
                <h1>Student Planner</h1>
                <nav className="navigation">
                <a href="#" className="registration_container" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
    Contact Us
</a>

                    <button onClick={() => navigate('/resources')}>Student Resources</button>
                    <button className="login-button" onClick={() => navigate('/login')}>Login</button> 
                    <button className="registeration_container"onClick={() => navigate('/register')}>Register</button>
                </nav>
            </header>

            {/* Main Content Section */}
            <section className="main-content">
                <div className="background-image"></div>
                <div className="notes"></div>
            </section>
        </div>
    );
}

export default HomePage;
