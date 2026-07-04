const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        employeeId: String,

        leaveType: {
            type: String,
            enum: ["Paid", "Sick", "Unpaid"],
        },

        startDate: Date,
        endDate: Date,

        remarks: String,

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Leave",
    leaveSchema
);