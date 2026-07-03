import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function DailyReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const loadReports = async () => {
    let url = `${backend_url}/reports/all`;

    if (selectedDate) {
      url += `?date=${selectedDate}`;
    }

    const res = await axios.get(url);
    setReports(res.data);
  };

  useEffect(() => {
    loadReports();
  }, [selectedDate]);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  console.log(reports);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Daily Reports</h2>
            <p>Employee end-of-day submissions</p>
          </div>

          <div className="filter-bar">
            <label>Filter by Date:</label>
            <input
              className="form-input"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSelectedDate("")}
            >
              Show All
            </button>
          </div>

          <input
            className="form-input search-input"
            placeholder="Search Employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="reports-list">
            {reports
              .filter((r) =>
                r.report_date.toLowerCase().includes(search.toLowerCase())
              )
              .map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-card-header">
                    <h3>{report.name}</h3>
                    <span className="badge badge-info">
                      {formatDate(report.report_date)}
                    </span>
                  </div>

                  <hr />

                  <div className="report-section">
                    <h4>Tasks Completed</h4>
                    <p>{report.task_completed}</p>
                  </div>

                  <div className="report-section">
                    <h4>Hours Worked</h4>
                    <p>{report.hours_worked} hrs</p>
                  </div>

                  <div className="report-section">
                    <h4>Challenges Faced</h4>
                    <p>{report.challenges}</p>
                  </div>

                  <div className="report-section">
                    <h4>Plan For Tomorrow</h4>
                    <p>{report.tomorrow_plan}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReportsDashboard;
