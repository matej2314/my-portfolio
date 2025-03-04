const pool = require('../database/db.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const logger = require('../configs/logger.js');
const queries = require('../database/authQueries.js');
const { isValidPassword, isValidEmail, isValidUsername } = require('../utils/validation.js');
const jwtCookieOptions = require('../configs/jwtCookieOptions.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.registerUser = async (req, res) => {
    try {
        const { reg_username, reg_email, reg_password, role } = req.body;

        if (!reg_username || !reg_email || !reg_password || !role ||
            !isValidUsername(reg_username) || !isValidEmail(reg_email) ||
            !isValidPassword(reg_password) || !['admin', 'user'].includes(role)) {

            logger.error('Enter the correct user data.');
            return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter the correct user data.' });
        }

        const [checkEmail] = await pool.query(queries.registerEmailCheck, [reg_email]);

        if (checkEmail.length > 0) {
            return res.status(statusCode.BAD_REQUEST).json({ message: 'User with specified e-mail address exists.' });
        }

        if (role === 'admin') {
            const [rows] = await pool.query(queries.registerAdminCheck);

            if (rows.length > 0) {
                return res.status(statusCode.BAD_REQUEST).json({ message: 'Admin account already exists!' })
            }
        }
        const hashedPassword = await bcrypt.hash(reg_password, 10);
        const userId = uuidv4();

        try {
            await pool.query(queries.register, { id: userId, role, name: reg_username, password: hashedPassword, email: reg_email });

            const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '1h' });

            res.cookie('SESSID', token, {
                ...jwtCookieOptions,
                maxAge: 60 * 60 * 1000,
            });

            return res.status(statusCode.OK).json({
                status: 200,
                message: 'User successfully registered.'
            });

        } catch (error) {
            logger.error('User registration error:', error.message);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }


    } catch (error) {
        logger.error(error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'User registration error.' })
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
        logger.error('Incorrect user data provided.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter the  correct user data.' });
    }

    try {

        const [rows] = await pool.query(queries.login, [email]);

        if (rows.length === 0) {
            logger.error('Incorrect e-mail address.');
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Incorrect e-mail address or password.' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            logger.error('Incorrect password.');
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Incorrect e-mail address or password.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, userName: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('SESSID', token, {
            ...jwtCookieOptions,
            maxAge: 86400000,
        });

        logger.info(`User ${user.email} logged in successfully.`);

        return res.status(statusCode.OK).json({
            message: 'User logged in successfully.',
            status: 200,
            userName: user.name,
            role: user.role,
        });

    } catch (error) {
        logger.error(`User login error: ${error.message}`);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
};

exports.logOut = (req, res) => {
    res.clearCookie('SESSID', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(statusCode.OK).json({ message: 'Logged out correctly.' });
}
