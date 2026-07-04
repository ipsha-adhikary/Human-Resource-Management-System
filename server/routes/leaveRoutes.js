const express = require("express");

const router = express.Router();

const {
    applyLeave,
    getLeaves,
} = require("../controller/leavecontroller");

router.post("/", applyLeave);

router.get("/", getLeaves);

module.exports = router;