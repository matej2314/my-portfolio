const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../configs/logger.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

router.post('/', (req, res) => {
    const folder = req.body.folder;

    if (!folder || folder == '') {
        logger.error('Brak folderu do wylistowania');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Brak folderu do wylistowania'
        });
    };

    const folderPath = path.join(__dirname, `../projects-photos/${folder}/gallery`)

    if (!fs.existsSync(folderPath)) {
        logger.error('Folder nie istnieje');
        return res.status(statusCode.NOT_FOUND).json({
            message: 'Podany folder nie istnieje.'
        })
    };

    try {
        const files = fs.readdirSync(folderPath);
        return res.status(statusCode.OK).json({
            message: 'Lista plików pobrana poprawnie',
            photos: files,
        });
    } catch (error) {
        logger.error('Błąd odczytu plików:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Błąd odczytu plików'
        })
    }
});

module.exports = router;