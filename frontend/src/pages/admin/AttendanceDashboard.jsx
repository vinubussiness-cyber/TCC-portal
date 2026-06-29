import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/axios.js"
import "../styles/attendanceDashboard.css";
function AttendanceDashboard() {

    const [records, setRecords] =
        useState([]);

    const loadAttendance = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/attendance/report"
        );

        setRecords(res.data);
    };

    useEffect(() => {
        loadAttendance();
    }, []);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-GB");

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const downloadAttendance = async () => {

    try {

        const response = await API.get(
            "/export/attendance",
            {
                responseType: "blob"
            }
        );

        const url =
            window.URL.createObjectURL(
                new Blob([response.data])
            );

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "attendance.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{ padding: "20px" }}>
            
            <div className="attendance-head" >
              <h2>
                Attendance Dashboard
            </h2>
                <button onClick={downloadAttendance}>
                    Download Attendance
                </button>
            </div>  
            
            
            
            

            <table
                border="1"
                cellPadding="10"
                style={{
                    borderCollapse: "collapse",
                    width: "100%"
                }}
            >

                <thead>

                    <tr>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Login</th>
                        <th>Logout</th>
                        <th>Hours</th>
                    </tr>

                </thead>

                <tbody>

                    {records.map((row) => (

                        <tr key={row.id}>

                            <td>
                                {row.name}
                            </td>

                            <td>
                                {formatDate(
                                    row.attendance_date
                                )}
                            </td>

                            <td>
                                {row.login_time
                                    ? formatTime(
                                        row.login_time
                                      )
                                    : "-"
                                }
                            </td>

                            <td>
                                {row.logout_time
                                    ? formatTime(
                                        row.logout_time
                                      )
                                    : "-"
                                }
                            </td>

                            <td>
                                {row.working_hours ||
                                 0}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AttendanceDashboard;