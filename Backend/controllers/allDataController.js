const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const queries = require('../database/allDataQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.getAllData = async (req, res) => {
    try {
        const results = await Promise.all(queries.map(query => pool.query(query)));

        const allData = {
            posts: results[0][0],
            projects: results[1][0],
            services: results[2][0],
            skills: results[3][0],
            courses: results[4][0],
            about: results[5][0],
            interests: results[6][0],
        };

        if (Object.values(allData).every(arr => arr.length === 0)) {
            return res.status(204).json({ message: 'No data available.' });
        }

        logger.info('Data fetched correctly.');
        return res.status(200).json({ data: allData });
    } catch (error) {
        logger.error('Fetch error:', error.stack);
        return res.status(500).json({ message: 'Internal server error' });
    };
};