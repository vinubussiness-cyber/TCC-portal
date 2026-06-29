
const db = require("../config/db");

// Submit Work Update
const submitWorkUpdate = (req, res) => {

    const {
        employee_id,
        task_title,
        update_details,
        status
    } = req.body;

    const sql = `
        INSERT INTO work_updates
        (
            employee_id,
            task_title,
            update_details,
            status
        )
        VALUES (?,?,?,?)
    `;

    db.query(
        sql,
        [
            employee_id,
            task_title,
            update_details,
            status
        ],
        (err) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Work Update Submitted"
            });

        }
    );

};

// Employee Today's Updates
const getTodayUpdates = (req, res) => {

    const employeeId = req.params.employeeId;

    const sql = `
        SELECT *
        FROM work_updates
        WHERE employee_id = ?
        AND DATE(created_at)=CURDATE()
        ORDER BY created_at DESC
    `;

    db.query(sql, [employeeId], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Admin - All Updates
const getAllWorkUpdates = (req, res) => {

    let sql = `
        SELECT
            wu.id,
            u.name,
            wu.task_title,
            wu.update_details,
            wu.status,
            wu.created_at
        FROM work_updates wu
        JOIN users u
        ON u.id = wu.employee_id
    `;

    const params = [];

    if (req.query.date) {
        sql += " WHERE DATE(wu.created_at)=?";
        params.push(req.query.date);
    }

    sql += " ORDER BY wu.created_at DESC";

    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

module.exports = {
    submitWorkUpdate,
    getTodayUpdates,
    getAllWorkUpdates
};