const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const { v4: uuidv4 } = require('uuid');
const coursesQueries = require('../database/coursesQueries.js');

exports.addNewCourse = async (req, res) => {
    const id = uuidv4();
    const { courseName, courseDate, organizer, courseCat } = req.body;

    if (!courseName || !courseDate || !organizer || !courseCat) {
        logger.error('Brak danych do dodania kursu');
        return res.status(400).json({ message: 'Brak danych do dodania kursu' });
    }

    try {
        await pool.query(coursesQueries.addNewCourse, [id, courseName, courseDate, organizer, courseCat]);
        logger.info(`Kurs ${courseName} dodany pomyślnie`);
        return res.status(201).json({
            message: `Kurs ${courseName} dodany`,
            courseId: id,
        });
    } catch (error) {
        logger.error('Nie udało się dodać kursu', error.message);
        return res.status(500).json({ message: 'Nie udało się dodać kursu' });
    };
};

exports.getAllCourses = async (req, res) => {
    try {
        const [rows] = await pool.query(coursesQueries.getAllCourses);
            
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
    };
};

exports.deleteCourse = async (req, res) => {
    const { courseId } = req.body;

    if (!courseId || courseId < 0) {
        logger.error('Podaj dane wymagane do usunięcia kursu');
        return res.status(400).json({ message: 'Podaj dane wymagane do usunięcia kursu' });
    }

    try {
        const [result] = await pool.query(coursesQueries.deleteCourse, [courseId]);
        
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
    };
};