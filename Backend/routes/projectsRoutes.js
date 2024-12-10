const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');

router.use(express.json());

router.get('/collection', async (req, res) => {
    const query = 'SELECT * FROM projects ORDER BY id';

    try {
        const [rows] = await pool.query(query);

        if (rows.length <= 0) {
            logger.error('Brak projektów do pobrania');
            return res.status(404).json({ message: 'Brak projektów w bazie danych' });
        };

        return res.status(200).json({
            message: 'Projekty pobrano poprawnie',
            projects: rows
        });

    } catch (error) {
        logger.error('Nie udało się pobrać projektów', error.message);
        return res.status(500).json({
            message: 'Nie udało się pobrać projektów',
        });
    };
});

router.post('/new', async (req, res) => {

    const projectId = uuidv4();
    const projectName = req.body.projectName;
    const projectCat = req.body.projectCat;
    const projectURL = req.body.prURL;
    const projectScrName = req.body.prScrName;
    const projectDesc = req.body.description;
    const projectRepo = req.body.repo;
    const projectLong = req.body.longText;

    if (!projectId || projectName === '' || projectCat === '' || projectURL ==='' || projectScrName === '' || projectDesc === '')
        {
        logger.error('Brak wymaganych danych do dodania projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do dodania projektu' });
    };

    const query = 'INSERT INTO projects (id, project_name, project_category, project_URL, project_screenName, project_description, repo, long_text) VALUES(?,? ,? ,? ,?, ?, ?,?)';


    try {
        await pool.query(query, [projectId, projectName, projectCat, projectURL, projectScrName, projectDesc, projectRepo, projectLong]);
        logger.info(`Projekt ${projectName} dodany pomyślnie!`);
        return res.status(201).json({
            message: `Projekt ${projectName} dodany pomyślnie!`,
            projectId,
            projectName,
        });
    } catch (error) {
        logger.error('Nie udało się dodać projektu', error.message);
        return res.status(500).json({ message: `Nie udało się dodać projektu ${projectName}`});
}
});

router.delete('/delete', async (req, res) => {
    const { projectId, projectName } = req.body;

    if (!projectId || projectId <= 0 || projectName === '') {
        logger.error('Brak wymaganych danych do usunięcia projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do usunięcia projektu' });
    }

    const query = 'DELETE FROM projects WHERE id=? AND project_name=?';

    try {
        const [result] = await pool.query(query, [projectId, projectName]);
       
        if (result.affectedRows == 0) {
            logger.info('Projekt nie znaleziony');
            return res.status(404).json({ message: 'Nie znaleziono projektu do usunięcia' });
        };

        return res.status(200).json({ message: `Projekt ${projectName} usunięty` });
    } catch (error) {
        logger.error('Nie udało się usunąć projektu', error.message);
        return res.status(500).json({ message: `Nie udało się usunąć projektu ${projectName}` });
    };


});

router.put('/update', async (req, res) => {

    const { projectId, projectName, projectCat, projectURL, projectScr, projectDesc, projectRepo, projectLongTxt } = req.body;

    if (!projectId || !projectName || !projectCat || !projectURL || !projectScr || !projectDesc || !projectRepo || !projectLongTxt) {
        logger.error('Brak wymaganych danych do aktualizacji projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do aktualizacji projektu' });
    }
    

    const query = 'UPDATE projects SET project_name=?, project_category=?, project_URL=?, project_screenName=?, project_description=?, repo=?, long_text=? WHERE id=?';

    try {
        const [result] = await pool.query(query, [projectName, projectCat, projectURL, projectScr, projectDesc, projectRepo, projectLongTxt, projectId]);
        logger.info(`Projekt ${projectName} edytowany`);
        return res.status(200).json({
            message: `Projekt ${projectName} poprawnie zaktualizowany`,
            projectId: projectId,
            projectName: projectName,
        });

    } catch (error) {
        logger.error('Nie udało się zaktualizować projektu', error.message);
        return res.status(500).json({ message: 'Nie udało się zaktuwalizować projektu' });
    };
});

module.exports = router;