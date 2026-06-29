const express = require("express");

const router = express.Router();

const {
    submitWorkUpdate,
    getTodayUpdates,
    getAllWorkUpdates
} = require("../controllers/workUpdateController");

router.post("/submit", submitWorkUpdate);

router.get("/today/:employeeId", getTodayUpdates);

router.get("/all", getAllWorkUpdates);

module.exports = router;