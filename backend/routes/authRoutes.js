const express = require('express');
const { register, login, getUserProfile} = require('../controllers/authController');
const {verifyToken} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getUserProfile)


module.exports = router;
