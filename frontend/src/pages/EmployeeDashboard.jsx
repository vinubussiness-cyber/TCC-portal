import { useEffect, useState } from "react";
import API from "../api/axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import "./styles/EmployeeDashboard.css";

function EmployeeDashboard() {
  const [stats, setStats] = useState({
    workingHours: 0,
    assignedTasks: 0,
    pendingTasks: 0,
    approvedLeaves: 0,
    reportSubmitted: 0,
    todayLogin: null,
  });

  const [workingTime, setWorkingTime] = useState("00h 00m");
  const [countdown, setCountdown] = useState("02:00:00");
  const [updates, setUpdates] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [updateDetails, setUpdateDetails] = useState("");
  const [status, setStatus] = useState("In Progress");

  const employeeId = localStorage.getItem("userId");

  const loadStats = async () => {
    try {
      const res = await API.get(`/dashboard/employee/${employeeId}`);

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadUpdates = async () => {
    try {
      const res = await API.get(`/work-updates/today/${employeeId}`);

      setUpdates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitUpdate = async () => {
    if (!taskTitle || !updateDetails) {
      alert("Please fill all fields");

      return;
    }

    try {
      await API.post("/work-updates/submit", {
        employee_id: employeeId,
        task_title: taskTitle,
        update_details: updateDetails,
        status,
      });

      alert("Work Update Submitted Successfully");

      setTaskTitle("");

      setUpdateDetails("");

      setStatus("In Progress");

      setShowUpdate(false);

      await loadUpdates();
    } catch (err) {
      console.log(err);

      alert("Unable to submit update");
    }
  };

  useEffect(() => {
    loadStats();
    loadUpdates();
  }, []);

  useEffect(() => {
    if (!stats.todayLogin) return;

    const interval = setInterval(() => {
      const login = new Date(stats.todayLogin);

      const now = new Date();

      const diff = now - login;

      const hrs = Math.floor(diff / 3600000);

      const mins = Math.floor((diff % 3600000) / 60000);

      setWorkingTime(`${hrs}h ${mins}m`);

      const elapsed = Math.floor(diff / 1000);

      const remaining = 7200 - (elapsed % 7200);

      const h = String(Math.floor(remaining / 3600)).padStart(2, "0");

      const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");

      const s = String(remaining % 60).padStart(2, "0");

      setCountdown(`${h}:${m}:${s}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [stats.todayLogin]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div
          style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
          }}
        >
          <DashboardCard title="Working Hours" value={0} />

          <DashboardCard title="Assigned Tasks" value={stats.assignedTasks} />

          <DashboardCard title="Pending Tasks" value={stats.pendingTasks} />

          <DashboardCard title="Approved Leaves" value={stats.approvedLeaves} />

          <DashboardCard
            title="Today's Login"
            value={
              stats.todayLogin
                ? new Date(stats.todayLogin).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Not Started"
            }
          />

          <DashboardCard
            title="Daily Report"
            value={stats.reportSubmitted > 0 ? "Submitted" : "Pending"}
          />
        </div>

        <div style={{ padding: "25px", background: "#f5f6fa" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "25px",
              }}
            >
              <small>CURRENT STATUS</small>

                <h1>
                    <span className={stats.todayLogin ? "blink-dot" : ""}>
                        ●
                    </span>{" "}
                    {stats.todayLogin ? "Working" : "Not Started"}
                </h1>

              <hr />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <div>
                  <small>LOGIN</small>

                  <h2>
                    {stats.todayLogin
                      ? new Date(stats.todayLogin).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--"}
                  </h2>
                </div>

                <div>
                  <small>HOURS</small>

                  <h2>{workingTime}</h2>
                </div>

                <div>
                  <small>UPDATES</small>

                  <h2>{updates.length}/4</h2>
                </div>
              </div>

              <hr style={{ margin: "30px 0" }} />

              <button
                onClick={() => setShowUpdate(true)}
                style={{
                  padding: "12px 20px",
                  marginRight: "15px",
                }}
              >
                Submit Update
              </button>

              <button
                style={{
                  padding: "12px 20px",
                  background: "#111",
                  color: "#fff",
                }}
              >
                End Work
              </button>
            </div>

            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                <small>NEXT UPDATE IN</small>

                <h1>{countdown}</h1>

                <p>Mandatory every 2 hours</p>
              </div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                }}
              >
                <h3>Today's Progress</h3>

                <hr />

                <p>Assigned Tasks : {stats.assignedTasks}</p>

                <p>Pending Tasks : {stats.pendingTasks}</p>

                <p>Approved Leaves : {stats.approvedLeaves}</p>

                <p>Updates Submitted : {updates.length}</p>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "25px",
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h2>Today's Updates</h2>

            <hr />

            {updates.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ width: "120px" }}>
                  {new Date(item.created_at).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div style={{ flex: 1 }}>
                  <b>{item.task_title}</b>

                  <br />

                  {item.update_details}
                </div>

                <div>
                  <span
                    style={{
                      background:
                        item.status === "Completed"
                          ? "#2e7d32"
                          : item.status === "Blocked"
                            ? "#d32f2f"
                            : "#1976d2",

                      color: "#fff",

                      padding: "6px 15px",

                      borderRadius: "20px",

                      fontSize: "13px",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {showUpdate && (

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999
                }}
            >

                <div
                    style={{
                        width: "550px",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "25px"
                    }}
                >

                    <h2>2 Hour Work Update</h2>

                    <hr />

                    <br />

                    <label>Task Title</label>

                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e)=>setTaskTitle(e.target.value)}
                        placeholder="Ex: Mold Design"
                        style={{
                            width:"100%",
                            padding:"10px",
                            marginTop:"5px"
                        }}
                    />

                    <br /><br />

                    <label>Work Update</label>

                    <textarea
                        rows="5"
                        value={updateDetails}
                        onChange={(e)=>setUpdateDetails(e.target.value)}
                        placeholder="Describe today's progress..."
                        style={{
                            width:"100%",
                            padding:"10px"
                        }}
                    />

                    <br /><br />

                    <label>Status</label>

                    <select
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                        style={{
                            width:"100%",
                            padding:"10px",
                            marginTop:"5px"
                        }}
                    >
                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                        <option value="Blocked">
                            Blocked
                        </option>

                    </select>

                    <br /><br />

                    <div
                        style={{
                            display:"flex",
                            justifyContent:"flex-end",
                            gap:"10px"
                        }}
                    >

                        <button
                            onClick={()=>setShowUpdate(false)}
                            style={{
                                padding:"10px 18px"
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={submitUpdate}
                            style={{
                                padding:"10px 18px",
                                background:"#1976d2",
                                color:"#fff",
                                border:"none",
                                borderRadius:"5px"
                            }}
                        >
                            Submit Update
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>
  );
}

export default EmployeeDashboard;
