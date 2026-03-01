import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  // 1. Basic empty check
  if (!email.trim() || !password.trim()) {
    setError("Please enter both email and password.");
    return;
  }

  // 2. Simple email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    setError("Please enter a valid email address.");
    return;
  }

  // 3. Mark user as logged in
  localStorage.setItem("st_isLoggedIn", "true");
  localStorage.setItem("st_userEmail", email.trim());

  // 4. Go to dashboard (make sure your dashboard route path matches this)
  navigate("/");
};

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Student Tracker</h1>
        <p className="login-subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
