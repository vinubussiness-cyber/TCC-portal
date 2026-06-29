const express = require("express");
const router = express.Router();

const {
    applyLeave,
    getLeaves,
    updateLeaveStatus,
    getEmployeeLeaves
} = require("../controllers/leaveController");

router.post("/apply", applyLeave);

router.get("/all",getLeaves);

router.put("/status", updateLeaveStatus);

router.get(
    "/employee/:employeeId",
    getEmployeeLeaves
)

module.exports = router;