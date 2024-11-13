const express = require('express');
const pool = require('../db.js');
const bodyParser = require('body-parser');
const router = express.Router();
const logger = require('../logger.js');
const { v4: uuidv4 } = require('uuid');

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM services ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            logger.error(error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Brak usług w bazie' });
        }

        return res.status(200).json({
            services: rows,
        });
    });
});

router.post('/new', (req, res) => {
    console.log(req.body);
    const id = uuidv4();
    const service_name = req.body.serviceName;
    const service_description = req.body.serviceDesc;

    
    if (!service_name || !service_description) {
        return res.status(400).json({ message: 'Brak wymaganych danych do dodania nowej usługi' });
    }

    
    const query = 'INSERT INTO services (id, serviceName, serviceDescription) VALUES (?, ?, ?)';

    
    pool.query(query, [id, service_name, service_description], (error, result) => {
        if (error) {
            logger.error('SERVICE POST ERROR:', error.stack);
            return res.status(500).json({ message: 'Nie udało się zapisać nowej usługi do bazy.' });
        }

        res.status(201).json({
            message: 'Nowa usługa dodana pomyślnie!',
            serviceId: id 
        });
    });
});

router.delete('/', (req, res) => {
    const serviceId = req.body.serviceId;

    if (!serviceId || serviceId === 0) {
        return res.status(400).json({ message: 'Brak wymaganych danych' });
    }

    const query = 'DELETE FROM services WHERE id=?';

    pool.query(query, [serviceId], (error, result) => {
        if (error) {
            logger.error('DELETE SERVICE ERROR:', error.message);
            return res.status(500).json({ message: 'Nie udało się usunąć usługi' });
        }

        return res.status(200).json({ message: 'Usługa usunięta pomyślnie!' });
    });
});

module.exports = router;
