// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Assignments from "./modules/Assignments";
import Exams from "./modules/Exams";
import Planner from "./modules/Planner";
import Profile from "./modules/Profile";
import Timer from "./modules/Timer";
import Login from "./modules/Login";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isLoggedIn = localStorage.getItem("st_isLoggedIn") === "true";

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">StudyFlow</h1>
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/assignments"
          element={isLoggedIn ? <Assignments /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/exams"
          element={isLoggedIn ? <Exams /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/planner"
          element={isLoggedIn ? <Planner /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/timer"
          element={isLoggedIn ? <Timer /> : <Navigate to="/login" replace />}
        />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
