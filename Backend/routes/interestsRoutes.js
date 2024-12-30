const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');

router.get('/collection', async (req, res) => {
    const query = 'SELECT * FROM interests ORDER BY id';

    try {
        const [rows] = await pool.query(query);

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Brak zainteresowań w bazie danych.' });
        };

        return res.status(200).json({
            message: 'Zainteresowania pobrane poprawnie',
            interests: rows,
        });
    } catch (error) {
        logger.error('Nie udało się pobrać zainteresowań', error.message);
        return res.status(500).json({ message: 'Nie udało się pobrać zainteresowań.' })
    }
});

router.post('/new', verifyAdmin, async (req, res) => {
    const id = uuidv4();
    const interest = req.body.interest;

    if (!interest || interest.trim() === '' || interest.trim().length == 0) {
        return res.status(400).json({ message: 'Brak zainteresowania do dodania' });
    };

    const query = 'INSERT INTO interests (id, interest_name) VALUES(?,?)';

    try {
        await pool.query(query, [id, interest]);
        logger.info(`Zainteresowanie ${interest} dodane poprawnie`);
        return res.status(201).json({ message: `Zainteresowanie ${interest} dodane poprawnie` });
    } catch (error) {
        logger.error('Nie udało się dodać nowego zainteresowania');
        return res.status(500).json({ message: 'Nie udało się dodać nowego zainteresowania' });
    };
});

router.delete('/delete', verifyAdmin, async (req, res) => {
    const { id, interestName } = req.body;

    if (!id || id.length < 0 || !interestName || interestName.trim().length == 0 || interestName.trim() == '') {
        return res.status(400).json({ message: 'Podaj wszystkie dane do usunięcia zainteresowania' });
    };

    const query = 'DELETE FROM interests WHERE id=? AND interest_name=?';

    try {
        [result] = await pool.query(query, [id, interestName]);
        
        if (result.affectedRows === 0) {
            logger.error('Zainteresowanie nie znalezione');
            return res.status(404).json({ message: 'Zainteresowanie nie znalezione' });
        };
        logger.info(`Zainteresowanie ${interestName} usunięte.`)
        return res.status(200).json({ message: `Zainteresowanie ${interestName} usunięte.` });
    } catch (error) {
        logger.error('Nie udało się usunąć zainteresowania', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć zainteresowania' });
    };
});


module.exports = router;