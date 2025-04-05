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
//   const [emailError, setEmailError] = useState('');

//   const generateVerificationCode = () => {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     return Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
//   };

//   const [verificationCode, setVerificationCode] = useState(generateVerificationCode());
//   const navigate = useNavigate();

//   const validDomains = ['gmail.com', 'gmu.edu', 'thapar.edu', 'yahoo.com', 'outlook.com', 'hotmail.com'];

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//     if (!regex.test(email)) {
//       return false;
//     }
//     const domain = email.split('@')[1];
//     return validDomains.includes(domain);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === 'email') {
//       if (!validateEmail(value)) {
//         setEmailError('Please enter a valid email address from an accepted domain');
//       } else {
//         setEmailError('');
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateEmail(formData.email)) {
//       setEmailError('Please enter a valid email address from an accepted domain');
//       return;
//     }

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
//         {emailError && <span className="error-message">{emailError}</span>}

//         {/* Password Field */}
//         <div className="password-container">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {/* Confirm Password Field */}
//         <div className="password-container">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//           <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
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
  const [emailError, setEmailError] =useState('');
  const [passwordRequirementsVisible, setPasswordRequirementsVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  const navigate = useNavigate();

  const validDomains = ['gmail.com', 'gmu.edu', 'thapar.edu', 'yahoo.com', 'outlook.com', 'hotmail.com'];

  const generateVerificationCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 5 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
  };

  const [verificationCode, setVerificationCode] = useState(generateVerificationCode());

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!regex.test(email)) {
      return false;
    }
    const domain = email.split('@')[1];
    return validDomains.includes(domain);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address from an accepted domain');
      } else {
        setEmailError('');
      }
    }

    if (name === 'password') {
      validatePasswordRequirements(value);
      validatePasswordStrength(value);

      if (!passwordRequirementsVisible) {
        setPasswordRequirementsVisible(true); // Show requirements when typing starts
      }
    }
  };

  // Password Requirements Validation
  const validatePasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialCharacter: /[^A-Za-z0-9]/.test(password),
    });
  };

  // Password Strength Validation
  const validatePasswordStrength = (password) => {
    let strength = '';
    if (password.length >= 8) {
      strength = 'Weak';
      if (
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /\d/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      ) {
        strength = 'Strong';
      } else if (
        /[A-Z]/.test(password) ||
        /[a-z]/.test(password) ||
        /\d/.test(password)
      ) {
        strength = 'Moderate';
      }
    }
    setPasswordStrength(strength);
  };

  // Hide password requirements when user finishes typing
  const handleBlur = () => {
    setTimeout(() => {
      setPasswordRequirementsVisible(false);
    }, 500); // Small delay to allow user to view changes before hiding
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address from an accepted domain');
      return;
    }

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
        {emailError && <span className="error-message">{emailError}</span>}

        {/* Password Field */}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Display Password Requirements */}
        {passwordRequirementsVisible && (
          <div className="password-requirements">
            <p>Password must meet the following requirements:</p>
            <ul>
              <li className={passwordRequirements.length ? 'fulfilled' : ''}>
                At least 8 characters long
              </li>
              <li className={passwordRequirements.uppercase ? 'fulfilled' : ''}>
                At least one uppercase letter
              </li>
              <li className={passwordRequirements.lowercase ? 'fulfilled' : ''}>
                At least one lowercase letter
              </li>
              <li className={passwordRequirements.number ? 'fulfilled' : ''}>
                At least one number
              </li>
              <li className={passwordRequirements.specialCharacter ? 'fulfilled' : ''}>
                At least one special character
              </li>
            </ul>
          </div>
        )}

        {/* Password Strength Feedback */}
        {passwordStrength && (
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Password Strength: {passwordStrength}
          </p>
        )}

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

        {/* Verification Code */}
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

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
