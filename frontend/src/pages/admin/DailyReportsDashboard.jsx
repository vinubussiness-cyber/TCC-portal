import { useEffect, useState } from "react";
import axios from "axios";

function DailyReportsDashboard() {

    const [reports, setReports] = useState([]);
    const [search,setSearch]=useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const loadReports = async () => {

        let url = "http://localhost:5000/api/reports/all";

        if (selectedDate) {
            url += `?date=${selectedDate}`;
        }

        const res = await axios.get(url);

        setReports(res.data);

    };

    useEffect(() => {
        loadReports();
    }, [selectedDate]);

   

    const formatDate = (date) =>
        new Date(date).toLocaleDateString(
            "en-GB"
        );

    console.log(reports)
    return (

        <div style={{ padding: "20px" }}>

            <h2>
                Daily Reports
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <label>Filter by Date:</label>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                />

                <button
                    onClick={() =>
                        setSelectedDate("")
                    }
                >
                    Show All
                </button>

            </div>

            <input 
                placeholder="Search Employee"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >

                {reports
                .filter(r => 
                    r.report_date
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((report) => (

                <div
                    key={report.id}
                    style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                    }}
                >

                <div
                style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                marginBottom:"15px"
                }}
                >

                <h3>
                👤 {report.name}
                </h3>

                <span
                style={{
                background:"#1976d2",
                color:"#fff",
                padding:"6px 12px",
                borderRadius:"20px",
                fontSize:"14px"
                }}
                >
                {new Date(report.report_date).toLocaleDateString("en-GB")}
                </span>

                </div>

                <hr />

                <div style={{marginTop:"15px"}}>

                <h4>✅ Tasks Completed</h4>

                <p>{report.task_completed}</p>

                </div>

                <div style={{marginTop:"15px"}}>

                <h4>⏱ Hours Worked</h4>

                <p>{report.hours_worked} hrs</p>

                </div>

                <div style={{marginTop:"15px"}}>

                <h4>⚠ Challenges Faced</h4>

                <p>{report.challenges}</p>

                </div>

                <div style={{marginTop:"15px"}}>

                <h4>📅 Plan For Tomorrow</h4>

                <p>{report.tomorrow_plan}</p>

                </div>

                </div>

                ))}

            </div>

        </div>

    );
};

export default DailyReportsDashboard;
