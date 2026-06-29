import { Link } from "react-router-dom";
import './styles/sidebar.css'

function Sidebar() {

  const role = localStorage.getItem("role");

  return (
    <div className="sidebar"
    >
      <h2>TheCadCompany</h2>

      {role === "admin" ? (
        <>
          <p><Link to="/admin/dashboard">Dashboard</Link></p>
          <p><Link to="/admin/employees">Employees</Link></p>
          <p><Link to="/admin/tasks">Assign Tasks</Link></p>
          <p><Link to="/admin/reports">Daily Reports</Link></p>
          <p><Link to="/admin/work-updates">2 Hour Updates</Link></p>
          <p><Link to="/admin/leaves">Leave Requests</Link></p>
          <p><Link to="/admin/task-monitor">Task Monitor</Link></p>
          <p><Link to="/admin/attendance">Attendance Dashboard</Link></p>
        </>
      ) : (
        <>
          <p><Link to="/employee/dashboard">Dashboard</Link></p>
          <p><Link to="/employee/tasks">My Tasks</Link></p>
          <p><Link to="/employee/daily-update">Daily Update</Link></p>
          <p><Link to="/employee/leaves">Leaves</Link></p>
          <p><Link to="/employee/attendance">Attendance</Link></p>
          <p><Link to="/employee/my-leaves">My Leave Requests</Link></p>
        </>
      )}
    </div>
  );
}

export default Sidebar;