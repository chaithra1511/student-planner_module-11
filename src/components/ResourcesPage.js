import React from 'react';
import './ResourcesPage.css'; // Optional CSS for styling

function ResourcesPage() {
  return (
    <div className="resources-container">
      <h2>Student Well-Being & Success Resources</h2>

      <div className="resource-category">
        <h3>🧠 Mental Health & Well-Being</h3>
        <ul>
          <li><a href="https://www.7cups.com/" target="_blank" rel="noreferrer">7 Cups – Free Emotional Support</a></li>
          <li><a href="https://www.jedfoundation.org/" target="_blank" rel="noreferrer">The Jed Foundation – Student Mental Health</a></li>
          <li><a href="https://www.calm.com/" target="_blank" rel="noreferrer">Calm – Meditation & Sleep Aid</a></li>
        </ul>
      </div>

      <div className="resource-category">
        <h3>📚 Academic Success & Study Balance</h3>
        <ul>
          <li><a href="https://www.gutenberg.org/" target="_blank" rel="noreferrer">Project Gutenberg – Free eBooks</a></li>
          <li><a href="https://todoist.com/productivity-methods/pomodoro-technique" target="_blank" rel="noreferrer">Pomodoro Technique – Study Focus</a></li>
        </ul>
      </div>

      <div className="resource-category">
        <h3>💰 Financial Literacy & Budgeting</h3>
        <ul>
          <li><a href="https://mint.intuit.com/" target="_blank" rel="noreferrer">Mint – Personal Budgeting</a></li>
          <li><a href="https://www.fastweb.com/" target="_blank" rel="noreferrer">Fastweb – Scholarship Finder</a></li>
        </ul>
      </div>

      <div className="resource-category">
        <h3>💼 Career & Internship Help</h3>
        <ul>
          <li><a href="https://joinhandshake.com/" target="_blank" rel="noreferrer">Handshake – Find Internships</a></li>
          <li><a href="https://www.canva.com/resumes/templates/" target="_blank" rel="noreferrer">Canva – Resume Templates</a></li>
        </ul>
      </div>
      
    </div>
  );
}

export default ResourcesPage;
