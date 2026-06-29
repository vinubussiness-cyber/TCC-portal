const db = require("../config/db");

const loginAttendance = (req, res) => {

    const { employee_id } = req.body;

    const checkSql = `
    SELECT *
    FROM attendance
    WHERE employee_id = ?
    AND attendance_date = CURDATE()
    `;

    db.query(
        checkSql,
        [employee_id],
        (err, rows) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (rows.length > 0) {

                return res.json({
                    message:
                    "Attendance Already Started"
                });

            }

            const insertSql = `
            INSERT INTO attendance
            (
                employee_id,
                login_time,
                attendance_date
            )
            VALUES
            (
                ?,
                NOW(),
                CURDATE()
            )
            `;

            db.query(
                insertSql,
                [employee_id],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    res.json({
                        message:
                        "Attendance Started"
                    });

                }
            );

        }
    );
};

const logoutAttendance = (req, res) => {

  const { employee_id } = req.body;

  const sql = `
  UPDATE attendance
  SET
    logout_time = NOW(),
    working_hours =
      TIMESTAMPDIFF(
        MINUTE,
        login_time,
        NOW()
      ) / 60
  WHERE
    employee_id = ?
    AND attendance_date = CURDATE()
    AND logout_time IS NULL
  `;

  db.query(sql, [employee_id], (err) => {

    if (err)
      return res.status(500).json(err);

    res.json({
      message: "Attendance Closed"
    });

  });

};

const getAttendanceReport = (req, res) => {

    const sql = `
    SELECT
        a.id,
        u.name,
        a.login_time,
        a.logout_time,
        a.working_hours,
        a.attendance_date
    FROM attendance a
    JOIN users u
    ON a.employee_id = u.id
    ORDER BY a.attendance_date DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

const getTodayAttendance = (req, res) => {

    const employeeId = req.params.employeeId;

    const sql = `
    SELECT *
    FROM attendance
    WHERE employee_id = ?
    AND attendance_date = CURDATE()
    LIMIT 1
    `;

    db.query(
        sql,
        [employeeId],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.json(null);
            }

            res.json(result[0]);

        }
    );
};


module.exports = {
  loginAttendance,
  logoutAttendance,
  getAttendanceReport,
  getTodayAttendance
};