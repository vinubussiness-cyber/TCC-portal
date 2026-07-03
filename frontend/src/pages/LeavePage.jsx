import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { backend_url } from "../common";

function LeavePage() {
  const [leaveType, setLeaveType] = useState("Casual");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const applyLeave = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backend_url}/leaves/apply`, {
        employee_id: localStorage.getItem("userId"),
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason,
      });

      alert("Leave Request Submitted");
    } catch (err) {
      console.log(err);
      alert("Failed To Submit Leave");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Apply Leave</h2>
            <p>Submit a new leave request for approval</p>
          </div>

          <div className="form-card">
            <form onSubmit={applyLeave}>
              <div className="form-group">
                <label className="form-label">Leave Type</label>
                <select
                  className="form-select"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option>Casual</option>
                  <option>Sick</option>
                  <option>WFH</option>
                  <option>Half Day</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-textarea"
                  placeholder="Reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="4"
                />
              </div>

              <button className="btn btn-primary btn-full" type="submit">
                Apply Leave
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
