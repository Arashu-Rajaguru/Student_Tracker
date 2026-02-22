import { useNavigate } from "react-router-dom";

function Exams() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h2>📝 Exams</h2>
        <p>Track upcoming exams.</p>

        <button onClick={() => navigate("/")}>⬅ Back</button>
      </div>
    </div>
  );
}

export default Exams;
