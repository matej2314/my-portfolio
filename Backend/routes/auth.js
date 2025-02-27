const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyJWT = require('../middlewares/verifyJWT');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/verify', verifyJWT(), (req, res) => {
    res.status(statusCode.OK).json({
        userId: req.userId,
        userName: req.userName,
        role: req.role,
    });
});
router.get('/logout', authController.logOut);

module.exports = router;