const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(bodyParser.json());

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM projects ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        
        if (rows.length === 0) {
            console.log('Błąd 400 endpoint projects');
            return res.status(400).json({ message: 'Brak projektów w bazie danych' });
        }

        return res.status(200).json({
            projects: rows,
        })
   })
});

module.exports = router;