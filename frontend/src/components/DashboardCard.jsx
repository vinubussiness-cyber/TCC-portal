function DashboardCard({ title, value }) {

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,.1)"
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>

    </div>
  );
}

export default DashboardCard;