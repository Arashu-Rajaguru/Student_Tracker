function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="card">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate("/")}>⬅ Back</button>
    </div>
  );
}

export default Profile;
