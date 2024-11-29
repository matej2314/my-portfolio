const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const verifyJWT = require('../controllers/verifyJWT');
const verifyAdmin = require('../controllers/verifyAdmin');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;