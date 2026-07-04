const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },

        status: {
            type: String,
            enum: ["Present", "Absent", "Half-day", "Leave"],
            default: "Present",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);