import { useNavigate } from "react-router-dom";

function Planner() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h2>📅 Study Planner</h2>
        <p>Plan your daily study schedule.</p>

        <button onClick={() => navigate("/")}>⬅ Back</button>
      </div>
    </div>
  );
}

export default Planner;
