import { useState } from "react";
import axios from "axios";

function LeavePage() {

    const [leaveType, setLeaveType] =
        useState("Casual");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const [reason, setReason] =
        useState("");

    const applyLeave = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/leaves/apply",
                {
                    employee_id:
                        localStorage.getItem("userId"),

                    leave_type:
                        leaveType,

                    start_date:
                        startDate,

                    end_date:
                        endDate,

                    reason
                }
            );

            alert(
                "Leave Request Submitted"
            );

        } catch (err) {

            console.log(err);

            alert(
                "Failed To Submit Leave"
            );

        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Apply Leave</h2>

            <form onSubmit={applyLeave}>

                <label>
                    Leave Type
                </label>

                <br />

                <select
                    value={leaveType}
                    onChange={(e)=>
                        setLeaveType(
                            e.target.value
                        )
                    }
                >
                    <option>Casual</option>
                    <option>Sick</option>
                    <option>WFH</option>
                    <option>Half Day</option>
                </select>

                <br /><br />

                <label>
                    Start Date
                </label>

                <br />

                <input
                    type="date"
                    value={startDate}
                    onChange={(e)=>
                        setStartDate(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <label>
                    End Date
                </label>

                <br />

                <input
                    type="date"
                    value={endDate}
                    onChange={(e)=>
                        setEndDate(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Reason"
                    value={reason}
                    onChange={(e)=>
                        setReason(
                            e.target.value
                        )
                    }
                    rows="4"
                    cols="40"
                />

                <br /><br />

                <button type="submit">
                    Apply Leave
                </button>

            </form>

        </div>
    );
}

export default LeavePage;