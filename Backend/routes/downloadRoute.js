const path = require('path');
const express = require('express');
const pool = require('../database/db.js'); 
const router = express.Router();
const logger = require('../configs/logger.js');

router.get('/', (req, res) => {

    const filePath = path.join(__dirname, '../cv', 'CV - Mateusz Śliwowski.pdf');

    res.download(filePath, (error) => {
        if (error) {
            logger.error('Nie udało się pobrać CV');
            return res.status(500).json({ message: 'Nie udało się pobrać CV' });
        }
    });
});

module.exports = router;