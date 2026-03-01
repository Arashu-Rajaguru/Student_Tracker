// src/modules/Assignments.jsx
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";


function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("assignments");
    if (saved) {
      setAssignments(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim() || !dueDate) return;

    const newAssignment = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
    };

    setAssignments((prev) => [...prev, newAssignment]);
    setTitle("");
    setSubject("");
    setDueDate("");
  };

  const handleDelete = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="assignments-container">
      <BackButton/>
      <h2>📘 Assignments</h2>
      <p>View, add, and manage your assignment deadlines.</p>

      <form className="assignment-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Assignment title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Assignment</button>
      </form>

      {assignments.length === 0 ? (
        <p>No assignments yet. Add your first one!</p>
      ) : (
        <ul className="assignment-list">
          {assignments.map((a) => (
            <li key={a.id} className="assignment-item">
              <div>
                <strong>{a.title}</strong> – {a.subject}
                <div>Due: {a.dueDate}</div>
              </div>
              <button onClick={() => handleDelete(a.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}

export default Assignments;
