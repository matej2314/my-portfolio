const dotenv = require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.SESSID;

    if (!token) {
        return res.status(401).json({ message: 'Błąd uwierzytelniania' });
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Dostęp zabroniony' });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        logger.error('Błąd uwierzytelniania', error.message);
        return res.status(403).json({ message: 'Błąd uwierzytelniania' });
    }
};

module.exports = verifyAdmin;