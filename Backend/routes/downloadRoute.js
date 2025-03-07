const path = require('path');
const express = require('express');
const router = express.Router();
const logger = require('../configs/logger.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

router.get('/:version?', (req, res) => {
    const version = req.params.version;

    const engPath = path.join(__dirname, '../cv', 'CV - Mateusz Śliwowski_en.pdf');
    const plPath = path.join(__dirname, '../cv', 'CV - Mateusz Śliwowski.pdf');
    let filePath;

    switch (version) {
        case 'en':
            filePath = engPath;
            break;
        case 'pl':
            filePath = plPath;
            break;
        default:
            filePath = engPath;
            break;
    };

    res.download(filePath, (error) => {
        if (error) {
            logger.error('Nie udało się pobrać CV');
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'An error occured!' });
        }
    });
});

module.exports = router;