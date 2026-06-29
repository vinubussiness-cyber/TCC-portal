const express = require("express")
const cors = require("cors")
const db = require('./config/db')

const authRoutes = require('./routes/authRoutes')

const attendanceRoutes = require("./routes/attendanceRoutes")

const reportRoutes = require("./routes/reportRoutes");

const leaveRoutes = require("./routes/leavesRoutes")

const taskRoutes = require("./routes/taskRoutes");

const userRoutes = require("./routes/userRoutes")

const dashboardRoutes = require("./routes/dashboardRoutes")

const exportRoutes = require("./routes/exportRoutes")

const workUpdateRoutes = require("./routes/workUpdateRoutes");

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes)

app.use("/api/attendance",attendanceRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/leaves",leaveRoutes);

app.use("/api/tasks",taskRoutes);

app.use("/api/users",userRoutes)

app.use("/api/dashboard",dashboardRoutes)

app.use("/api/export",exportRoutes)

app.use("/api/work-updates",workUpdateRoutes);


db.query('SELECT 1', (err)=> {
    if(err){
        console.log('Database Error:', err);
    } else{
        console.log('MySQL Connected')
    }
})

app.get("/", (req,res)=> {
    res.send('Employee Portal Backend Running');
});

app.listen(5000,()=> {
    console.log("Server Running on Port 5000");
});