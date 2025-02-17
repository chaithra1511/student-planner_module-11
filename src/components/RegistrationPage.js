// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import './RegistrationPage.css';

// function RegistrationPage() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     verificationText: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
//   const generateVerificationCode = () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     return Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
//   };

//   const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     if (formData.verificationText.toUpperCase() !== verificationCode) {
//       alert('Verification failed! Please enter the correct code.');
//       setVerificationCode(generateVerificationCode());
//       return;
//     }

//     console.log('User registered:', formData);
//     navigate('/home');
//   };

//   return (
//     <div className="registration-container">
//       <h2>Create an Account</h2>
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           name="name" 
//           placeholder="Full Name" 
//           value={formData.name} 
//           onChange={handleChange} 
//           required 
//         />
        
//         <input 
//           type="email" 
//           name="email" 
//           placeholder="Email Address" 
//           value={formData.email} 
//           onChange={handleChange} 
//           required 
//         />

//         <div className="password-container">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <div className="password-container">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <div className="captcha-container">
//           <label>Enter this code: <strong>{verificationCode}</strong></label>
//           <input
//             type="text"
//             name="verificationText"
//             placeholder="Enter code"
//             value={formData.verificationText}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default RegistrationPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './RegistrationPage.css';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationText: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateVerificationCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
  };

  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.verificationText.toUpperCase() !== verificationCode) {
      alert('Verification failed! Please enter the correct code.');
      setVerificationCode(generateVerificationCode());
      return;
    }

    console.log('User registered:', formData);
    navigate('/home');
  };

  return (
    <div className="registration-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        {/* Password Field */}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="captcha-container">
          <label>Enter this code: <strong>{verificationCode}</strong></label>
          <input
            type="text"
            name="verificationText"
            placeholder="Enter code"
            value={formData.verificationText}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
