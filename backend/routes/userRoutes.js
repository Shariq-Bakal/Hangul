const express = require("express");
const { Signup } = require("../controllers/userController");
const router = express.Router();

// Sign up route
router.post("/signup", Signup)

// login route
router.post("/login");

module.exports = router;