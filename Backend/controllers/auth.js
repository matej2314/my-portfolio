const pool = require('../database/db.js');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const logger = require('../configs/logger.js');
const queries = require('../database/authQueries.js');
const { isValidPassword, isValidEmail, isValidUsername } = require('../utils/validation.js');
const jwtCookieOptions = require('../configs/jwtCookieOptions.js');

exports.registerUser = async (req, res) => {
    try {
        const { reg_username, reg_email, reg_password, role } = req.body;

        if (!reg_username || !reg_email || !reg_password || !role) {
            logger.error('Proszę podać wszystkie dane!');
            return res.status(400).json({ message: 'Proszę podać wszystkie dane!' });
        };

        const [checkEmail] = await pool.query(queries.registerEmailCheck, [reg_email]);

        if (checkEmail.length > 0) {
            return res.status(400).json({ message: 'Użytkownik o podanym adresie e-mail już istnieje.' });
        }

        if (!isValidUsername(reg_username)) {
            return res.status(400).json({ message: 'Podaj prawidłowe dane użytkownika.' });
        };

        if (!isValidEmail(reg_email)) {
            return res.status(400).json({ message: 'Podaj prawidłowe dane użytkownika.' });
        };

        if (!isValidPassword(reg_password)) {
            return res.status(400).json({ message: 'Podaj prawidłowe dane użytkownika.' });
        };

        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ message: 'Nieprawidłowa rola użytkownika!' });
        };

        if (role === 'admin') {
            const [rows] = await pool.query(queries.registerAdminCheck);
            
            if (rows.length > 0) {
                return res.status(400).json({ message: 'Konto administratora już istnieje!' })
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

            return res.status(200).json({ status: 200, message: 'Użytkownik zarejestrowany pomyślnie' });
            
         } catch (error) {
            logger.error('Błąd podczas rejestracji użytkownika:', error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
         }
        

    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({ message: 'Błąd rejestracji nowego użytkownika' })
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || email.trim() === '' || password.trim() === '') {
        logger.error('Podano nieprawidłowe dane logowania.');
        return res.status(400).json({ message: 'Podaj prawidłowe dane użytkownika.' });
    }

    try {
        
        const [rows] = await pool.query(queries.login, [email]);

        if (rows.length === 0) {
            logger.error('Nieprawidłowy adres e-mail.');
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            logger.error('Nieprawidłowe hasło.');
            return res.status(401).json({ message: 'Nieprawidłowy email lub hasło.' });
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

        return res.status(200).json({
            message: 'Użytkownik zalogowany pomyślnie.',
            status: 200,
            userName: user.name,
            role: user.role,
        });

    } catch (error) {
        logger.error(`Błąd podczas logowania użytkownika: ${error.message}`);
        return res.status(500).json({ message: 'Wewnętrzny błąd serwera.' });
    }
};

exports.logOut = (req, res) => {
    res.clearCookie('SESSID', {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({ message: 'Wylogowano pomyślnie' });
}
