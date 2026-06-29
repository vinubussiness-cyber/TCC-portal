import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {

    const [attendance, setAttendance] =
        useState(null);

    const [showEOD, setShowEOD] = useState(false);

    const [tasksCompleted, setTasksCompleted] =
        useState("");

    const [hoursWorked, setHoursWorked] =
        useState("");

    const [challenges, setChallenges] =
        useState("");

    const [tomorrowPlan, setTomorrowPlan] =
        useState("");

    const employeeId =
        localStorage.getItem("userId");

    const loadAttendance = async () => {

        const res = await axios.get(
            `http://localhost:5000/api/attendance/today/${employeeId}`
        );

        setAttendance(res.data);
    };

    useEffect(() => {

        loadAttendance();

    }, []);

    const startWork = async () => {

        await axios.post(
            "http://localhost:5000/api/attendance/login",
            {
                employee_id: employeeId
            }
        );

        loadAttendance();

    };

    const endWork = async () => {

        await axios.post(
            "http://localhost:5000/api/attendance/logout",
            {
                employee_id: employeeId
            }
        );

        loadAttendance();

    };


    const submitEODAndLogout = async () => {

        try {

            await axios.post(
                "http://localhost:5000/api/reports/submit",
                {
                    employee_id: employeeId,

                    work_done:
                        tasksCompleted,

                    tasks_completed:
                        tasksCompleted,

                    hours_worked:
                        hoursWorked,

                    challenges,

                    tomorrow_plan:
                        tomorrowPlan
                }
            );

            await axios.post(
                "http://localhost:5000/api/attendance/logout",
                {
                    employee_id:
                        employeeId
                }
            );

            alert(
                "EOD Submitted Successfully"
            );

            setShowEOD(false);

            loadAttendance();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div style={{
            padding: "30px"
        }}>

            <h2>
                Attendance
            </h2>

            <div style={{
                border: "1px solid #ddd",
                padding: "20px",
                width: "350px",
                borderRadius: "8px"
            }}>

                <h3>
                    Today's Status
                </h3>

                {!attendance && (

                    <>
                        <p>
                            🔴 Not Started
                        </p>

                        <button
                            onClick={startWork}
                        >
                            Start Work
                        </button>
                    </>

                )}

                {attendance &&
                 !attendance.logout_time && (

                    <>
                        <p>
                            🟢 Started
                        </p>

                        <p>
                            Login Time:
                            {" "}
                            {
                                new Date(
                                    attendance.login_time
                                ).toLocaleTimeString(
                                    "en-GB",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }
                                )
                            }
                        </p>

                        <button
                            onClick={()=> setShowEOD(true)}
                        >
                            End Work
                        </button>
                    </>

                )}

                {attendance &&
                 attendance.logout_time && (

                    <>
                        <p>
                            ✅ Work Completed
                        </p>

                        <p>
                            Login:
                            {" "}
                            {
                                new Date(
                                    attendance.login_time
                                ).toLocaleTimeString(
                                    "en-GB",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }
                                )
                            }
                        </p>

                        <p>
                            Logout:
                            {" "}
                            {
                                new Date(
                                    attendance.logout_time
                                ).toLocaleTimeString(
                                    "en-GB",
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }
                                )
                            }
                        </p>

                        <p>
                            Hours Worked:
                            {" "}
                            {
                                attendance.working_hours
                            }
                            hrs
                        </p>

                    </>

                )}

            </div>


            {showEOD && (

            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 999
                }}
            >

                <div
                    style={{
                        background: "#fff",
                        padding: "25px",
                        width: "500px",
                        borderRadius: "10px"
                    }}
                >

                    <h2>
                        End Of Day Update
                    </h2>

                    <textarea
                        placeholder="Tasks Completed Today"
                        value={tasksCompleted}
                        onChange={(e)=>
                            setTasksCompleted(
                                e.target.value
                            )
                        }
                        style={{
                            width:"100%",
                            height:"80px"
                        }}
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Hours Worked"
                        value={hoursWorked}
                        onChange={(e)=>
                            setHoursWorked(
                                e.target.value
                            )
                        }
                        style={{
                            width:"100%"
                        }}
                    />

                    <br /><br />

                    <textarea
                        placeholder="Challenges Faced"
                        value={challenges}
                        onChange={(e)=>
                            setChallenges(
                                e.target.value
                            )
                        }
                        style={{
                            width:"100%",
                            height:"80px"
                        }}
                    />

                    <br /><br />

                    <textarea
                        placeholder="Plan For Tomorrow"
                        value={tomorrowPlan}
                        onChange={(e)=>
                            setTomorrowPlan(
                                e.target.value
                            )
                        }
                        style={{
                            width:"100%",
                            height:"80px"
                        }}
                    />

                    <br /><br />

                    <button
                        onClick={submitEODAndLogout}
                    >
                        Submit & Logout
                    </button>

                    <button
                        style={{
                            marginLeft:"10px"
                        }}
                        onClick={()=>
                            setShowEOD(false)
                        }
                    >
                        Cancel
                    </button>

                </div>

            </div>

            )}

        </div>
    );
}

export default Attendance;