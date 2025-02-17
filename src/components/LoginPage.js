import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Accept any email and password for now
    if (email.trim() && password.trim()) {
      console.log('Login successful!');
      navigate('/home'); // Redirect to home page
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className='login'>
      {/* <Link to='/'>
        <img
          className="login__logo"
          src='https://api.deepai.org/job-view-file/c3b05fc8-2a72-4132-b8ed-26463b405b7a/outputs/output.jpg'
          alt="Student Planner Logo"
        />
      </Link> */}
       

      <div className='login__container'>
        <h1>Sign in to Student Planner</h1>

        <form onSubmit={handleSignIn}>
          <h5>Email</h5>
          <input type='email' value={email} onChange={event => setEmail(event.target.value)} required />

          <h5>Password</h5>
          <input type='password' value={password} onChange={event => setPassword(event.target.value)} required />

          <button type='submit' className='login__signInButton'>Sign In</button>
        </form>

        <p>
          By signing in, you agree to the Student Planner Terms of Use and Privacy Policy.
        </p>
        
        <Link to="/register">
          <button className="login__registerButton">Create a Student Planner Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
