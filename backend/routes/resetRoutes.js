const express = require("express");
const router = express.Router();
const { resetDatabase } = require("../controllers/resetController");

router.post("/", resetDatabase);

module.exports = router;
