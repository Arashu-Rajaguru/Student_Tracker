// src/modules/Exams.jsx
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

function Exams() {
  const [exams, setExams] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");

  // Load exams from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("exams");
    if (saved) {
      setExams(JSON.parse(saved));
    }
  }, []);

  // Save exams to localStorage
  useEffect(() => {
    localStorage.setItem("exams", JSON.stringify(exams));
  }, [exams]);

  // Ask for notification permission once
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  // Set up reminders: check every minute for exams starting soon
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (!exams.length) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();

      exams.forEach((exam) => {
        if (exam.notified) return;

        const examTime = new Date(exam.dateTime).getTime();
        const diffMinutes = Math.round((examTime - now) / (1000 * 60));

        // Notify 30 minutes before the exam
        if (diffMinutes <= 30 && diffMinutes >= 0) {
          new Notification("Exam Reminder", {
            body: `${exam.subject} at ${exam.time} (${exam.location || "Room not set"})`,
          });

          // Mark as notified so we don't spam
          setExams((prev) =>
            prev.map((e) =>
              e.id === exam.id ? { ...e, notified: true } : e
            )
          );
        }
      });
    }, 60 * 1000); // every minute

    return () => clearInterval(interval);
  }, [exams]);

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!subject.trim() || !date || !time) return;

    const dateTimeString = `${date}T${time}:00`;

    const newExam = {
      id: Date.now(),
      subject: subject.trim(),
      date,
      time,
      location: location.trim(),
      duration: duration.trim(),
      dateTime: dateTimeString,
      notified: false,
    };

    setExams((prev) => [...prev, newExam]);
    setSubject("");
    setDate("");
    setTime("");
    setLocation("");
    setDuration("");
  };

  const handleDeleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="exams-container">
      <BackButton/>
      <h2>🧪 Exams</h2>
      <p>Plan your exam timetable and get reminders before they start.</p>

      <form className="exam-form" onSubmit={handleAddExam}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (e.g. 9:00–12:00)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="submit">Add Exam</button>
      </form>

      {exams.length === 0 ? (
        <p>No exams added yet. Start by adding your first exam.</p>
      ) : (
        <ul className="exam-list">
          {exams.map((exam) => (
            <li key={exam.id} className="exam-item">
              <div>
                <strong>{exam.subject}</strong>
                <div>
                  Date: {exam.date} &nbsp;|&nbsp; Time: {exam.time}
                </div>
                {exam.location && (
                  <div>Location: {exam.location}</div>
                )}
                {exam.duration && (
                  <div>Duration: {exam.duration}</div>
                )}
              </div>
              <button onClick={() => handleDeleteExam(exam.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Exams;
