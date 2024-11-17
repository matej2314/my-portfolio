const express = require('express');
const pool = require('../db');
const router = express.Router();
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());

router.post('/new', (req, res) => {
    const id = uuidv4();
    const courseName = req.body.courseName;
    const courseDate = req.body.courseDate;
    const courseOrganizer = req.body.organizer;
    const courseCat = req.body.courseCat;


    if (!courseName || courseName === '' || !courseDate || !courseOrganizer || courseOrganizer === '' || !courseCat || courseCat === '') {
        logger.error('Brak danych do dodania kursu');
        return res.status(400).json({ message: 'Brak danych do dodania kursu' });
    };

    const query = 'INSERT INTO courses (id, course_name, course_date, course_organizer, course_category) VALUES (?, ?, ?, ?, ?)';

    pool.query(query, [id, courseName, courseDate, courseOrganizer, courseCat], (error, result) => {
        if (error) {
            logger.error('Nie udało się dodać kursu.');
            return res.status(500).json({ message: 'Nie udało się dodać kursu' });
        }

        return res.status(201).json({
            message: 'Kurs dodany',
            courseId: id,
        });

    });
});

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM courses ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            logger.error('Nie udało się pobrać kursów');
            return res.status(500).json({ message: 'Nie udało się pobrać kursów' });
        }
        
        if (rows.length <= 0) {
            logger.info('Brak kursów w bazie danych.');
            return res.status(404).json({ message: 'Brak kursów w bazie danych' });
        }

        return res.status(200).json({
            message: 'Kursy pobrano poprawnie',
            courses: rows,
        });
    });
});

router.delete('/delete', (req, res) => {
    courseId = req.body.courseId;

    if (!courseId || courseId < 0) {
        logger.error('Podaj dane wymagane do usunięcia kursu');
        return res.status(400).json({ message: 'Podaj dane wymagane do usunięcia kursu' });
    };

    const query = 'DELETE from courses WHERE id=?';

    pool.query(query, [courseId], (error, result) => {
        if (error) {
            logger.error('Nie udało się usunąć kursu');
            return res.status(500).json({ message: 'Nie udało się usunąć kursu' });
        };
        return res.status(200).json({ message: 'Kurs usunięty poprawnie' });

    });
});