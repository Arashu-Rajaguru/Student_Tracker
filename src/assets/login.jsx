function Login({ onLogin }) {
  const handleLogin = () => {
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
    };

    if (!user.name || !user.email) return;

    localStorage.setItem("user", JSON.stringify(user));
    onLogin();
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input id="name" placeholder="Name" />
      <input id="email" placeholder="Email" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
