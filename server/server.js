const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/attendance",
    require("./routes/attendanceRoutes")
);

app.use(
    "/api/leave",
    require("./routes/leaveRoutes")
);

app.use(
    "/api/payroll",
    require("./routes/payrollRoutes")
);

app.use(
    "/api/dashboard",
    require("./routes/dashboardRoutes")
);

app.get("/ping", (req, res) => {
    res.send("pong");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server is running on port ${PORT}`
    );
});