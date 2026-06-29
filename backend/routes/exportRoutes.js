const express = require("express");
const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
    exportAttendance
} = require("../controllers/exportController");

router.get(
    "/attendance",
    verifyToken,
    exportAttendance
);

module.exports = router;