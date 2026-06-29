const express = require('express');
const router = express.Router();

const {
    loginAttendance,
    logoutAttendance,
    getAttendanceReport,
    getTodayAttendance
} = require("../controllers/attendanceController");


router.post("/login", loginAttendance);
router.post('/logout', logoutAttendance);
router.get('/report', getAttendanceReport)
router.get('/today/:employeeId',getTodayAttendance)

module.exports = router;
