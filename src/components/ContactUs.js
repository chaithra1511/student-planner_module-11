import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') {
      alert('Please enter your message before submitting.');
      return;
    }

    setShowPopup(true); // Show confirmation pop-up
    setTimeout(() => setShowPopup(false), 3000); // Hide pop-up after 3 seconds

    setMessage(''); // Clear text area
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out:</p>
      <ul>
        <li>Email: support@example.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        <li>Address: 1234 React Street, JS City</li>
      </ul>

      {/* Message Box Form */}
      <h3>Submit a Request</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your issue here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="5"
          cols="50"
          required
        />
        <br />
        <button type="submit">Send</button>
      </form>

      {/* Pop-up Confirmation Message */}
      {showPopup && (
        <div className="popup">
          Your message has been sent! Expect a reply within 24 hours.
        </div>
      )}
    </div>
  );
}

export default ContactUs;

