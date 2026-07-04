const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
    const attendance =
        await Attendance.create(req.body);

    res.json(attendance);
};

const getAttendance = async (req, res) => {
    const data = await Attendance.find();

    res.json(data);
};

module.exports = {
    markAttendance,
    getAttendance,
};