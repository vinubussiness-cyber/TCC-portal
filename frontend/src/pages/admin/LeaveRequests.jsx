import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function LeaveRequests() {
  const [leaves, setLeaves] = useState([]);

  const loadLeaves = async () => {
    const res = await axios.get("http://localhost:5000/api/leaves/all");
    setLeaves(res.data);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put("http://localhost:5000/api/leaves/status", { id, status });
    loadLeaves();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Leave Requests</h2>
            <p>Review and manage employee leave applications</p>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.name}</td>
                    <td>{leave.leave_type}</td>
                    <td>
                      {new Date(leave.start_date).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(leave.end_date).toLocaleDateString("en-GB")}
                    </td>
                    <td>{leave.reason}</td>
                    <td>
                      <span
                        className={`badge ${
                          leave.status === "Approved"
                            ? "badge-success"
                            : leave.status === "Rejected"
                              ? "badge-danger"
                              : "badge-warning"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td>
                      {leave.status === "Pending" ? (
                        <div className="table-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => updateStatus(leave.id, "Approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => updateStatus(leave.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        leave.status
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;
