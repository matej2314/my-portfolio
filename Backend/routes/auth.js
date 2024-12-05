const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyJWT = require('../controllers/verifyJWT');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/verify', verifyJWT(), (req, res) => {
    const user = req.user;
    const userRole = req.role;

    res.status(200).json({
        userName: req.userName,
        userRole: req.userRole,
    })
})

module.exports = router;