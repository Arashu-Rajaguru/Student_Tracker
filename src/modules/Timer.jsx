import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2>⏱️ Study Timer</h2>
        <p>Time studied: <b>{seconds}</b> seconds</p>

        <button onClick={() => setSeconds(0)}>Reset</button>
        <br /><br />
        <button onClick={() => navigate("/")}>⬅ Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Timer;