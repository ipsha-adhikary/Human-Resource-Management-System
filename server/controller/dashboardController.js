const User = require("../models/user");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Payroll = require("../models/Payroll");

const getDashboardStats = async (req, res) => {
    try {
        const totalEmployees = await User.countDocuments();

        const totalAttendance =
            await Attendance.countDocuments({
                status: "Present",
            });

        const pendingLeaves =
            await Leave.countDocuments({
                status: "Pending",
            });

        const payrollRecords =
            await Payroll.countDocuments();

        res.status(200).json({
            totalEmployees,
            totalAttendance,
            pendingLeaves,
            payrollRecords,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getDashboardStats };