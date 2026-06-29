const db = require("../config/db");

const createTask = (req, res) => {

    const {
        title,
        description,
        assigned_by,
        assigned_to,
        priority,
        due_date
    } = req.body;

    // Assign to all employees
    if (assigned_to === "ALL") {

        const employeeSql = `
        SELECT id
        FROM users
        WHERE role = 'employee'
        `;

        db.query(
            employeeSql,
            (err, employees) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                employees.forEach((emp) => {

                    db.query(
                        `
                        INSERT INTO tasks
                        (
                            title,
                            description,
                            assigned_by,
                            assigned_to,
                            priority,
                            due_date
                        )
                        VALUES
                        (
                            ?,?,?,?,?,?
                        )
                        `,
                        [
                            title,
                            description,
                            assigned_by,
                            emp.id,
                            priority,
                            due_date
                        ]
                    );

                });

                res.json({
                    message:
                    "Task Assigned To All Employees"
                });

            }
        );

    }

    // Assign to one employee
    else {

        const sql = `
        INSERT INTO tasks
        (
            title,
            description,
            assigned_by,
            assigned_to,
            priority,
            due_date
        )
        VALUES
        (
            ?,?,?,?,?,?
        )
        `;

        db.query(
            sql,
            [
                title,
                description,
                assigned_by,
                assigned_to,
                priority,
                due_date
            ],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Task Assigned"
                });

            }
        );
    }
};


const getEmployeeTasks = (req, res) => {

    const employeeId = req.params.employeeId;

    const sql = `
    SELECT *
    FROM tasks
    WHERE assigned_to = ?
    ORDER BY id DESC
    `;

    db.query(
        sql,
        [employeeId],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );
};


const updateTaskStatus = (req, res) => {

    const {
        taskId,
        status
    } = req.body;

    const sql = `
    UPDATE tasks
    SET status = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [status, taskId],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Task Updated"
            });

        }
    );
};

const getAllTasks = (req, res) => {

    const sql = `
    SELECT
        t.id,
        t.title,
        t.description,
        t.priority,
        t.status,
        t.due_date,
        u.name AS employee_name
    FROM tasks t
    JOIN users u
    ON t.assigned_to = u.id
    ORDER BY t.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

module.exports = {
    createTask,getEmployeeTasks,updateTaskStatus,getAllTasks
};