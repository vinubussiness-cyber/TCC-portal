import Sidebar from "../../components/Sidebar.jsx";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import {
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiList,
  FiCheckCircle,
} from "react-icons/fi";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  const loadStats = async () => {
    const res = await API.get("/dashboard/stats");
    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-container animate-fade-in">
          <div className="page-header">
            <h2>Admin Dashboard</h2>
            <p>Overview of your organization at a glance</p>
          </div>

          <div className="cards-grid">
            <DashboardCard
              title="Total Employees"
              value={stats.totalEmployees}
              icon={<FiUsers />}
              description="Registered in system"
            />
            <DashboardCard
              title="Present Today"
              value={stats.presentToday}
              icon={<FiUserCheck />}
              description="Currently checked in"
            />
            <DashboardCard
              title="Pending Leaves"
              value={stats.pendingLeaves}
              icon={<FiCalendar />}
              description="Awaiting approval"
            />
            <DashboardCard
              title="Open Tasks"
              value={stats.openTasks}
              icon={<FiList />}
              description="Active assignments"
            />
            <DashboardCard
              title="Completed Tasks"
              value={stats.completedTasks}
              icon={<FiCheckCircle />}
              description="Finished this period"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
