const express = require("express");
const router = express.Router();



const {
    getDashboardStats,getEmployeeDashboard
} = require("../controllers/dashboardController");

const verifyToken =
require("../middleware/authMiddleware");


router.get(
    "/stats",
    verifyToken,
    getDashboardStats
);

router.get("/employee/:employeeId",getEmployeeDashboard)


module.exports = router;