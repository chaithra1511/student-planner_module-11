
import React, { useState, useEffect } from 'react';

const Notes = () => {
    const [note, setNote] = useState('');
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null); // State to store the last saved timestamp
    const [isTyping, setIsTyping] = useState(false); // State to track if the user is typing

    useEffect(() => {
        if (isTyping) {
            setSaving(true);
            const timer = setTimeout(() => {
                setSaving(false);
                setLastSaved(new Date()); // Update the last saved timestamp
                setIsTyping(false); // Reset typing state after save
            }, 1000); // Simulates autosaving delay
            return () => clearTimeout(timer);
        }
    }, [note, isTyping]);

    const handleNoteChange = (e) => {
        setNote(e.target.value);
        setIsTyping(true); // Set typing state when user modifies the note
    };

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
                onChange={handleNoteChange}
                rows="10"
                cols="50"
            />
            <br />
            {saving && <p style={{ color: 'green' }}>Autosaving...</p>}
            {!saving && lastSaved && (
                <p style={{ color: 'blue' }}>
                    Last saved at: {lastSaved.toLocaleTimeString()}
                </p>
            )}
            <button onClick={saveNoteToFile}>Save Notes</button>
        </div>
    );
};

export default Notes;
