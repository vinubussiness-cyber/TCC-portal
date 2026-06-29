import { useEffect, useState } from "react";
import axios from "axios";

function TaskMonitor() {

    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/tasks/all"
            );

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    useEffect(() => {

        loadTasks();

    }, []);

    const formatDate = (date) => {

        return new Date(date)
            .toLocaleDateString("en-GB");

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>
                Task Monitoring Dashboard
            </h2>

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
                        <th>Task</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {tasks.map((task) => (

                        <tr key={task.id}>

                            <td>
                                {task.employee_name}
                            </td>

                            <td>
                                {task.title}
                            </td>

                            <td>
                                {task.description}
                            </td>

                            <td>
                                {task.priority}
                            </td>

                            <td>
                                {formatDate(
                                    task.due_date
                                )}
                            </td>

                            <td>

                                {task.status ===
                                "Completed"
                                    ? "🟢 Completed"
                                    : task.status ===
                                      "In Progress"
                                    ? "🟡 In Progress"
                                    : "🔴 Pending"}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TaskMonitor;