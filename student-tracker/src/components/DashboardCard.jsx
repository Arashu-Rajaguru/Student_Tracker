function DashboardCard({ title, icon, onClick }) {
  return (
    <button className="dashboard-card" onClick={onClick}>
      <span className="card-icon">{icon}</span>
      <span className="card-title">{title}</span>
    </button>
  );
}

export default DashboardCard;
