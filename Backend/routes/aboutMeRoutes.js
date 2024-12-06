const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');

router.get('/collection', async (req, res) => {
    
    const query = 'SELECT * from about_me ORDER BY id';

    try {
        const [rows] = await pool.query(query);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Brak opisów.' });
        };

        return res.status(200).json({
            message: 'Opis pobrany poprawnie.',
            aboutme: rows,
        })
    } catch (error) {
        logger.error('Nie udało się pobrać opisów omnie', error.message);
        return res.status(500).json({ message: 'Błąd serwera' });
    };
});

router.post('/new', async (req, res) => {
    const id = uuidv4();
    const about = req.body.about;

    if (!about || about.trim().length < 0 || about.trim() === '') {
        return res.status(400).json({ message: 'Brak danych o opisie' });
    };

    const query = 'INSERT INTO about_me (id, about_text) VALUES(?,?)';

    try {
        await pool.query(query, [id, about]);
        logger.info('Opis dodany pomyślnie!');
        return res.status(201).json({
            message: 'Opis dodany pomyślnie!',
            id,
        })
    } catch (error) {
        logger.error('Nie udało się dodać opisu.', error.message);
        return res.status(500).json({ message: 'Nie udało się dodać opisu.' });
    
    };
});

router.delete('/delete', async (req, res) => {
    const id = req.body.id;

    if (!id || id <= 0) {
        logger.error('Podaj prawidłowe id opisu');
        return res.status(400).json({ message: 'Podaj prawidłowe dane do usunięcia opisu' });
    };

    const query = 'DELETE FROM about_me WHERE id=?';

    try {
        const [result] = await pool.query(query, [id]);
        

        if (result.affectedRows == 0) {
            logger.error('Opis nie znaleziony');
            return res.status(404).json({ message: 'Opis nie znaleziony' });
        };

        return res.status(200).json({
            message: 'Opis usunięty poprawnie',
            id,
        });
        
    } catch (error) {
        logger.error('Nie udało się usunąć opisu:', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć opisu' });
    };
});

router.put('/update', async (req, res) => {
    const { id, about } = req.body;

    if (!id || !about || id < 0 || about.trim().length == 0 || about.trim() === '') {
        logger.error('Podaj prawidłowe dane do usunięcia opisu');
        return res.status(400).json({ message: 'Podaj prawidłowe dane do usunięcia opisu' });
    };

    const query = 'UPDATE about_me SET about_text=?';

    try {
        const [result] = await pool.query(query, [about]);
        logger.info('Opis zaktualizowany pomyślnie.');
        return res.status(200).json({
            message: 'Opis zaktualizowany pomyślnie',
            id,
            about,
        });
    } catch (error) {
        logger.error('Nie udało się zaktualizować opisu');
        return res.status(500).json({ message: 'Nie udało się zaktualizować opisu' });
    };
});



module.exports = router;