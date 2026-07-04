const express = require("express");

const router = express.Router();

const {
    addPayroll,
    getPayroll,
} = require("../controller/payrollcontroller");

router.post("/", addPayroll);

router.get("/", getPayroll);

module.exports = router;