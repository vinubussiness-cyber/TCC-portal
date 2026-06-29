import { useEffect, useState } from "react";
import API from "../../api/axios";

function WorkUpdatesDashboard() {
  const [updates, setUpdates] = useState([]);

  const [date, setDate] = useState("");

  const loadUpdates = async () => {
    let url = "/work-updates/all";

    if (date) {
      url += `?date=${date}`;
    }

    const res = await API.get(url);

    setUpdates(res.data);
  };

  useEffect(() => {
    loadUpdates();
  }, [date]);

  return (
    <div style={{ padding: "25px" }}>
      <h2>2 Hour Work Updates</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br />
      <br />

      {updates.map((update) => (
        <div
          key={update.id}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>{update.name}</h3>

            <span>{new Date(update.created_at).toLocaleString("en-GB")}</span>
          </div>

          <hr />

          <h4>Task</h4>

          <p>{update.task_title}</p>

          <h4>Update</h4>

          <p>{update.update_details}</p>

          <h4>Status</h4>

          <div
            style={{
              background:
                update.status === "Completed"
                  ? "green"
                  : update.status === "Blocked"
                    ? "red"
                    : "#1976d2",

              color: "#fff",

              marginTop: "5px",
              padding: "5px 12px",

              borderRadius: "20px",
              width: "80px",
            }}
          >
            {update.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkUpdatesDashboard;
