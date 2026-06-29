const express = require("express");
const router = express.Router();

const {
    createTask,
    getEmployeeTasks,
    updateTaskStatus,getAllTasks
} = require("../controllers/taskController");

router.post("/create", createTask);

router.get("/employee/:employeeId",getEmployeeTasks);

router.put("/status",updateTaskStatus);

router.get("/all",getAllTasks);

module.exports = router;