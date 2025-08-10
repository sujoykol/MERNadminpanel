const express = require('express');
const router = express.Router();
const { login, refreshToken, changePassword, logout } = require('../controllers/authController');
const { verifyAccessToken } = require('../middleware/authMiddleware');

//const verifyAccessToken = require("../middlewares/authMiddleware");


router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.post('/change-password', verifyAccessToken, changePassword);
module.exports = router;
 