import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const userId = localStorage.getItem("userId");
    const res = await axios.get(
      `http://localhost:5000/api/tasks/employee/${userId}`
    );
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateStatus = async (taskId, status) => {
    await axios.put("http://localhost:5000/api/tasks/status", {
      taskId,
      status,
    });
    loadTasks();
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>My Tasks</h2>
            <p>View and update your assigned tasks</p>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>
                      <span className="badge badge-info">{task.priority}</span>
                    </td>
                    <td>
                      {new Date(task.due_date).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={task.status}
                        onChange={(e) =>
                          updateStatus(task.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
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

export default EmployeeTasks;
