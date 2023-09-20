const express = require("express");
const { signup , login, logout } = require("../controllers/userController");
const router = express.Router();

// Sign up route
router.post("/signup", signup)

// login route
router.post("/login" , login);

//logout route
router.get("/logout" , logout)

module.exports = router;