import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function Attendance() {
  const [attendance, setAttendance] = useState(null);
  const [showEOD, setShowEOD] = useState(false);

  const [tasksCompleted, setTasksCompleted] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [challenges, setChallenges] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");

  const employeeId = localStorage.getItem("userId");

  const loadAttendance = async () => {
    const res = await axios.get(
      `${backend_url}/attendance/today/${employeeId}`
    );
    setAttendance(res.data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const startWork = async () => {
    await axios.post(`${backend_url}/attendance/login`, {
      employee_id: employeeId,
    });
    loadAttendance();
  };

  const endWork = async () => {
    await axios.post(`${backend_url}/attendance/logout`, {
      employee_id: employeeId,
    });
    loadAttendance();
  };

  const submitEODAndLogout = async () => {
    try {
      await axios.post(`${backend_url}/reports/submit`, {
        employee_id: employeeId,
        work_done: tasksCompleted,
        tasks_completed: tasksCompleted,
        hours_worked: hoursWorked,
        challenges,
        tomorrow_plan: tomorrowPlan,
      });

      await axios.post(`${backend_url}/attendance/logout`, {
        employee_id: employeeId,
      });

      alert("EOD Submitted Successfully");
      setShowEOD(false);
      loadAttendance();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Attendance</h2>
            <p>Track your daily work session</p>
          </div>

          <div className="attendance-card">
            <h3>Today's Status</h3>

            {!attendance && (
              <>
                <p className="attendance-status">🔴 Not Started</p>
                <button className="btn btn-primary" onClick={startWork}>
                  Start Work
                </button>
              </>
            )}

            {attendance && !attendance.logout_time && (
              <>
                <p className="attendance-status">
                  <span className="blink-dot">●</span> Started
                </p>
                <p>
                  Login Time:{" "}
                  {new Date(attendance.login_time).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEOD(true)}
                >
                  End Work
                </button>
              </>
            )}

            {attendance && attendance.logout_time && (
              <>
                <p className="attendance-status">✅ Work Completed</p>
                <p>
                  Login:{" "}
                  {new Date(attendance.login_time).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  Logout:{" "}
                  {new Date(attendance.logout_time).toLocaleTimeString(
                    "en-GB",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p>Hours Worked: {attendance.working_hours} hrs</p>
              </>
            )}
          </div>

          {showEOD && (
            <div className="modal-overlay">
              <div className="modal-card modal-card-wide">
                <h2>End Of Day Update</h2>
                <hr />

                <div className="form-group">
                  <label className="form-label">Tasks Completed Today</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Tasks Completed Today"
                    value={tasksCompleted}
                    onChange={(e) => setTasksCompleted(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hours Worked</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="Hours Worked"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Challenges Faced</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Challenges Faced"
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Plan For Tomorrow</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Plan For Tomorrow"
                    value={tomorrowPlan}
                    onChange={(e) => setTomorrowPlan(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowEOD(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={submitEODAndLogout}
                  >
                    Submit & Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
