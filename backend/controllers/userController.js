const db = require("../config/db");

const getEmployees = (req, res) => {

    const sql = `
    SELECT
        id,
        name,
        email,
        role,
        status
    FROM users
    WHERE role='employee'
    ORDER BY name
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};


const getEmployeeDetails = (req, res) => {

    const employeeId = req.params.id;

    const employeeSql = `
    SELECT
        id,
        name,
        email,
        role,
        status
    FROM users
    WHERE id = ?
    `;

    db.query(
        employeeSql,
        [employeeId],
        (err, employee) => {

            if (err)
                return res.status(500).json(err);

            if (employee.length === 0)
                return res.status(404).json({
                    message: "Employee not found"
                });

            const data = {
                employee: employee[0]
            };

            const attendanceSql = `
            SELECT
                attendance_date,
                login_time,
                logout_time,
                working_hours
            FROM attendance
            WHERE employee_id = ?
            ORDER BY attendance_date DESC
            `;

            db.query(
                attendanceSql,
                [employeeId],
                (err, attendance) => {

                    if (err)
                        return res.status(500).json(err);

                    data.attendance = attendance;

                    const taskSql = `
                    SELECT *
                    FROM tasks
                    WHERE assigned_to = ?
                    ORDER BY id DESC
                    `;

                    db.query(
                        taskSql,
                        [employeeId],
                        (err, tasks) => {

                            if (err)
                                return res.status(500).json(err);

                            data.tasks = tasks;

                            const leaveSql = `
                            SELECT *
                            FROM leaves_table
                            WHERE employee_id = ?
                            ORDER BY id DESC
                            `;

                            db.query(
                                leaveSql,
                                [employeeId],
                                (err, leaves) => {

                                    if (err)
                                        return res.status(500).json(err);

                                    data.leaves = leaves;

                                    const reportSql = `
                                    SELECT *
                                    FROM daily_reports
                                    WHERE employee_id = ?
                                    ORDER BY id DESC
                                    `;

                                    db.query(
                                        reportSql,
                                        [employeeId],
                                        (err, reports) => {

                                            if (err)
                                                return res.status(500).json(err);

                                            data.reports = reports;

                                            res.json(data);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};


module.exports = {
    getEmployees,getEmployeeDetails
};