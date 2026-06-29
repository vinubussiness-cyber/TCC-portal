const db = require("../config/db");

const submitReport = (req, res) => {

    const {
        employee_id,
        task_completed,
        hours_worked,
        challenges,
        tomorrow_plan
    } = req.body;

    const sql = `
    INSERT INTO daily_reports
    (
        employee_id,
        task_completed,
        hours_worked,
        challenges,
        tomorrow_plan,
        report_date
    )
    VALUES
    (
        ?,?,?,?,?,CURDATE()
    )
    `;

    db.query(
        sql,
        [
            employee_id,
            task_completed,
            hours_worked,
            challenges,
            tomorrow_plan
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Report Submitted"
            });

        }
    );

};



const getAllReports = (req, res) => {

    let sql = `
    SELECT
        dr.id,
        u.name,
        dr.report_date,
        dr.task_completed,
        dr.hours_worked,
        dr.challenges,
        dr.tomorrow_plan
    FROM daily_reports dr
    JOIN users u
    ON u.id = dr.employee_id
    `;

    const params = [];

    if (req.query.date) {
        sql += " WHERE dr.report_date = ?";
        params.push(req.query.date);
    }

    sql += " ORDER BY dr.report_date DESC";

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });

};


module.exports = {
    submitReport,getAllReports
};