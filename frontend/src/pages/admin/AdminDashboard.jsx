import Sidebar from "../../components/Sidebar.jsx";
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import API from "../../api/axios.js";

function AdminDashboard() {

  const [stats, setStats] =
        useState({});

    const loadStats = async () => {

        const res = await API.get(
            "/dashboard/stats"
        );

        setStats(res.data);
    };

    useEffect(() => {

        loadStats();

    }, []);

    const cardStyle = {
        width: "220px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        margin: "10px"
    };

    

  return (
    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>

      <Navbar />



        <div style={{ padding: "20px" }}>

            <h2>
                Admin Dashboard
            </h2>


            <div style={{
                display: "flex",
                flexWrap: "wrap"
            }}>

                <div style={cardStyle}>
                    <h3>
                        Total Employees
                    </h3>
                    <h1>
                        {stats.totalEmployees}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>
                        Present Today
                    </h3>
                    <h1>
                        {stats.presentToday}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>
                        Pending Leaves
                    </h3>
                    <h1>
                        {stats.pendingLeaves}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>
                        Open Tasks
                    </h3>
                    <h1>
                        {stats.openTasks}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>
                        Completed Tasks
                    </h3>
                    <h1>
                        {stats.completedTasks}
                    </h1>
                </div>

            </div>

        </div>

      </div>
      

    </div>
  );
}

export default AdminDashboard;





// import { useEffect, useState } from "react";
// import axios from "axios";

// function AdminDashboard() {

//     const [stats, setStats] =
//         useState({});

//     const loadStats = async () => {

//         const res = await axios.get(
//             "http://localhost:5000/api/dashboard/stats"
//         );

//         setStats(res.data);
//     };

//     useEffect(() => {

//         loadStats();

//     }, []);

//     const cardStyle = {
//         width: "220px",
//         padding: "20px",
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         textAlign: "center",
//         margin: "10px"
//     };

//     return (

//         <div style={{ padding: "20px" }}>

//             <h2>
//                 Admin Dashboard
//             </h2>

//             <div style={{
//                 display: "flex",
//                 flexWrap: "wrap"
//             }}>

//                 <div style={cardStyle}>
//                     <h3>
//                         Total Employees
//                     </h3>
//                     <h1>
//                         {stats.totalEmployees}
//                     </h1>
//                 </div>

//                 <div style={cardStyle}>
//                     <h3>
//                         Present Today
//                     </h3>
//                     <h1>
//                         {stats.presentToday}
//                     </h1>
//                 </div>

//                 <div style={cardStyle}>
//                     <h3>
//                         Pending Leaves
//                     </h3>
//                     <h1>
//                         {stats.pendingLeaves}
//                     </h1>
//                 </div>

//                 <div style={cardStyle}>
//                     <h3>
//                         Open Tasks
//                     </h3>
//                     <h1>
//                         {stats.openTasks}
//                     </h1>
//                 </div>

//                 <div style={cardStyle}>
//                     <h3>
//                         Completed Tasks
//                     </h3>
//                     <h1>
//                         {stats.completedTasks}
//                     </h1>
//                 </div>

//             </div>

//         </div>
//     );
// }

// export default AdminDashboard;