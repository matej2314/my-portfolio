const path = require('path');
const express = require('express');
const pool = require('../db.js');
const router = express.Router();
const logger = require('../logger.js');

router.get('/all', (req, res) => {
    
    const query = 'SELECT * FROM services ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
        }

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Brak usług w bazie' });
        }

        return res.status(200).json({
            services: rows,
        })
    });
});

module.exports = router;