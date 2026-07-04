const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
    {
        employeeId: String,

        salary: Number,

        bonus: Number,

        deductions: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Payroll",
    payrollSchema
);