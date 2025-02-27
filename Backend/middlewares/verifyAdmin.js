const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.SESSID;

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: 'Błąd uwierzytelniania'
        });
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(statusCode.FORBIDDEN).json({
                message: 'Dostęp zabroniony'
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        logger.error('Błąd uwierzytelniania', error.message);
        return res.status(statusCode.FORBIDDEN).json({
            message: 'Błąd uwierzytelniania'
        });
    }
};

module.exports = verifyAdmin;