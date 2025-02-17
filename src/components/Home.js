// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import './Home.css';

// function Home() {
//   const [assignments, setAssignments] = useState([]);
//   const [taskName, setTaskName] = useState('');
//   const [details, setDetails] = useState('');
//   const [subject, setSubject] = useState('');
//   const [dueDate, setDueDate] = useState('');

//   const [courses, setCourses] = useState([
//     { name: 'Beginning Japanese II', code: 'JP-102-51', term: 'Spring 2021' }
//   ]);
//   const [courseName, setCourseName] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [term, setTerm] = useState('');

//   // Add a new task
//   const addAssignment = () => {
//     if (taskName && details && subject && dueDate) {
//       setAssignments([...assignments, { taskName, details, subject, dueDate }]);
//       setTaskName('');
//       setDetails('');
//       setSubject('');
//       setDueDate('');
//     } else {
//       alert('Please fill in all fields before adding a task.');
//     }
//   };

//   // Delete a task
//   const deleteAssignment = (index) => {
//     setAssignments(assignments.filter((_, i) => i !== index));
//   };

//   // Highlight dates with tasks on the calendar
//   const tileClassName = ({ date, view }) => {
//     if (view === 'month') {
//       const taskDates = assignments.map(assignment => new Date(assignment.dueDate).toDateString());
//       if (taskDates.includes(date.toDateString())) {
//         return 'highlight';
//       }
//     }
//     return null;
//   };

//   // Add a new course
//   const addCourse = () => {
//     if (courseName && courseCode && term) {
//       setCourses([...courses, { name: courseName, code: courseCode, term }]);
//       setCourseName('');
//       setCourseCode('');
//       setTerm('');
//     } else {
//       alert('Please fill in all fields before adding a course.');
//     }
//   };

//   return (
//     <div className="home">
//       <h1>Home</h1>
//       <p>This is your Home Page! Here, you can see all your assignments as well as a preview of your calendar.</p>

//       {/* Add Task Form */}
//       <div className="add-task">
//         <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
//         <input type="text" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
//         <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
//         <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
//         <button onClick={addAssignment}>Add Task</button>
//       </div>

//       {/* Assignment Table */}
//       <table className="assignment-table">
//         <thead>
//           <tr>
//             <th>Task</th>
//             <th>Details</th>
//             <th>Course</th>
//             <th>Due Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {assignments.map((assignment, index) => (
//             <tr key={index}>
//               <td>{assignment.taskName}</td>
//               <td>{assignment.details}</td>
//               <td>{assignment.subject}</td>
//               <td>{assignment.dueDate}</td>
//               <td>
//                 <button onClick={() => deleteAssignment(index)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Add Course Form */}
//       <h2>Add a Course</h2>
//       <div className="add-course">
//         <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
//         <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
//         <input type="text" placeholder="Term" value={term} onChange={(e) => setTerm(e.target.value)} />
//         <button onClick={addCourse}>Add Course</button>
//       </div>

//       {/* Current Courses Section */}
//       <h2>Current Courses</h2>
//       <table className="courses-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Course Code</th>
//             <th>Term</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map((course, index) => (
//             <tr key={index}>
//               <td>{course.name}</td>
//               <td>{course.code}</td>
//               <td>{course.term}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Calendar Section */}
//       <h2>Calendar</h2>
//       <Calendar tileClassName={tileClassName} />
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';

function Home() {
  const [assignments, setAssignments] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [details, setDetails] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [courses, setCourses] = useState([
    
  ]);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [term, setTerm] = useState('');

  // Add a new task
  const addAssignment = () => {
    if (taskName && details && subject && dueDate) {
      setAssignments([...assignments, { taskName, details, subject, dueDate, done: false }]);
      setTaskName('');
      setDetails('');
      setSubject('');
      setDueDate('');
    } else {
      alert('Please fill in all fields before adding a task.');
    }
  };

  // Delete a task
  const deleteAssignment = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  // Mark a task as done
  const markAsDone = (index) => {
    setAssignments(assignments.map((assignment, i) =>
      i === index ? { ...assignment, done: true } : assignment
    ));
  };

  // Highlight dates with tasks on the calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const tasksOnDate = assignments.filter(assignment => assignment.dueDate === formattedDate);
  
      return tasksOnDate.length > 0 ? (
        <div className="calendar-tasks">
          {tasksOnDate.map((task, index) => (
            <div key={index} className="calendar-task">{task.taskName}</div>
          ))}
        </div>
      ) : null;
    }
    return null;
  };
  
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD
      const taskDates = assignments.map(assignment => assignment.dueDate);
      
      if (taskDates.includes(formattedDate)) {
        return 'highlight-date'; // Add a highlight class
      }
    }
    return null;
  };
  

  // Add a new course
  const addCourse = () => {
    if (courseName && courseCode && term) {
      setCourses([...courses, { name: courseName, code: courseCode, term }]);
      setCourseName('');
      setCourseCode('');
      setTerm('');
    } else {
      alert('Please fill in all fields before adding a course.');
    }
  };

  // Calculate remaining days until the due date
  const getRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Sort assignments by closest deadline
  const sortedAssignments = [...assignments].sort((a, b) => 
    new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="home">
      <h1>Home</h1>
      <p>This is your Home Page! Here, you can see all your assignments as well as a preview of your calendar.</p>

      {/* Task Input Form */}
      <div className="add-task">
        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={addAssignment}>Add Task</button>
      </div>

      {/* Assignment Table */}
      <table className="assignment-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Details</th>
            <th>Course</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.taskName}</td>
              <td>{assignment.details}</td>
              <td>{assignment.subject}</td>
              <td>{assignment.dueDate}</td>
              <td>
                <button onClick={() => deleteAssignment(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Course Management */}
      <h2>Add a Course</h2>
      <div className="add-course">
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        <input type="text" placeholder="Term" value={term} onChange={(e) => setTerm(e.target.value)} />
        <button onClick={addCourse}>Add Course</button>
      </div>

      {/* Current Courses */}
      <h2>Current Courses</h2>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course Code</th>
            <th>Term</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.name}</td>
              <td>{course.code}</td>
              <td>{course.term}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="dashboard">
        {/* Calendar Section */}
        <div className="calendar-section">
          <h2>Calendar</h2>
          <Calendar tileClassName={tileClassName} tileContent={tileContent} />

        </div>

        {/* Dynamic Deadline Countdown */}
        <div className="deadline-widget">
          <h2>Upcoming Deadlines</h2>
          {sortedAssignments.length > 0 ? (
            <ul>
              {sortedAssignments.map((assignment, index) => (
                <li key={index} className={assignment.done ? 'completed-task' : ''}>
                  <strong>{assignment.taskName}</strong> - {assignment.subject}  
                  <span className={`days-left ${getRemainingDays(assignment.dueDate) <= 2 ? 'urgent' : ''}`}>
                    {getRemainingDays(assignment.dueDate)} days left
                  </span>
                  <button 
                    className="done-button" 
                    onClick={() => markAsDone(index)} 
                    disabled={assignment.done}
                  >
                    {assignment.done ? 'Completed' : 'Done'}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming deadlines.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
