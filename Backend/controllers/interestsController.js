const { v4: uuidv4 } = require('uuid');
const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const interestsQueries = require('../database/interestsQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.getAllInterests = async (req, res) => {
    try {
        const [rows] = await pool.query(interestsQueries.getAllInterests);

        if (rows.length <= 0) {
            return res.status(statusCode.NOT_FOUND).json({ message: 'Interests not found.' });
        };

        return res.status(statusCode.OK).json({
            message: 'Interests fetched correctly.',
            interests: rows,
        });
    } catch (error) {
        logger.error('Interest download error:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Interest download error.' })
    };
};

exports.addNewInterest = async (req, res) => {
    const id = uuidv4();
    const interest = req.body.interest;

    if (!interest || interest.trim() === '' || interest.trim().length == 0) {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter the correct interest data.' });
    };

    try {
        await pool.query(interestsQueries.addNewInterest, [id, interest]);
        logger.info(`Interest ${interest} added correctly.`);
        return res.status(statusCode.CREATED).json({ message: `Interest ${interest} added correctly.` });
    } catch (error) {
        logger.error('Failed to add new interest.');
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add new interest.' });
    };
};

exports.deleteInterest = async (req, res) => {
    const { id, interestName } = req.body;

    if (!id || id.length < 0 || !interestName || interestName.trim().length == 0 || interestName.trim() == '') {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter correct data.' });
    };

    try {
        [result] = await pool.query(interestsQueries.deleteInterest, [id, interestName]);

        if (result.affectedRows === 0) {
            logger.error('Interest not found.');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Interest not found.'
            });
        };
        logger.info(`Interest ${interestName} deleted correctly.`)
        return res.status(statusCode.OK).json({
            message: `Interest ${interestName} deleted correctly.`
        });
    } catch (error) {
        logger.error('Failed to delete interest.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to delete interest.'
        });
    };
};