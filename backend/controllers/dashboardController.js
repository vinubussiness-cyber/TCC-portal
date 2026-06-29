const db = require("../config/db");

const getDashboardStats = (req, res) => {

    const stats = {};

    db.query(
        "SELECT COUNT(*) AS totalEmployees FROM users WHERE role='employee'",
        (err, employees) => {

            if (err)
                return res.status(500).json(err);

            stats.totalEmployees =
                employees[0].totalEmployees;

            db.query(
                `
                SELECT COUNT(DISTINCT employee_id)
                AS presentToday
                FROM attendance
                WHERE attendance_date = CURDATE()
                `,
                (err, attendance) => {

                    if (err)
                        return res.status(500).json(err);

                    stats.presentToday =
                        attendance[0].presentToday;

                    db.query(
                        `
                        SELECT COUNT(*) AS pendingLeaves
                        FROM leaves_table
                        WHERE status='Pending'
                        `,
                        (err, leaves) => {

                            if (err)
                                return res.status(500).json(err);

                            stats.pendingLeaves =
                                leaves[0].pendingLeaves;

                            db.query(
                                `
                                SELECT COUNT(*) AS openTasks
                                FROM tasks
                                WHERE status!='Completed'
                                `,
                                (err, tasks) => {

                                    if (err)
                                        return res.status(500).json(err);

                                    stats.openTasks =
                                        tasks[0].openTasks;

                                    db.query(
                                        `
                                        SELECT COUNT(*) AS completedTasks
                                        FROM tasks
                                        WHERE status='Completed'
                                        `,
                                        (err, completed) => {

                                            if (err)
                                                return res.status(500).json(err);

                                            stats.completedTasks =
                                                completed[0].completedTasks;

                                            res.json(stats);

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


const getEmployeeDashboard = (req, res) => {

    const employeeId = req.params.employeeId;

    const sql = `
    SELECT

    (
        SELECT IFNULL(
            ROUND(SUM(working_hours),2),
            0
        )
        FROM attendance
        WHERE employee_id = ?
    ) AS workingHours,

    (
        SELECT COUNT(*)
        FROM tasks
        WHERE assigned_to = ?
    ) AS assignedTasks,

    (
        SELECT COUNT(*)
        FROM tasks
        WHERE assigned_to = ?
        AND status != 'Completed'
    ) AS pendingTasks,

    (
        SELECT COUNT(*)
        FROM leaves_table
        WHERE employee_id = ?
        AND status = 'Approved'
    ) AS approvedLeaves,

    (
        SELECT COUNT(*)
        FROM daily_reports
        WHERE employee_id = ?
        AND report_date = CURDATE()
    ) AS reportSubmitted,

    (
        SELECT login_time
        FROM attendance
        WHERE employee_id = ?
        AND attendance_date = CURDATE()
        LIMIT 1
    ) AS todayLogin
    `;

    db.query(
        sql,
        [
            employeeId,
            employeeId,
            employeeId,
            employeeId,
            employeeId,
            employeeId
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );
};

module.exports = {
    getDashboardStats,getEmployeeDashboard
};