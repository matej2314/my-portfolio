const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(express.json());

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM projects ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
        }
        
        if (rows.length === 0) {
            console.log('Błąd 400 endpoint projects');
            return res.status(404).json({ message: 'Brak projektów w bazie danych' });
        }

        return res.status(200).json({
            projects: rows,
        })
   })
});

router.post('/new', (req, res) => {

    const projectId = uuidv4();
    const projectName = req.body.projectName;
    const projectCat = req.body.projectCat;
    const projectURL = req.body.prURL;
    const projectScrName = req.body.prScrName;

    if (!projectId || projectName === '' || projectCat === '' || projectURL ==='' || projectScrName === '')
        {
        logger.error('Brak wymaganych danych do dodania projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do dodania projektu' });
    }

    const query = 'INSERT INTO projects (id, project_name, project_category, project_URL, project_screenName) VALUES(?,? ,? ,? ,?)';

    pool.query(query, [projectId, projectName, projectCat, projectURL, projectScrName], (error, result) => {
        if (error) {
            logger.error('Nie udało się zapisać nowego projektu', error.stack);
            return res.status(500).json({ message: 'Nie udało się zapisać nowego projektu' });
        }

        return res.status(201).json({
            message: 'Nowy projekt dodany pomyślnie!',
            projectId,
            projectName,
            projectCat,
            projectURL,
            projectScrName
        })
    })
});

router.delete('/delete', (req, res) => {
    const projectId = req.body.projectId;
    const projectName = req.body.projectName;

    if (!projectId || projectId === 0 || projectName === '') {
        logger.error('Brak wymaganych danych do usunięcia projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do usunięcia projektu' });
    }

    const query = 'DELETE FROM projects WHERE id=? AND project_name=?';

    pool.query(query, [projectId, projectName], (error, result) => {
        if (error) {
            logger.error('Nie udało się usunąć projektu:', error.message);

            return res.status(500).json({ message: 'Nie udało się usunąć projektu' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Nie znaleziono projektu do usunięcia' });
        }

        return res.status(200).json({
            message: 'Projekt usunięty pomyślnie',
            projectId,
        });
    })
});

router.put('/update', (req, res) => {
    const projectId = req.body.projectId;
    const projectName = req.body.projectName;
    const projectCat = req.body.projectCat;
    const projectURL = req.body.projectURL;
    const projectScr = req.body.projectScr;


    if (!projectId || projectName=== '' || !projectCat || projectURL === '' || projectScr === '') {
        logger.error('Brak wymaganych danych do aktualizacji projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do aktualizacji projektu' });
    }

    const query = 'UPDATE projects SET project_name=?, project_category=?, project_URL=?, project_screenName=? WHERE id=?';

    pool.query(query, [projectName, projectCat, projectURL, projectScr, projectId], (error, result) => {
        if (error) {
            logger.error('Nie udało się zaktualizować projektu', error.message);
            return res.status(400).json({ message: 'Nie udało się zaktualizować projektu' });
        };

        return res.status(200).json({
            message: 'Projekt poprawnie zaktualizowany',
            projectId,
            projectName,
            projectURL
        });
    });
});

module.exports = router;