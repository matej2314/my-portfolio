const express = require('express');
const pool = require('../db');
const router = express.Router();
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());

router.post('/new', (req, res) => {
    const id = uuidv4();
    const skillName = req.body.skillName;
    const skillCat = req.body.skillCat;
    const skillIcon = req.body.icon;
    const iconColor = req.body.iconCol;
    const iconSet = req.body.iconSet;
    

    if (!skillName || skillName === '' || skillCat === '' || !skillCat || !skillIcon || !iconColor || !iconSet) {
        logger.error('Brak danych do dodania skilla');

        return res.status(400).json({ message: 'Brak danych do dodania nowego skilla' });
    };

    const query = 'INSERT into skills (id, skill_name, skill_cat, icon_name, icon_color, icon_set) VALUES (?, ?, ?, ?, ?,?)';

    pool.query(query, [id, skillName, skillCat, skillIcon, iconColor, iconSet], (error, result) => {
        if (error) {
            logger.error('Nie udało się dodać nowego skilla do bazy');
            return res.status(500).json({ message: 'Nie udało się dodać nowego skilla do bazy' });
        };

        res.status(201).json({
            message: 'Nowy skill dodany!',
            skillId: id,
        });
    });
});

router.get('/all', (req, res) => {

    const query = 'SELECT * FROM skills ORDER BY id';


    pool.query(query, (error, rows) => {
        if (error) {
            logger.error('Nie udało się pobrać skilli z bazy');
            return res.status(500).json({ message: 'Nie udało się pobrać skilli z bazy' });
        };

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Brak skilli w bazie' });
        };

        return res.status(200).json({
            message: 'Skille pobrane poprawnie',
            skills: rows,
        });
    });
});

router.delete('/delete', (req, res) => {
    const skillId = req.body.skillId;

    if (!skillId || skillId === 0) {
        logger.error('Brak danych do usunięcia skilla');
        return res.status(400).json({ message: 'Brak danych do usunięcia skilla' });
    };

    const query = 'DELETE FROM skills WHERE id=?';

    pool.query(query, [skillId], (error, result) => {
        if (error) {
            logger.error('Nie udało się usunąć skilla z bazy');
            return res.status(500).json({ message: 'Nie udało się usunąć skilla z bazy' });
        };

        return res.status(200).json({ message: 'Skill usunięty pomyślnie' });
    })
});

module.exports = router;