const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyJWT = require('../middlewares/verifyJWT');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/verify', verifyJWT(), (req, res) => {
    res.status(200).json({
        userId: req.userId,
        userName: req.userName,
        role: req.role,
    });
});
router.get('/logout', authController.logOut);

module.exports = router;