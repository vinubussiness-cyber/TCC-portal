const db = require("../config/db");

const applyLeave = (req, res) => {

    const {
        employee_id,
        leave_type,
        reason,
        start_date,
        end_date
    } = req.body;

    const sql = `
    INSERT INTO leaves_table
    (
        employee_id,
        leave_type,
        reason,
        start_date,
        end_date
    )
    VALUES
    (
        ?,?,?,?,?
    )
    `;

    db.query(
        sql,
        [
            employee_id,
            leave_type,
            reason,
            start_date,
            end_date
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Leave Applied Successfully"
            });

        }
    );
};

const getLeaves = (req, res) => {

    const sql = `
    SELECT
        lt.id,
        u.name,
        lt.leave_type,
        lt.start_date,
        lt.end_date,
        lt.reason,
        lt.status
    FROM leaves_table lt
    JOIN users u
    ON lt.employee_id = u.id
    ORDER BY lt.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

const updateLeaveStatus = (req, res) => {

    const { id, status } = req.body;

    const sql = `
    UPDATE leaves_table
    SET status = ?
    WHERE id = ?
    `;

    db.query(
        sql,
        [status, id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: "Status Updated"
            });

        }
    );
};


const getEmployeeLeaves = (req, res) => {

    const employeeId = req.params.employeeId;

    const sql = `
    SELECT *
    FROM leaves_table
    WHERE employee_id = ?
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


module.exports = {
    applyLeave, getLeaves, updateLeaveStatus,getEmployeeLeaves
};