const express = require('express');
const pool = require('../db'); 
const router = express.Router();
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());


router.post('/new', async (req, res) => {
    const id = uuidv4();
    const { courseName, courseDate, organizer, courseCat } = req.body;

    if (!courseName || !courseDate || !organizer || !courseCat) {
        logger.error('Brak danych do dodania kursu');
        return res.status(400).json({ message: 'Brak danych do dodania kursu' });
    }

    const query = 'INSERT INTO courses (id, course_name, course_date, course_organizer, course_category) VALUES (?, ?, ?, ?, ?)';

    try {
        await pool.query(query, [id, courseName, courseDate, organizer, courseCat]);
        logger.info('Kurs dodany pomyślnie');
        return res.status(201).json({
            message: 'Kurs dodany',
            courseId: id,
        });
    } catch (error) {
        logger.error('Nie udało się dodać kursu', error.message);
        return res.status(500).json({ message: 'Nie udało się dodać kursu' });
    }
});


router.get('/collection', async (req, res) => {
    const query = 'SELECT * FROM courses ORDER BY id';

    try {
        const [rows] = await pool.query(query);
        
        if (rows.length <= 0) {
            logger.info('Brak kursów w bazie danych.');
            return res.status(404).json({ message: 'Brak kursów w bazie danych' });
        }

        return res.status(200).json({
            message: 'Kursy pobrano poprawnie',
            courses: rows,
        });
    } catch (error) {
        logger.error('Nie udało się pobrać kursów', error.message);
        return res.status(500).json({ message: 'Nie udało się pobrać kursów' });
    }
});


router.delete('/delete', async (req, res) => {
    const { courseId } = req.body;

    if (!courseId || courseId < 0) {
        logger.error('Podaj dane wymagane do usunięcia kursu');
        return res.status(400).json({ message: 'Podaj dane wymagane do usunięcia kursu' });
    }

    const query = 'DELETE from courses WHERE id=?';

    try {
        const [result] = await pool.query(query, [courseId]);
        
        if (result.affectedRows === 0) {
            logger.info('Kurs nie znaleziony');
            return res.status(404).json({ message: 'Kurs o podanym id nie istnieje' });
        }

        return res.status(200).json({
            message: 'Kurs usunięty poprawnie',
            courseId: courseId,
        });
    } catch (error) {
        logger.error('Nie udało się usunąć kursu', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć kursu' });
    }
});

module.exports = router;
