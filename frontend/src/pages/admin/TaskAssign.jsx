import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

function TaskAssign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [employees, setEmployees] = useState([]);
  const [assignAll, setAssignAll] = useState(false);

  const assignTask = async (e) => {
    e.preventDefault();

    try {
      if (!assignAll && !assignedTo) {
        alert("Please select an employee");
        return;
      }

      await axios.post("http://localhost:5000/api/tasks/create", {
        title,
        description,
        assigned_by: localStorage.getItem("userId"),
        assigned_to: assignAll ? "ALL" : assignedTo,
        priority,
        due_date: dueDate,
      });

      alert("Task Assigned");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Assign Task</h2>
            <p>Create and assign tasks to employees</p>
          </div>

          <div className="form-card">
            <form onSubmit={assignTask}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input
                  className="form-input"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={assignAll}
                    onChange={(e) => setAssignAll(e.target.checked)}
                  />
                  Assign To All Employees
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Employee</label>
                <select
                  className="form-select"
                  value={assignedTo}
                  disabled={assignAll}
                  onChange={(e) => setAssignedTo(e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  className="form-input"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <button className="btn btn-primary btn-full" type="submit">
                Assign Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskAssign;
