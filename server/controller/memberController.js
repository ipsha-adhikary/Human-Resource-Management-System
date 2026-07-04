const User = require("../models/user");
const Attendance = require("../models/Attendance");

const getMembersDashboard = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        const presentMembers = await Attendance.countDocuments({
            status: "Present",
        });

        const absentMembers = await Attendance.countDocuments({
            status: "Absent",
        });

        const sickMembers = await Attendance.countDocuments({
            status: "Sick",
        });

        res.status(200).json({
            totalMembers: users.length,
            presentMembers,
            absentMembers,
            sickMembers,
            members: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getMembersDashboard,
};