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
            return res.status(statusCode.NOT_FOUND).json({ message: 'Brak zainteresowań w bazie danych.' });
        };

        return res.status(statusCode.OK).json({
            message: 'Zainteresowania pobrane poprawnie',
            interests: rows,
        });
    } catch (error) {
        logger.error('Nie udało się pobrać zainteresowań', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Nie udało się pobrać zainteresowań.' })
    };
};

exports.addNewInterest = async (req, res) => {
    const id = uuidv4();
    const interest = req.body.interest;

    if (!interest || interest.trim() === '' || interest.trim().length == 0) {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Podaj zainteresowanie do dodania!' });
    };

    try {
        await pool.query(interestsQueries.addNewInterest, [id, interest]);
        logger.info(`Zainteresowanie ${interest} dodane poprawnie`);
        return res.status(statusCode.CREATED).json({ message: `Zainteresowanie ${interest} dodane poprawnie` });
    } catch (error) {
        logger.error('Nie udało się dodać nowego zainteresowania');
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Nie udało się dodać nowego zainteresowania' });
    };
};

exports.deleteInterest = async (req, res) => {
    const { id, interestName } = req.body;

    if (!id || id.length < 0 || !interestName || interestName.trim().length == 0 || interestName.trim() == '') {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Podaj wszystkie dane do usunięcia zainteresowania' });
    };

    try {
        [result] = await pool.query(interestsQueries.deleteInterest, [id, interestName]);

        if (result.affectedRows === 0) {
            logger.error('Zainteresowanie nie znalezione');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Zainteresowanie nie znalezione'
            });
        };
        logger.info(`Zainteresowanie ${interestName} usunięte.`)
        return res.status(statusCode.OK).json({
            message: `Zainteresowanie ${interestName} usunięte.`
        });
    } catch (error) {
        logger.error('Nie udało się usunąć zainteresowania', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Nie udało się usunąć zainteresowania'
        });
    };
};