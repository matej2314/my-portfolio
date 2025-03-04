const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.SESSID;

    if (!token) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: 'Authentication error.'
        });
    };

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(statusCode.FORBIDDEN).json({
                message: 'Access denied.'
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        logger.error('Authentication error', error.message);
        return res.status(statusCode.FORBIDDEN).json({
            message: 'Authentication error.'
        });
    }
};

module.exports = verifyAdmin;