import { useEffect, useState,useRef } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import logo from "../assets/TCC-logo.jpeg"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaRegClock } from "react-icons/fa";

import {
  FiClock,
  FiList,
  FiAlertCircle,
  FiCalendar,
  FiLogIn,
  FiFileText,
} from "react-icons/fi";

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

  const [alertShown, setAlertShown] = useState(false);
  const [updatesLoaded, setUpdatesLoaded] = useState(false);

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
      setUpdatesLoaded(true)

    } catch (err) {
      console.log(err);
      setUpdatesLoaded(true)
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
      setShowUpdate(false)

      await loadUpdates();
    } catch (err) {
      console.log(err);
      alert("Unable to submit update");
    }
  };

  useEffect(() => {
    loadStats();
    loadUpdates();

    if ("Notification" in window) {  //to pop browser notification

        Notification.requestPermission();

    }
  }, []);

  useEffect(() => {

    if (!stats.todayLogin || !updatesLoaded)
        return;

    const interval = setInterval(() => {

        const login =
            new Date(stats.todayLogin);

        const now =
            new Date();

        const diff =
            now - login;

        const hrs =
            Math.floor(diff / 3600000);

        const mins =
            Math.floor(
                (diff % 3600000) / 60000
            );

        setWorkingTime(
            `${hrs}h ${mins}m`
        );

        const elapsed =
            Math.floor(diff / 1000);

        const TWO_HOURS = 7200;

        const currentCycle =
            Math.floor(
                elapsed / TWO_HOURS
            );

        const elapsedInCycle =
            elapsed % TWO_HOURS;

        const remaining =
            TWO_HOURS - elapsedInCycle;


        // Check whether update was already submitted
        const cycleAlreadySubmitted =
            updates.some((update) => {

                const updateTime =
                    new Date(
                        update.created_at
                    );

                const updateElapsed =
                    Math.floor(
                        (updateTime - login) /
                        1000
                    );

                const updateCycle =
                    Math.floor(
                        updateElapsed /
                        TWO_HOURS
                    );

                return (
                    updateCycle ===
                    currentCycle
                );

            });


        // Trigger notification only if
        // this 2-hour period has no update

        if (
            currentCycle > 0 &&
            !cycleAlreadySubmitted &&
            currentCycle !==
                lastAlertCycle.current
        ) {

            playNotificationSound();

            showToast();

            showBrowserNotification();

            setShowUpdate(true);

            lastAlertCycle.current =
                currentCycle;
        }


        const h =
            String(
                Math.floor(
                    remaining / 3600
                )
            ).padStart(2, "0");

        const m =
            String(
                Math.floor(
                    (remaining % 3600) / 60
                )
            ).padStart(2, "0");

        const s =
            String(
                remaining % 60
            ).padStart(2, "0");

        setCountdown(
            `${h}:${m}:${s}`
        );

    }, 1000);


    return () =>
        clearInterval(interval);

  }, [
     stats.todayLogin,
      updatesLoaded,
      updates
    ]);

  const getStatusBadgeClass = (itemStatus) => {
    if (itemStatus === "Completed") return "badge badge-completed";
    if (itemStatus === "Blocked") return "badge badge-blocked";
    return "badge badge-progress";
  };


  const playNotificationSound = () => {
    const audio = new Audio('/sounds/notification.mp3')
    audio.play().catch((err)=>{
        console.log('Notification sound blocked:', err)
    })
  }

  const showBrowserNotification = () => {
    if(
      'Notification' in window &&
      Notification.permission === 'granted') {
      new Notification(
        'THE CAD COMPANY',
        {
          body:
            '2 Hours completed. \nPlease submit your work update.',
          icon: logo
        }
      );
    }
  }

  // toast notification 
 

  const showToast = () => {

    toast.info(
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FaRegClock size={24} color="#f59e0b" />
                <div>
                    <strong>2 Hours Completed</strong>
                    <br />
                    Please submit your work update.
                </div>
        </div>,
        {
            position: "top-right",
            autoClose: 6000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
            theme: "dark"
        }
        );

    };

  const lastAlertCycle = useRef(-1);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-container animate-fade-in">
          <div className="cards-grid">
            <DashboardCard
              title="Working Hours"
              value={workingTime}
              icon={<FiClock />}
              description="Time logged today"
            />
            <DashboardCard
              title="Assigned Tasks"
              value={stats.assignedTasks}
              icon={<FiList />}
              description="Total assigned to you"
            />
            <DashboardCard
              title="Pending Tasks"
              value={stats.pendingTasks}
              icon={<FiAlertCircle />}
              description="Needs attention"
            />
            <DashboardCard
              title="Approved Leaves"
              value={stats.approvedLeaves}
              icon={<FiCalendar />}
              description="Approved this year"
            />
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
              icon={<FiLogIn />}
              description="Check-in time"
            />
            <DashboardCard
              title="Daily Report"
              value={stats.reportSubmitted > 0 ? "Submitted" : "Pending"}
              icon={<FiFileText />}
              description="End of day status"
            />
          </div>

          <div className="dashboard-section">
            <div className="dashboard-two-col">
              <div className="content-panel">
                <small className="label-text">Current Status</small>

                <h1>
                  <span className={stats.todayLogin ? "blink-dot" : ""}>●</span>{" "}
                  {stats.todayLogin ? "Working" : "Not Started"}
                </h1>

                <hr />

                <div className="status-row">
                  <div className="status-item">
                    <small className="label-text">Login</small>
                    <h2>
                      {stats.todayLogin
                        ? new Date(stats.todayLogin).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--"}
                    </h2>
                  </div>

                  <div className="status-item">
                    <small className="label-text">Hours</small>
                    <h2>{workingTime}</h2>
                  </div>

                  <div className="status-item">
                    <small className="label-text">Updates</small>
                    <h2>{updates.length}/4</h2>
                  </div>
                </div>

                <hr />

                <div className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowUpdate(true)}
                  >
                    Submit Update
                  </button>
                  <button className="btn btn-secondary">End Work</button>
                </div>
              </div>

              <div>
                <div className="content-panel-secondary" style={{ marginBottom: "1.25rem" }}>
                  <div className="countdown-display">
                    <small className="label-text">Next Update In</small>
                    <h1>{countdown}</h1>
                    <p>Mandatory every 2 hours</p>
                  </div>
                </div>

                <div className="content-panel-secondary">
                  <h3>Today's Progress</h3>
                  <hr />
                  <div className="progress-list">
                    <p>Assigned Tasks : {stats.assignedTasks}</p>
                    <p>Pending Tasks : {stats.pendingTasks}</p>
                    <p>Approved Leaves : {stats.approvedLeaves}</p>
                    <p>Updates Submitted : {updates.length}</p>
                  </div>
                </div>
              </div>
              
              {/* toast notification */}
              <ToastContainer
                  position="top-right"
                  autoClose={6000}
                  theme="dark"
                  closeOnClick
                  pauseOnHover
                  draggable
                  newestOnTop
                  style={{top:100}}
              />

            </div>

            
            {/* update details */}
            <div className="content-panel updates-list">
              <h2>Today's Updates</h2>
              <hr />

              {updates.map((item) => (
                <div key={item.id} className="update-row">
                  <div className="update-time">
                    {new Date(item.created_at).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  <div className="update-body">
                    <b>{item.task_title}</b>
                    {item.update_details}
                  </div>

                  <div>
                    <span className={getStatusBadgeClass(item.status)}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showUpdate && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>2 Hour Work Update</h2>
            <hr />

            <div className="form-group">
              <label className="form-label">Task Title</label>
              <input
                className="form-input"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Ex: Mold Design"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Work Update</label>
              <textarea
                className="form-textarea"
                rows="5"
                value={updateDetails}
                onChange={(e) => setUpdateDetails(e.target.value)}
                placeholder="Describe today's progress..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowUpdate(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={submitUpdate}>
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
