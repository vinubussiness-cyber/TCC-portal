import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiCheckSquare,
  FiFileText,
  FiClock,
  FiCalendar,
  FiActivity,
  FiClipboard,
  FiList,
  FiUser,
} from "react-icons/fi";

function Sidebar() {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name") || "User";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
    { to: "/admin/employees", label: "Employees", icon: FiUsers },
    { to: "/admin/tasks", label: "Assign Tasks", icon: FiCheckSquare },
    { to: "/admin/reports", label: "Daily Reports", icon: FiFileText },
    { to: "/admin/work-updates", label: "2 Hour Updates", icon: FiClock },
    { to: "/admin/leaves", label: "Leave Requests", icon: FiCalendar },
    { to: "/admin/task-monitor", label: "Task Monitor", icon: FiActivity },
    { to: "/admin/attendance", label: "Attendance", icon: FiClipboard },
  ];

  const employeeLinks = [
    { to: "/employee/dashboard", label: "Dashboard", icon: FiGrid },
    { to: "/employee/tasks", label: "My Tasks", icon: FiList },
    { to: "/employee/daily-update", label: "Daily Update", icon: FiFileText },
    { to: "/employee/leaves", label: "Leaves", icon: FiCalendar },
    { to: "/employee/attendance", label: "Attendance", icon: FiClipboard },
    { to: "/employee/my-leaves", label: "My Leave Requests", icon: FiUser },
  ];

  const links = role === "admin" ? adminLinks : employeeLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img className="tcc-logo" src="/src/assets/TCC-logo.jpeg" alt="Company logo" />
        <span className="sidebar-brand">TheCadCompany</span>
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-profile-info">
            <div className="sidebar-profile-name">{name}</div>
            <div className="sidebar-profile-role">{role || "user"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
