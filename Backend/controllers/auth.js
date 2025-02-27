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

            logger.error('Podaj prawidłowe dane użytkownika.');
            return res.status(statusCode.BAD_REQUEST).json({ message: 'Podaj prawidłowe dane użytkownika.' });
        }

        const [checkEmail] = await pool.query(queries.registerEmailCheck, [reg_email]);

        if (checkEmail.length > 0) {
            return res.status(statusCode.BAD_REQUEST).json({ message: 'Użytkownik o podanym adresie e-mail już istnieje.' });
        }

        if (role === 'admin') {
            const [rows] = await pool.query(queries.registerAdminCheck);

            if (rows.length > 0) {
                return res.status(statusCode.BAD_REQUEST).json({ message: 'Konto administratora już istnieje!' })
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
                message: 'Użytkownik zarejestrowany pomyślnie'
            });

        } catch (error) {
            logger.error('Błąd podczas rejestracji użytkownika:', error.message);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Błąd serwera' });
        }


    } catch (error) {
        logger.error(error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Błąd rejestracji nowego użytkownika' })
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
        logger.error('Podano nieprawidłowe dane logowania.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Podaj prawidłowe dane użytkownika.' });
    }

    try {

        const [rows] = await pool.query(queries.login, [email]);

        if (rows.length === 0) {
            logger.error('Nieprawidłowy adres e-mail.');
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Nieprawidłowy email lub hasło.' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            logger.error('Nieprawidłowe hasło.');
            return res.status(statusCode.UNAUTHORIZED).json({ message: 'Nieprawidłowy email lub hasło.' });
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

        logger.info(`Użytkownik ${user.email} zalogowany pomyślnie.`);

        return res.status(statusCode.OK).json({
            message: 'Użytkownik zalogowany pomyślnie.',
            status: 200,
            userName: user.name,
            role: user.role,
        });

    } catch (error) {
        logger.error(`Błąd podczas logowania użytkownika: ${error.message}`);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Wewnętrzny błąd serwera.' });
    }
};

exports.logOut = (req, res) => {
    res.clearCookie('SESSID', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(statusCode.OK).json({ message: 'Wylogowano pomyślnie' });
}
