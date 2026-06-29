import axios from "axios";
import { useState,useEffect } from "react";

function TaskAssign() {

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [assignedTo, setAssignedTo] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [dueDate, setDueDate] = useState("");

    const [employees, setEmployees] = useState([]);

    const [assignAll, setAssignAll] = useState(false);

    const assignTask = async (e) => {

        e.preventDefault();

        try {

            if (!assignAll && !assignedTo) {
               alert("Please select an employee");
            return;
}

            await axios.post(
                "http://localhost:5000/api/tasks/create",
                {
                    title,
                    description,
                    assigned_by:
                        localStorage.getItem("userId"),

                    assigned_to:
                    assignAll
                    ? "ALL"
                    : assignedTo,


                    priority,

                    due_date:
                        dueDate
                }
            );

            alert(
                "Task Assigned"
            );

        } catch (err) {
            console.log(err);
        };

    };



        useEffect(() => {
            loadEmployees();
        }, []);

        const loadEmployees = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/users/employees"
                );
                setEmployees(res.data);
            } catch(err) {
                console.log(err);
            }
        };

        useEffect(() => {
            loadEmployees();
        }, []);


    return (
        <div style={{ padding: "30px" }}>

            <h2>
                Assign Task
            </h2>

            <form onSubmit={assignTask}>

                <input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e)=>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <br /><br />


                <label>
                <input
                    type="checkbox"
                    checked={assignAll}
                    onChange={(e)=>
                        setAssignAll(
                            e.target.checked
                        )
                    }
                />

                Assign To All Employees
            </label> <br />

                <select
                    value={assignedTo}
                    disabled={assignAll}
                    onChange={(e)=>
                        setAssignedTo(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Employee
                    </option>

                    {employees.map((emp) => (

                        <option
                            key={emp.id}
                            value={emp.id}
                        >
                            {emp.name}
                        </option>

                    ))}

                </select>

                <br /><br />

                <select
                    value={priority}
                    onChange={(e)=>
                        setPriority(
                            e.target.value
                        )
                    }
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>

                <br /><br />

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e)=>
                        setDueDate(
                            e.target.value
                        )
                    }
                />

                <br /><br />

                <button type="submit">
                    Assign Task
                </button>

            </form>

        </div>
    );
}

export default TaskAssign;