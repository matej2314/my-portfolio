const logger = require('../configs/logger.js');
const transporter = require('../configs/nodemailer');
const emailData = require('../emaildata.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.sendEmail = async (req, res) => {
    const { userName, userEmail, subject, userMessage } = req.body;

    if (!userName || !userEmail || !subject || !userMessage) {
        logger.warn('Incomplete input in contact form.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Each field is required.' });
    }

    try {
        logger.info(`Trying to send message: ${userName} (${userEmail})`);

        const emailText = `
            Wiadomość od użytkownika: ${userName}
            Adres e-mail nadawcy: ${userEmail}
            Temat: ${subject}
            Treść wiadomości:
            ${userMessage}
        `;

        const info = await transporter.sendMail({
            from: emailData.login,
            to: process.env.DEL_MAIL,
            subject: `Nowa wiadomość od ${userName}: ${subject}`,
            text: emailText
        });

        logger.info(`Email sent correctly:: ${info.messageId}`);
        res.status(statusCode.OK).json({ message: 'Message delivered.', info });
    } catch (error) {
        logger.error('Failed to send message:', error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to send message.', error });
    };
};