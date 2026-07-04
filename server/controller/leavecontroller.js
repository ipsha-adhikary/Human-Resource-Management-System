const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
    const leave = await Leave.create(req.body);

    res.json(leave);
};

const getLeaves = async (req, res) => {
    const leaves = await Leave.find();

    res.json(leaves);
};

module.exports = {
    applyLeave,
    getLeaves,
};