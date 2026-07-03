import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { backend_url } from "../common";

function DailyUpdate() {
  const [workDone, setWorkDone] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [challenges, setChallenges] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");

  const submitReport = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backend_url}/reports/submit`, {
        employee_id: localStorage.getItem("userId"),
        work_done: workDone,
        hours_worked: hoursWorked,
        challenges,
        tomorrow_plan: tomorrowPlan,
      });

      alert("Daily Report Submitted");

      setWorkDone("");
      setHoursWorked("");
      setChallenges("");
      setTomorrowPlan("");
    } catch (err) {
      alert("Failed To Submit");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Daily Work Update</h2>
            <p>Submit your end-of-day report</p>
          </div>

          <div className="form-card">
            <form onSubmit={submitReport}>
              <div className="form-group">
                <label className="form-label">Work Done Today</label>
                <textarea
                  className="form-textarea"
                  placeholder="Work Done Today"
                  value={workDone}
                  onChange={(e) => setWorkDone(e.target.value)}
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
                <label className="form-label">Challenges</label>
                <textarea
                  className="form-textarea"
                  placeholder="Challenges"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tomorrow Plan</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tomorrow Plan"
                  value={tomorrowPlan}
                  onChange={(e) => setTomorrowPlan(e.target.value)}
                />
              </div>

              <button className="btn btn-primary btn-full" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyUpdate;
