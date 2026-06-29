import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Employees() {

    const [employees, setEmployees] =
        useState([]);

    const loadEmployees = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/users/employees"
        );

        setEmployees(res.data);
    };

    useEffect(() => {

        loadEmployees();

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h2>
                Employee Directory
            </h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((emp) => (

                        <tr key={emp.id}>

                            <td>{emp.id}</td>

                             <td>
                                <Link to={`/admin/employee/${emp.id}`}>{emp.name}</Link>
                             </td> 

                            <td>{emp.email}</td>

                            <td>{emp.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default Employees;