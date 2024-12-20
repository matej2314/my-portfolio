const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs/promises');
const pool = require('../db.js');
const logger = require('../logger.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');
const saveProject = require('../controllers/createStorage.js');
const updateProject = require('../controllers/updateStorage.js');
const createProjectFolders = require('../controllers/createProjectFolder.js');

router.use(express.json());

router.get('/collection', async (req, res) => {
	const query = 'SELECT * FROM projects ORDER BY id';

	try {
		const [rows] = await pool.query(query);

		if (rows.length <= 0) {
			logger.error('Brak projektów do pobrania');
			return res.status(404).json({ message: 'Brak projektów w bazie danych' });
		}

		return res.status(200).json({
			message: 'Projekty pobrano poprawnie',
			projects: rows,
		});
	} catch (error) {
		logger.error('Nie udało się pobrać projektów', error.message);
		return res.status(500).json({
			message: 'Nie udało się pobrać projektów',
		});
	}
});

router.post(
	'/new',
	createProjectFolders,
	saveProject.fields([
		{ name: 'mainImages', maxCount: 15 },
		{ name: 'galleryImages', maxCount: 25 },
	]),
	async (req, res) => {
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
	}
);

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
        }

        const projectFolderPath = path.join(__dirname, '..', 'projects-photos', projectId.toString());
        const mainFolderPath = `/${projectFolderPath}/main`;
        const galleryFolderPath = `/${projectFolderPath}/gallery`;

        try {
            // Usuń folder "projectId" jeśli istnieje
            await fs.rm(projectFolderPath, {recursive: true, force: true});
            logger.info(`Główny folder projektu ${projectId} usunięty.`);
        } catch (error) {
            logger.error(`Nie udało się usunąć głównego folderu projektu ${projectId}: ${error}`);
        }

        return res.status(200).json({ message: `Projekt ${projectName} usunięty.` });
    } catch (error) {
        logger.error('Nie udało się usunąć projektu', error);
        return res.status(500).json({ message: `Nie udało się usunąć projektu ${projectName}` });
    }
});


router.put(
	'/update/:projectId',  
	(req, res, next) => {
	  req.projectId = req.params.projectId;
	  next();
	},
	updateProject.fields([
	  { name: 'mainImages', maxCount: 15 },
	  { name: 'galleryImages', maxCount: 25 },
	]),
	async (req, res) => {
	  const projectId = req.projectId;
	  const { projectName, projectCat, projectURL, projectScr, goal, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate } = req.body;
  
	  // Walidacja danych
	  if (!projectId || !projectName || !projectCat || !projectURL || !goal || !projectDesc || !projectRepo || !projectLongTxt) {
		logger.error('Brak wymaganych danych do aktualizacji projektu');
		return res.status(400).json({ message: 'Brak wymaganych danych do aktualizacji projektu' });
	  }
  
	  const mainImages = req.files?.mainImages || [];
	  let screenName;
	  if (mainImages.length > 0) {
		const firstFile = mainImages[0];
		const fileWithoutExtension = path.parse(firstFile.filename).name;
		screenName = fileWithoutExtension.replace(/-.+$/, '');
	  } else if (projectScr) {
		screenName = projectScr;
	  } else {
		logger.error('Brak danych dla `screenName`');
		return res.status(400).json({ message: 'Brak danych dla `screenName`' });
	  }
  
	  const query = `
		UPDATE projects 
		SET 
			project_name = ?, 
			project_category = ?, 
			project_URL = ?, 
			project_screenName = ?, 
			goal = ?, 
			project_description = ?, 
			repo = ?, 
			technologies = ?, 
			long_text = ?, 
			difficulty = ?, 
			end_date = ? 
		WHERE id = ?
	  `;
  
	  try {
		const [result] = await pool.query(query, [projectName, projectCat, projectURL, screenName, goal, projectDesc, projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate, projectId]);
  
		if (result.affectedRows === 0) {
		  logger.warn(`Nie znaleziono projektu o ID ${projectId}`);
		  return res.status(404).json({ message: 'Projekt o podanym ID nie istnieje' });
		}
  
		logger.info(`Projekt ${projectName} (ID: ${projectId}) został zaktualizowany`);
		return res.status(200).json({
		  message: `Projekt ${projectName} poprawnie zaktualizowany`,
		  projectId: projectId,
		  projectName: projectName,
		});
	  } catch (error) {
		logger.error(`Nie udało się zaktualizować projektu ${projectId}: ${error.message}`);
		return res.status(500).json({ message: 'Nie udało się zaktualizować projektu', error: error.message });
	  }
	}
  );

module.exports = router;
