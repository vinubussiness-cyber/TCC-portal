import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeTasks() {

    const [tasks, setTasks] =
        useState([]);

    const loadTasks = async () => {

        const userId =
            localStorage.getItem("userId");

        const res = await axios.get(
            `http://localhost:5000/api/tasks/employee/${userId}`
        );

        setTasks(res.data);
    };

    useEffect(() => {

        loadTasks();

    }, []);

    const updateStatus = async (
        taskId,
        status
    ) => {

        await axios.put(
            "http://localhost:5000/api/tasks/status",
            {
                taskId,
                status
            }
        );

        loadTasks();
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>
                My Tasks
            </h2>

            <table border="1">

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {tasks.map((task) => (

                        <tr key={task.id}>

                            <td>
                                {task.title}
                            </td>

                            <td>
                                {task.priority}
                            </td>

                            <td>
                                {new Date(
                                    task.due_date
                                ).toLocaleDateString("en-GB")}
                            </td>

                            <td>

                                <select
                                    value={task.status}
                                    onChange={(e)=>
                                        updateStatus(
                                            task.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>
                                        Pending
                                    </option>

                                    <option>
                                        In Progress
                                    </option>

                                    <option>
                                        Completed
                                    </option>

                                </select>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeTasks;