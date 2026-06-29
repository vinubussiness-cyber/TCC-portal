import { useEffect, useState } from "react";
import axios from "axios";

function LeaveRequests() {

    const [leaves, setLeaves] = useState([]);

    const loadLeaves = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/leaves/all"
        );

        setLeaves(res.data);
    };

    useEffect(() => {
        loadLeaves();
    }, []);

    const updateStatus = async (
        id,
        status
    ) => {

        await axios.put(
            "http://localhost:5000/api/leaves/status",
            {
                id,
                status
            }
        );

        loadLeaves();
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>
                Leave Requests
            </h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Type</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {leaves.map((leave) => (

                        <tr key={leave.id}>

                            <td>{leave.name}</td>

                            <td>
                                {leave.leave_type}
                            </td>

                            <td>
                                {new Date (leave.start_date).toLocaleDateString("en-GB")}
                            </td>

                            <td>  {/* format as date  dd/mm/yyyy */} 
                                {new Date (leave.end_date).toLocaleDateString("en-GB")}
                            </td>

                            <td>
                                {leave.reason}
                            </td>

                            <td>
                                {leave.status}
                            </td>

                            <td>
                                {leave.status === "Pending" ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    leave.id,
                                                    "Approved"
                                                )
                                            }
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    leave.id,
                                                    "Rejected"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    leave.status
                                )}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default LeaveRequests;