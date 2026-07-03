import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { backend_url } from "../common";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(
      `${backend_url}/leaves/employee/${userId}`
    );
    setLeaves(res.data);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>My Leave Requests</h2>
            <p>Track the status of your submitted leave requests</p>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.leave_type}</td>
                    <td>{formatDate(leave.start_date)}</td>
                    <td>{formatDate(leave.end_date)}</td>
                    <td>{leave.reason}</td>
                    <td>
                      {leave.status === "Approved" && "🟢 Approved"}
                      {leave.status === "Rejected" && "🔴 Rejected"}
                      {leave.status === "Pending" && "🟡 Pending"}
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

export default MyLeaves;
