import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeDetails() {

    const { id } = useParams();

    const [data, setData] =
        useState(null);

    const loadData = async () => {

        const res = await axios.get(
            `http://localhost:5000/api/users/employee/${id}`
        );

        setData(res.data);
    };

    useEffect(() => {

        loadData();

    }, []);

    if (!data)
        return <h2>Loading...</h2>;

    return (

        <div style={{ padding: "20px" }}>

            <h2>
                Employee Profile
            </h2>

            <h3>
                {data.employee.name}
            </h3>

            <p>
                Email:
                {" "}
                {data.employee.email}
            </p>

            <p>
                Status:
                {" "}
                {data.employee.status}
            </p>

            <hr />

            <h3>
                Attendance
            </h3>

            {data.attendance.map((row, i) => (

                <div key={i}>
                    {new Date(
                        row.attendance_date
                    ).toLocaleDateString("en-GB")}
                    {" - "}
                    {row.working_hours || 0}
                    hrs
                </div>

            ))}

            <hr />

            <h3>
                Tasks
            </h3>

            {data.tasks.map((task) => (

                <div key={task.id}>
                    <strong>
                        {task.title}
                    </strong>
                    {" - "}
                    {task.status}
                </div>

            ))}

            <hr />

            <h3>
                Leave History
            </h3>

            {data.leaves.map((leave) => (

                <div key={leave.id}>
                    {leave.leave_type}
                    {" - "}
                    {leave.status}
                </div>

            ))}

            <hr />

            <h3>
                Daily Reports
            </h3>

            {data.reports.map((report) => (

                <div key={report.id}>
                    <p>
                        {report.report_text}
                    </p>
                </div>

            ))}

        </div>
    );
}

export default EmployeeDetails;