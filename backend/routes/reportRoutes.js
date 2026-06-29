const express = require("express");
const router = express.Router();

const {
  submitReport,
  getAllReports
} = require("../controllers/reportController");

router.post("/submit", submitReport);

router.get("/all",getAllReports);

module.exports = router;