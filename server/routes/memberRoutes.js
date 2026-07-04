const express = require("express");

const router = express.Router();

const {
  getMembersDashboard,
} = require("../controller/memberController");

router.get("/", getMembersDashboard);

module.exports = router;
