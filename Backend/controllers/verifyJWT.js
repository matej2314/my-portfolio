const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyJWT = (requiredRole) => {
    return (req, res, next) => {
        const token = req.cookies.SESSID;

        if (!token) {
            return res.status(401).json({ message: 'Zaloguj się, aby zobaczyć zasoby.' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.id;
            req.role = decoded.role;
            req.userName = decoded.userName;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Brak uprawnień' });
            };

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Zaloguj się, aby zobaczyć zasoby.' });
        };
    };
};

module.exports = verifyJWT;