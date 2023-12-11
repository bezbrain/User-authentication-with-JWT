const express = require("express");
const router = express.Router();

const { createUser, dashboard } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

router.post("/users", createUser);
router.get("/dashboard", authMiddleware, dashboard);

module.exports = router;
