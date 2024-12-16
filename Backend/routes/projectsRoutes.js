const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');
const upload = require('../controllers/multerConfig.js');
const createProjectFolder = require('../controllers/createProjectFolder.js');

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

router.post('/new', createProjectFolder, upload.fields([
    { name: 'mainImages', maxCount: 15 },  
    { name: 'galleryImages', maxCount: 25 },
]), async (req, res) => {
    const projectId = req.projectId;
    const { projectName, projectCat, prURL, description, repo, technologies, longText, projectDiff, endDate } = req.body;

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

    const query = 'INSERT INTO projects (id, project_name, project_category, project_URL, project_screenName, project_description, repo, technologies, long_text, difficulty, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        await pool.query(query, [projectId, projectName, projectCat, prURL, screenName, description, repo, technologies, longText, projectDiff, endDate]);
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
]), async (req, res) => {
    const { projectId, projectName, projectCat, projectURL, projectScr, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate } = req.body;

    if (!projectId || !projectName || !projectCat || !projectURL || !projectScr || !projectDesc || !projectRepo || !projectLongTxt) {
        logger.error('Brak wymaganych danych do aktualizacji projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do aktualizacji projektu' });
    }

    let screenName;
    if (req.files && req.files.mainImages) {
        // Przetwarzanie nowego głównego obrazu, jeśli został przesłany
        const firstFile = req.files.mainImages[0];
        const fileWithoutExtension = path.parse(firstFile.filename).name;
        screenName = fileWithoutExtension.replace(/-.+$/, '');
    } else {
        // Jeśli nie ma głównego obrazu, użyj poprzedniego screenName
        screenName = projectScr;
    }

    const query = 'UPDATE projects SET project_name=?, project_category=?, project_URL=?, project_screenName=?, project_description=?, repo=?, technologies=?, long_text=?, difficulty=?, end_date=? WHERE id=?';

    try {
        const [result] = await pool.query(query, [
            projectName, projectCat, projectURL, screenName, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate, projectId
        ]);

        // Jeśli nowe zdjęcia zostały przesłane, należy zaktualizować je w systemie plików
        if (req.files && req.files.mainImages) {
            const oldMainImagePath = path.join(__dirname, '../projects-photos', projectId, req.body.projectScr);
            if (fs.existsSync(oldMainImagePath)) {
                fs.unlinkSync(oldMainImagePath); // Usunięcie starego obrazu
            }
        }

        // Jeżeli nowe obrazy galerii zostały przesłane, zaktualizuj je
        if (req.files && req.files.galleryImages) {
            const galleryPath = path.join(__dirname, '../projects-photos', projectId.toString());

            // Usuwanie starych plików galerii
            const existingFiles = fs.readdirSync(galleryPath);
            existingFiles.forEach(file => fs.unlinkSync(path.join(galleryPath, file)));

            // Można dodać logikę, by zapisać nowe zdjęcia galerii (np. przesunięcie nowych plików)
            // Multer zapisuje pliki automatycznie w odpowiednich folderach.
        }

        logger.info(`Projekt ${projectName} edytowany`);
        return res.status(200).json({
            message: `Projekt ${projectName} poprawnie zaktualizowany`,
            projectId: projectId,
            projectName: projectName,
        });
    } catch (error) {
        logger.error('Nie udało się zaktualizować projektu', error.message);
        return res.status(500).json({ message: 'Nie udało się zaktualizować projektu' });
    };
});

module.exports = router;