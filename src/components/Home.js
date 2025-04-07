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

  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [term, setTerm] = useState('');
  const [editingCourseIndex, setEditingCourseIndex] = useState(null);

  const addAssignment = () => {
    if (taskName && details && subject && dueDate) {
      const isDuplicate = assignments.some(
        (assignment) => assignment.taskName === taskName && assignment.dueDate === dueDate
      );
      if (isDuplicate) {
        alert('This assignment already exists.');
        return;
      }
      setAssignments([...assignments, { taskName, details, subject, dueDate, done: false }]);
      setTaskName('');
      setDetails('');
      setSubject('');
      setDueDate('');
    } else {
      alert('Please fill in all fields before adding a task.');
    }
  };

  const deleteAssignment = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setAssignments(assignments.filter((_, i) => i !== index));
    }
  };

  const markAsDone = (index) => {
    setAssignments(assignments.map((assignment, i) =>
      i === index ? { ...assignment, done: true } : assignment
    ));
  };

  const undoCompleted = (index) => {
    setAssignments(assignments.map((assignment, i) =>
      i === index ? { ...assignment, done: false } : assignment
    ));
  };

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
      const formattedDate = date.toISOString().split('T')[0];
      const taskDates = assignments.map(assignment => assignment.dueDate);
      if (taskDates.includes(formattedDate)) {
        return 'highlight-date';
      }
    }
    return null;
  };

  const addOrEditCourse = () => {
    if (courseName && courseCode && term) {
      if (editingCourseIndex !== null) {
        const updatedCourses = [...courses];
        updatedCourses[editingCourseIndex] = { name: courseName, code: courseCode, term };
        setCourses(updatedCourses);
        setEditingCourseIndex(null);
      } else {
        const isDuplicate = courses.some(
          (course) => course.name === courseName && course.code === courseCode
        );
        if (isDuplicate) {
          alert('This course already exists.');
          return;
        }
        setCourses([...courses, { name: courseName, code: courseCode, term }]);
      }
      setCourseName('');
      setCourseCode('');
      setTerm('');
    } else {
      alert('Please fill in all fields before adding or editing a course.');
    }
  };

  const startEditingCourse = (index) => {
    setEditingCourseIndex(index);
    const courseToEdit = courses[index];
    setCourseName(courseToEdit.name);
    setCourseCode(courseToEdit.code);
    setTerm(courseToEdit.term);
  };

  const deleteCourse = (index) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const getRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const sortedAssignments = [...assignments].sort((a, b) => 
    new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="home">
      <h1 className="section-title">Student Dashboard</h1>

      {/* Task Input Form */}
      <div className="add-task card-wrapper">
        <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <input type="text" placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <button onClick={addAssignment}>Add Task</button>
      </div>

      <div className="card-wrapper">
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
      </div>

      <h2 className="section-title">{editingCourseIndex !== null ? 'Edit Course' : 'Add a Course'}</h2>
      <div className="add-course card-wrapper">
        <input type="text" placeholder="Course Name" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        <input type="text" placeholder="Course Code" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
        <select value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="">Select Term</option>
          <option value="Fall">Fall 2025</option>
          <option value="Spring">Spring 2025</option>
          <option value="Summer">Summer 2025</option>
        </select>
        <button onClick={addOrEditCourse}>
          {editingCourseIndex !== null ? 'Save Changes' : 'Add Course'}
        </button>
        {editingCourseIndex !== null && (
          <button onClick={() => setEditingCourseIndex(null)}>Cancel</button>
        )}
      </div>

      <h2 className="section-title">Current Courses</h2>
      <div className="card-wrapper">
        <table className="courses-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course Code</th>
              <th>Term</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td><span className={`term-label ${course.term.toLowerCase()}`}>{course.term}</span></td>
                <td>
                  <button onClick={() => startEditingCourse(index)}>Edit</button>
                  <button onClick={() => deleteCourse(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard">
        <div className="calendar-section card-wrapper">
          <h2 className="section-title">Calendar</h2>
          <Calendar tileClassName={tileClassName} tileContent={tileContent} />
        </div>

        <div className="deadline-widget card-wrapper">
          <h2 className="section-title">Upcoming Deadlines</h2>
          {sortedAssignments.length > 0 ? (
            <ul>
              {sortedAssignments.map((assignment, index) => (
                <li key={index} className={assignment.done ? 'completed-task' : ''}>
                  <strong>{assignment.taskName}</strong> - {assignment.subject}  
                  <span className={`days-left ${getRemainingDays(assignment.dueDate) <= 2 ? 'urgent' : ''}`}>
                    {getRemainingDays(assignment.dueDate)} days left
                  </span>
                  {assignment.done ? (
                    <button className="undo-button" onClick={() => undoCompleted(index)}>
                      Undo
                    </button>
                  ) : (
                    <button className="done-button" onClick={() => markAsDone(index)}>
                      Done
                    </button>
                  )}
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
