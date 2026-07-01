import { useEffect, useState } from "react";
import API from "../../api/axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

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

  const getStatusBadgeClass = (itemStatus) => {
    if (itemStatus === "Completed") return "badge badge-completed";
    if (itemStatus === "Blocked") return "badge badge-blocked";
    return "badge badge-progress";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>2 Hour Work Updates</h2>
            <p>Bi-hourly progress submissions from employees</p>
          </div>

          <div className="filter-bar">
            <label>Filter by Date:</label>
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="reports-list">
            {updates.map((update) => (
              <div key={update.id} className="report-card">
                <div className="report-card-header">
                  <h3>{update.name}</h3>
                  <span className="badge badge-info">
                    {new Date(update.created_at).toLocaleString("en-GB")}
                  </span>
                </div>

                <hr />

                <div className="report-section">
                  <h4>Task</h4>
                  <p>{update.task_title}</p>
                </div>

                <div className="report-section">
                  <h4>Update</h4>
                  <p>{update.update_details}</p>
                </div>

                <div className="report-section">
                  <h4>Status</h4>
                  <span className={getStatusBadgeClass(update.status)}>
                    {update.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkUpdatesDashboard;
