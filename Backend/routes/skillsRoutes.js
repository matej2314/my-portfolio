const express = require('express');
const pool = require('../db');
const router = express.Router();
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());

router.post('/new', async (req, res) => {
    const id = uuidv4();
    const skillName = req.body.skillName;
    const skillCat = req.body.skillCat;
    const skillIcon = req.body.icon;
    const iconColor = req.body.iconColor;

    if (!skillName || skillName === '' || skillCat === '' || !skillCat || !skillIcon) {
        logger.error('Brak danych do dodania skilla');

        return res.status(400).json({ message: 'Brak danych do dodania nowego skilla' });
    };

    const query = 'INSERT into skills (id, skill_name, skill_cat, icon_name, icon_color) VALUES (?, ?, ?, ?, ?)';

    try {
        await pool.query(query, [id, skillName, skillCat, skillIcon, iconColor]);
        logger.info('Umiejętność dodana pomyślnie');
        return res.status(201).json({
            message: 'Umiejętność dodana pomyślnie',
            skillId: id,
            skillName,
        });
    } catch (error) {
        logger.error('Nie udało się dodać nowej umiejętności', error.message);
        return res.status(500).json({ message: 'Nie udało się dodać nowej umiejętności' });
    };
});

router.get('/collection', async (req, res) => {

    const query = 'SELECT * FROM skills ORDER BY id';

    try {
        const [rows] = await pool.query(query);

        if (rows.length === 0) {
            logger.info('Brak umiejętności w bazie danych');
            return res.status(404).json({ message: 'Brak umiejętności w bazie danych' });
        };

        return res.status(200).json({
            message: 'Umiejętności pobrane poprawnie',
            skills: rows,
        })
    } catch (error) {
        logger.error('Nie udało się pobrać umiejętności', error.message);
        return res.status(500).json({ message: 'Nie udało się pobrać umiejętności' });
    }
});

router.delete('/delete', async (req, res) => {
    const { skillId } = req.body;

    if (!skillId || skillId === 0) {
        logger.error('Brak danych do usunięcia skilla');
        return res.status(400).json({ message: 'Brak danych do usunięcia skilla' });
    };

    const query = 'DELETE FROM skills WHERE id=?';

    try {
        const [result] = await pool.query(query, [skillId]);

        if (result.affectedRows === 0) {
            logger.info('Umiejętność nie znaleziona');
            return res.status(404).json({ message: 'Umiejętność nie znaleziona' })
        }

        return res.status(200).json({
            message: 'Umiejętność usunięta poprawnie',
            skillId: skillId,
        })
    } catch (error) {
        logger.error('Nie udało się usunąć umiejętności');
        return res.status(500).json({ message: 'Nie udało się usunąć umiejętności' });
    };
});

module.exports = router;