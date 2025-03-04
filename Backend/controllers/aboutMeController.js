const { v4: uuidv4 } = require('uuid');
const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const queries = require('../database/aboutMeQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.getAllAbout = async (req, res) => {
    try {
        const [rows] = await pool.query(queries.getAllDescs);

        if (rows.length <= 0) {
            return res.status(statusCode.NOT_FOUND).json({ message: 'No descriptions.' });
        };

        return res.status(statusCode.OK).json({
            message: 'Description fetched correctly',
            aboutme: rows,
        })
    } catch (error) {
        logger.error('Failed to fetch descriptions.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    };
};

exports.addNewAbout = async (req, res) => {
    const id = uuidv4();
    const about = req.body.about;

    if (!about || about.trim().length < 0 || about.trim() === '') {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'No description data' });
    };

    try {
        await pool.query(queries.addNewDesc, [id, about]);
        logger.info('Description added correctly!');
        return res.status(statusCode.CREATED).json({
            message: 'Description added correctly.',
            id,
        })
    } catch (error) {
        logger.error('Failed to add description.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add description' });

    };
};

exports.updateAbout = async (req, res) => {
    const { id, about } = req.body;

    if (!id || !about || id < 0 || about.trim().length == 0 || about.trim() === '') {
        logger.error('Enter the correct data.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter the correct data.' });
    };

    try {
        const [result] = await pool.query(queries.updateDesc, [about]);
        logger.info('Description updated correctly.');
        return res.status(statusCode.OK).json({
            message: 'Description updated correctly.',
            id,
            about,
        });
    } catch (error) {
        logger.error('Failed to update description');
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update description.' });
    };
};

exports.deleteAbout = async (req, res) => {
    const id = req.body.id;

    if (!id || id <= 0) {
        logger.error('Enter correct description ID.');
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter correct data.' });
    };

    try {
        const [result] = await pool.query(queries.deleteDesc, [id]);


        if (result.affectedRows == 0) {
            logger.error('Description not found.');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Description not found.' });
        };

        return res.status(statusCode.OK).json({
            message: 'Description deleted correctly.',
            id,
        });

    } catch (error) {
        logger.error('Failed to delete description:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete description.' });
    };
};