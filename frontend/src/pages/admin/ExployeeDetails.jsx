import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function EmployeeDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const loadData = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/users/employee/${id}`
    );
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data)
    return (
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="loading-state">Loading...</div>
        </div>
      </div>
    );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header profile-header">
            <h2>Employee Profile</h2>
            <h3>{data.employee.name}</h3>
          </div>

          <div className="content-panel profile-info">
            <p>
              <strong>Email:</strong> {data.employee.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="badge badge-info">{data.employee.status}</span>
            </p>
          </div>

          <div className="detail-section">
            <h3>Attendance</h3>
            {data.attendance.map((row, i) => (
              <div key={i} className="detail-item">
                {new Date(row.attendance_date).toLocaleDateString("en-GB")}
                {" — "}
                {row.working_hours || 0} hrs
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h3>Tasks</h3>
            {data.tasks.map((task) => (
              <div key={task.id} className="detail-item">
                <strong>{task.title}</strong>
                {" — "}
                {task.status}
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h3>Leave History</h3>
            {data.leaves.map((leave) => (
              <div key={leave.id} className="detail-item">
                {leave.leave_type}
                {" — "}
                {leave.status}
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h3>Daily Reports</h3>
            {data.reports.map((report) => (
              <div key={report.id} className="detail-item">
                <p>{report.report_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
