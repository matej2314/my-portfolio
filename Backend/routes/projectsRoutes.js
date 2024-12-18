const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');
const upload = require('../controllers/multerConfig.js');
const createProjectFolder = require('../controllers/createProjectFolder.js');
const deleteFilesInDir = require('../controllers/deleteFilesInDir.js');

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

router.post('/new',
    createProjectFolder,
    upload.fields([
    { name: 'mainImages', maxCount: 15 },  
    { name: 'galleryImages', maxCount: 25 },
]), async (req, res) => {
    const projectId = req.projectId;
    const { projectName, projectCat, prURL, goal, description, repo, technologies, longText, projectDiff, endDate } = req.body;

    if (!projectName || !projectCat || !prURL || !description || !repo || !technologies || !projectDiff || !endDate) {
        logger.error('Brak wymaganych danych do dodania projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do dodania projektu' });
    }

    if (!req.files.mainImages) {
        return res.status(400).json({ message: 'Brak głównego obrazu (mainImages)' });
    }

    const firstFile = req.files.mainImages[0];
    const fileWithoutExtension = path.parse(firstFile.filename).name;
    const screenName = fileWithoutExtension.replace(/-.+$/, '');

    const query = 'INSERT INTO projects (id, project_name, goal, project_category, project_URL, project_screenName, project_description, repo, technologies, long_text, difficulty, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        await pool.query(query, [projectId, projectName, goal, projectCat, prURL, screenName, description, repo, technologies, longText, projectDiff, endDate]);
        logger.info(`Projekt ${projectName} dodany pomyślnie!`);

        return res.status(201).json({
            message: `Projekt ${projectName} dodany pomyślnie!`,
            projectId: projectId,
        });
    } catch (error) {
        logger.error('Nie udało się dodać projektu', error);
        return res.status(500).json({ message: `Nie udało się dodać projektu ${projectName}` });
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

router.put('/update', upload.fields([
        { name: 'mainImages', maxCount: 15 },
        { name: 'galleryImages', maxCount: 25 },
    ]),
    async (req, res) => {
        const { projectId, projectName, projectCat, projectURL, projectScr, goal, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate } = req.body;
        const mainImages = req.files?.mainImages || [];

        if (!projectId || !projectName || !projectCat || !projectURL || !goal || !projectDesc || !projectRepo || !projectLongTxt) {
            logger.error('Brak wymaganych danych do aktualizacji projektu');
            return res.status(400).json({ message: 'Brak wymaganych danych do aktualizacji projektu' });
        }

        let screenName;
        if (req.files && mainImages.length > 0) {
            const firstFile = mainImages[0];
            const fileWithoutExtension = path.parse(firstFile.filename).name;
            screenName = fileWithoutExtension.replace(/-.+$/, '');
        } else {
            screenName = projectScr;
        }

        const query = 'UPDATE projects SET project_name=?, project_category=?, project_URL=?, project_screenName=?, goal=?, project_description=?, repo=?, technologies=?, long_text=?, difficulty=?, end_date=? WHERE id=?';

        try {
            const [result] = await pool.query(query, [
                projectName, projectCat, projectURL, screenName, goal, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate, projectId
            ]);

            logger.info(`Projekt ${projectName} edytowany`);
            return res.status(200).json({
                message: `Projekt ${projectName} poprawnie zaktualizowany`,
                projectId: projectId,
                projectName: projectName,
            });
        } catch (error) {
            logger.error('Nie udało się zaktualizować projektu', error);
            return res.status(500).json({ message: 'Nie udało się zaktualizować projektu' });
        }
    }
);

module.exports = router;