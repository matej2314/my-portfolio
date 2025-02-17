const logger = require('../configs/logger.js');
const transporter = require('../configs/nodemailer');
const emailData = require('../emaildata.js');

exports.sendEmail = async (req, res) => {
    const { userName, userEmail, subject, userMessage } = req.body;

    if (!userName || !userEmail || !subject || !userMessage) {
        logger.warn('Niekompletne dane wejściowe w formularzu kontaktowym');
        return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
    }

    try {
        logger.info(`Próba wysłania wiadomości od użytkownika: ${userName} (${userEmail})`);
        
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

        logger.info(`E-mail wysłany pomyślnie: ${info.messageId}`);
        res.status(200).json({ message: 'Wiadomość dostarczona', info });
    } catch (error) {
        logger.error('Nie udało się wysłać wiadomości', error);
        return res.status(500).json({ message: 'Nie udało się wysłać wiadomości', error });
    };
};