import React, { useState } from 'react';

const Notes = () => {
    const [note, setNote] = useState('');

    const saveNoteToFile = () => {
        const blob = new Blob([note], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'student_notes.txt';
        link.click();
    };

    return (
        <div className="notes-container">
            <h1>Notes</h1>
            <textarea 
                placeholder="Write your notes here..." 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={saveNoteToFile}>Save Notes</button>
        </div>
    );
};

export default Notes;  // 

