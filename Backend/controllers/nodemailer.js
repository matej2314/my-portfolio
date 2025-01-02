const nodemailer = require('nodemailer');
const emailData = require('../emaildata.js');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: emailData.login,
        pass: emailData.pass,
    },
    
});

module.exports = transporter;