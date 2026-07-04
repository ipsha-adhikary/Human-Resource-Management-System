const Payroll = require("../models/Payroll");

const addPayroll = async (req, res) => {
    const payroll =
        await Payroll.create(req.body);

    res.json(payroll);
};

const getPayroll = async (req, res) => {
    const payroll = await Payroll.find();

    res.json(payroll);
};

module.exports = {
    addPayroll,
    getPayroll,
};