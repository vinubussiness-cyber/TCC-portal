import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function TaskMonitor() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await axios.get(`${backend_url}/tasks/all`);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Task Monitoring Dashboard</h2>
            <p>Overview of all assigned tasks across employees</p>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.employee_name}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <span className="badge badge-info">{task.priority}</span>
                    </td>
                    <td>{formatDate(task.due_date)}</td>
                    <td>
                      {task.status === "Completed"
                        ? "🟢 Completed"
                        : task.status === "In Progress"
                          ? "🟡 In Progress"
                          : "🔴 Pending"}
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

export default TaskMonitor;
