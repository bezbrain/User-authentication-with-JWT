const express = require("express");
const router = express.Router();

const { createUser, dashboard } = require("../controllers/auth.controller");

router.post("/users", createUser);
router.get("/dashboard", dashboard);

module.exports = router;
