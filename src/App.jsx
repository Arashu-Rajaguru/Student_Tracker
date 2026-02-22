import {useState,useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Assignments from "./modules/Assignments";
import Exams from "./modules/Exams";
import Planner from "./modules/Planner";
import Profile from "./modules/Profile";

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
  return (
    <>
    <div className="topbar">
  <h1 className="site-title">StudyFlow</h1>
</div>
<div 
  className="theme-toggle">
<button
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>
</div>

    <Routes>
      <Route path="/" element={<Dashboard darkMode={darkMode} />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  );
}

export default App;