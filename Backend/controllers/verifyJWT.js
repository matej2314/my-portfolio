const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: '../.env' });
const JWT_SECRET = process.env.JWT_SECRET;


const verifyJWT = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies.SESSID;

        if (!token) {
            return res.status(401).json({ message: 'Błąd uwierzytelniania' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.id;
            req.userRole = decoded.role;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Brak uprawnień' });
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Błąd uwierzytelniania' });
        };
    };
};

module.exports = verifyJWT;