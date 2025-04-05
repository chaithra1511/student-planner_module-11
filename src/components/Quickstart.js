import React, { useState } from "react";
import "./Quickstart.css";

const QuickStart = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Quick Start Button */}
      <button className="quickstart-btn" onClick={() => setOpen(true)}>
        Quick Start
      </button>

      {/* Quick Start Popup */}
      {open && (
        <div className="quickstart-overlay">
          <div className="quickstart-box">
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
            <h2 className="quickstart-title">📌 Quick Start Guide</h2>
            <p className="quickstart-desc">
              Welcome to Student Planner! Stay organized with tasks, deadlines, notes, and resources.
            </p>

            <ul className="quickstart-list">
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Register/Login – Create an account or log in.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Add Courses – Track subjects in a term-wise layout.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Manage Tasks – Add, edit, and delete assignments.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Manage Deadlines – View upcoming tasks and reminders.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Assignment Tracker – Keep track of progress and due dates.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Take Notes – Save and download study notes.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text">Upload assignment files, study notes, or course materials –  preview, edit, or remove them.</span></li>
              <li><span className="checkmark">✅</span><span className="quickstart-text"> Explore Resources – Access study guides and career help.</span></li>
            </ul>

            <p className="quickstart-footer">
              📍 Need help? Visit the <strong>Resources</strong> or <strong>Contact Us</strong> on Home Page.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickStart;





