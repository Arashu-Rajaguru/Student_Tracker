import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function Streak() {
  const [streak, setStreak] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="page">
      <BackButton/>
      <div className="card">
        <h2>🔥 Study Streak</h2>
        <p>Current Streak: <b>{streak}</b> days</p>

        <button onClick={() => setStreak(streak + 1)}>
          Mark Today as Studied
        </button>

        <br /><br />
        <button onClick={() => navigate("/")}>⬅ Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Streak;