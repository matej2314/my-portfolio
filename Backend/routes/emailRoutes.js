const dotenv = require('dotenv').config({ path: '../.env' });
const express = require('express');
const logger = require('../logger');
const transporter = require('../controllers/nodemailer');
const router = express.Router();


router.post('/email', async (req, res) => {
    const { userName, userEmail, subject, userMessage } = req.body;

    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.DEL_MAIL,
            subject: subject,
            text: userMessage
        });
        res.status(200).json({ message: 'Wiadomość dostarczona', info });
    } catch (error) {
        logger.error('Nie udało się wysłać wiadomości', error.stack);
        return res.status(500).json({ message: 'Nie udało się wysłać wiadomości' });
    }
});

module.exports = router;