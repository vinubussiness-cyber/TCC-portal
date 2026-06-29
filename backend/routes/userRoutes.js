const express = require("express");
const router = express.Router();

const {
    getEmployees,getEmployeeDetails
} = require("../controllers/userController");

router.get(
    "/employees",
    getEmployees
);

router.get("/employee/:id",getEmployeeDetails);

module.exports = router;