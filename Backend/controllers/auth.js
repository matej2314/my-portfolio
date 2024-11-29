const dotenv = require('dotenv').config({ path: '../../../.env' });
const path = require('path');
const pool = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const JWT_SECRET = process.env.JWT_SECRET;
const logger = require('../logger');

function isValidPassword(password) {
	// Minimum 8 znaków, przynajmniej jedna mała litera, jedna duża litera, jedna cyfra i jeden ze znaków specjalnych *!#^%$@?
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*!#^%$@?])[a-zA-Z\d*!#^%$@?]{10,30}$/;
	return regex.test(password);
}

// Funkcja walidująca e-mail
function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

// Funkcja walidująca nazwę użytkownika (alfanumeryczna, minimum 5 znaków)
function isValidUsername(username) {
	const regex = /^[a-zA-Z0-9]{5,}$/;
	return regex.test(username);
}

const jwtCookieOptions = {
	httpOnly: true,
    secure: false,
    sameSite: "lax",
	maxAge: 86400000,
};

exports.registerUser = async (req, res) => {
    try {
        const { reg_username, reg_email, reg_password, role } = req.body;

        if (!reg_username || !reg_email || !reg_password || !role) {
            logger.error('Proszę podać wszystkie dane!');
            return res.status(400).json({ message: 'Proszę podać wszystkie dane!' });
        };

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
            const [rows] = await pool.query('SELECT * FROM users WHERE role = "admin" LIMIT 1');
            
            if (rows.length > 0) {
                return res.status(400).json({ message: 'Konto administratora już istnieje!' })
            }
        }
        const hashedPassword = await bcrypt.hash(reg_password, 10);
        const userId = uuidv4();

        try {
            await pool.query('INSERT INTO users SET ?', { id: userId, role, name: reg_username, password: hashedPassword, email: reg_email });
            const token = jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie('SESSID', token, jwtCookieOptions);
            return res.status(200).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
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

    const query = 'SELECT * FROM users WHERE email = ?';

    try {
        
        const [rows] = await pool.query(query, [email]);

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
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '2h' }
        );

        
        res.cookie('SESSID', token, jwtCookieOptions);

        logger.info(`Użytkownik ${user.email} zalogowany pomyślnie.`);

    
        return res.status(200).json({
            message: 'Użytkownik zalogowany pomyślnie.',
            userName: user.name,
            role: user.role,
        });

    } catch (error) {
        logger.error(`Błąd podczas logowania użytkownika: ${error.message}`);
        return res.status(500).json({ message: 'Wewnętrzny błąd serwera.' });
    }
};
