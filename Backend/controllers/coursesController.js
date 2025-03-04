const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const { v4: uuidv4 } = require('uuid');
const coursesQueries = require('../database/coursesQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.addNewCourse = async (req, res) => {
    const id = uuidv4();
    const { courseName, courseDate, organizer, courseCat } = req.body;

    if (!courseName || !courseDate || !organizer || !courseCat) {
        logger.error('No data about course.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'No data about course.' });
    }

    try {
        await pool.query(coursesQueries.addNewCourse, [id, courseName, courseDate, organizer, courseCat]);
        logger.info(`Course ${courseName} added correctly.`);
        return res.status(statusCode.CREATED).json({
            message: `Course ${courseName} added correctly.`,
            courseId: id,
        });
    } catch (error) {
        logger.error('Course addition error:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add course' });
    };
};

exports.getAllCourses = async (req, res) => {
    try {
        const [rows] = await pool.query(coursesQueries.getAllCourses);

        if (rows.length <= 0) {
            logger.info('Courses not found.');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Courses not found.' });
        }

        return res.status(statusCode.OK).json({
            message: 'Courses downloaded correctly.',
            courses: rows,
        });
    } catch (error) {
        logger.error('Failed to fetch courses:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch courses.' });
    };
};

exports.deleteCourse = async (req, res) => {
    const { courseId } = req.body;

    if (!courseId || courseId < 0) {
        logger.error('Enter correct course data.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter correct course data.' });
    }

    try {
        const [result] = await pool.query(coursesQueries.deleteCourse, [courseId]);

        if (result.affectedRows === 0) {
            logger.info('Course not found.');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Course not found.' });
        }

        return res.status(statusCode.OK).json({
            message: 'Course deleted correctly.',
            courseId: courseId,
        });
    } catch (error) {
        logger.error('Failed to delete course:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete course.' });
    };
};