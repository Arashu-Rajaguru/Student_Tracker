import { useNavigate } from "react-router-dom";

export default function Dashboard({darkMode}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("st_isLoggedIn");
    localStorage.removeItem("st_userEmail");
    navigate("/login");
  };

  return (
    <div className="page">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>🎓 Student Dashboard</h1>
        <p>Manage your studies, deadlines, and productivity in one place</p>

        
      </div>
      

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <div
          className="dashboard-card"
          onClick={() => navigate("/assignments")}
        >
          <div className="card-icon">📘</div>
          <h3>Assignments</h3>
          <p>Track and manage your assignments</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/exams")}
        >
          <div className="card-icon">📝</div>
          <h3>Exams</h3>
          <p>View exam schedules & deadlines</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/planner")}
        >
          <div className="card-icon">📅</div>
          <h3>Planner</h3>
          <p>Plan your daily & weekly study</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/timer")}
        >
          <div className="card-icon">⏱️</div>
          <h3>Study Timer</h3>
          <p>Focus with Pomodoro & timers</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/streak")}
        >
          <div className="card-icon">🔥</div>
          <h3>Streaks</h3>
          <p>Build consistent study habits</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/profile")}
        >
          <div className="card-icon">👤</div>
          <h3>Profile</h3>
          <p>View and edit your profile</p>
        </div>
      </div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}