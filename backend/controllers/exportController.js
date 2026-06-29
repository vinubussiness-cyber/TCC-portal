const ExcelJS = require("exceljs");
const db = require("../config/db");

const exportAttendance = async (req, res) => {

    const sql = `
    SELECT
        u.name,
        a.attendance_date,
        a.login_time,
        a.logout_time,
        a.working_hours
    FROM attendance a
    JOIN users u
    ON a.employee_id = u.id
    ORDER BY a.attendance_date DESC
    `;

    db.query(sql, async (err, result) => {

        if (err)
            return res.status(500).json(err);

        const workbook =
            new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet(
                "Attendance"
            );

        worksheet.columns = [

            {
                header: "Employee",
                key: "name",
                width: 25
            },

            {
                header: "Date",
                key: "attendance_date",
                width: 15
            },

            {
                header: "Login",
                key: "login_time",
                width: 20
            },

            {
                header: "Logout",
                key: "logout_time",
                width: 20
            },

            {
                header: "Hours",
                key: "working_hours",
                width: 15
            }

        ];

        result.forEach(row => {
            worksheet.addRow(row);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=attendance.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    });

};

module.exports = {
    exportAttendance
};