import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <nav className='header'>
            <Link to="/">
                <h2 className="header_logo">STUDENT PLANNER</h2>
            </Link>
            <div className='header_nav'>
                <Link to="/contact" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Contact</span>
                    </div>
                </Link>
                <Link to="/resources" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Resources</span>
                    </div>
                </Link>
                <Link to="/profile" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Login</span>
                    </div>
                </Link>
                <Link to="/register" className='header_link'>
                    <div className='header_option'>
                        <span className='header_optionLineOne'>Register</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Header;
