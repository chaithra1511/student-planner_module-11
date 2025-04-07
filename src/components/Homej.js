import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homej.css';

function HomePage() {
    const navigate = useNavigate();

    const images = [
        'https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/267582/pexels-photo-267582.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically change images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    // Go to the previous image
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Go to the next image
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="home-page">
            <header className="header">
                <h1>Student Planner</h1>
                <nav className="navigation">
                    <a href="#" className="contact-us-button" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>
                        Contact Us
                    </a>
                    <button onClick={() => navigate('/resources')}>Student Resources</button>
                    <button className="login-button" onClick={() => navigate('/login')}>Login</button>
                    <button className="registeration-container" onClick={() => navigate('/register')}>Register</button>
                </nav>
            </header>

            {/* Image Carousel Section */}
            <section className="main-content">
                <div className="image-carousel">
                    <button className="arrow left" onClick={handlePrev}>&lt;</button>
                    <div
                        className="carousel-images"
                        style={{
                            backgroundImage: `url(${images[currentIndex]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '400px', // Adjust height as needed
                            width: '100%',
                            transition: 'background-image 1s ease-in-out'
                        }}
                    ></div>
                    <button className="arrow right" onClick={handleNext}>&gt;</button>
                </div>
            </section>
            

            {/* About Us Section */}
            <section className="about-us">
                <h2>ABOUT US</h2>
                <p>
                    Welcome to Student Planner! We are dedicated to empowering students with tools and resources to organize their academic journey effectively. 
                    Our mission is to simplify planning and enhance productivity for learners worldwide.
                </p>
            </section>

            {/* Gallery Section */}
            <section className="gallery">
                <h2>GALLERY</h2>
                <div className="gallery-grid">
                    {images.map((image, index) => (
                        <div key={index} className="gallery-item" style={{ backgroundImage: `url(${image})` }}>
                            {/* Optionally add captions or hover effects */}
                            
                        </div>
                    ))}
                </div>
            </section>
            {/* Features Section */}
            <section className="features">
    <h2>FEATURES</h2>
    <div className="features-grid">
       
        <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h3>Add Courses</h3>
            <p>Track subjects in a term-wise layout to stay organized.</p>
        </div>
        <div className="feature-item">
            <div className="feature-icon">📝</div>
            <h3>Manage Tasks</h3>
            <p>Add, edit, and delete assignments and tasks with ease.</p>
        </div>
        <div className="feature-item">
            <div className="feature-icon">⏰</div>
            <h3>Manage Deadlines</h3>
            <p>View upcoming tasks and reminders to stay on top of your schedule.</p>
        </div>
        <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h3>Assignment Tracker</h3>
            <p>Keep track of progress and due dates for all your assignments.</p>
        </div>
        <div className="feature-item">
            <div className="feature-icon">🖋️</div>
            <h3>Take Notes</h3>
            <p>Save and download study notes for easy access anytime.</p>
        </div>
        <div className="feature-item">
            <div className="feature-icon">📂</div>
            <h3>Upload Files</h3>
            <p>Upload assignment files, study notes, or course materials for preview or editing.</p>
        </div>
      
    </div>
</section>


            {/* Contact Us Section
            <section className="contact-us">
                <h2>CONTACT US</h2>
                <form className="contact-form">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="Your Email" required />
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section> */}
        </div>
    );
}

export default HomePage;
