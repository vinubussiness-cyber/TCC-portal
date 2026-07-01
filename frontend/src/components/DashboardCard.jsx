function DashboardCard({ title, value, icon, description }) {
  return (
    <div className="dashboard-card animate-slide-up">
      {icon && <div className="dashboard-card__icon">{icon}</div>}
      <h4 className="dashboard-card__title">{title}</h4>
      <h2 className="dashboard-card__value">{value ?? "—"}</h2>
      {description && <p className="dashboard-card__desc">{description}</p>}
    </div>
  );
}

export default DashboardCard;
