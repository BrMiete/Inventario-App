const express = require("express");
const { register, login, refresh, logout } = require("../controllers/login.controller");
const router =  express.Router();

// router.get("/login/");
router.post("/register/", register);
router.post("/login/", login);
router.post("/refresh/", refresh);
router.delete("/logout/", logout);

module.exports = {
    oAuthRouter: router
}