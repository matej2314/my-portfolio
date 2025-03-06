const express = require('express');
const router = express.Router();
const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const saveProject = require('../middlewares/createStorage.js');
const deleteFiles = require('../middlewares/deleteFilesInDir.js');
const createProjectFolders = require('../middlewares/createProjectFolder.js');
const projectsQueries = require('../database/projectsQueries.js');
const projectsController = require('../controllers/projectsController.js')
const { extractScreenName } = require('../utils/extractName.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

router.get('/collection', projectsController.getAllProjects);

router.post(
	'/new',
	verifyAdmin,
	createProjectFolders,
	saveProject.fields([
		{ name: 'mainImages', maxCount: 15 },
		{ name: 'galleryImages', maxCount: 25 },
	]),
	async (req, res) => {
		const projectId = req.projectId;
		const { projectName,
			projectCat,
			prURL,
			goal,
			description,
			repo,
			technologies,
			longText,
			projectDiff,
			endDate } = req.body;

		if (!projectName || !projectCat || !prURL || !description || !repo || !technologies || !projectDiff || !endDate) {
			logger.error('Brak wymaganych danych do dodania projektu');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Brak wymaganych danych do dodania projektu'
			});
		}

		if (!req.files.mainImages) {
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Brak głównego obrazu (mainImages)'
			});
		}

		const firstFile = req.files.mainImages[0];
		const screenName = extractScreenName(firstFile);

		try {
			await pool.query(projectsQueries.addNewProject,
				[projectId,
					projectName,
					goal,
					projectCat,
					prURL,
					screenName,
					description,
					repo,
					technologies,
					longText,
					projectDiff,
					endDate]);
			logger.info(`Projekt ${projectName} dodany pomyślnie!`);

			return res.status(statusCode.CREATED).json({
				message: `Projekt ${projectName} dodany pomyślnie!`,
				projectId: projectId,
			});
		} catch (error) {
			logger.error('Nie udało się dodać projektu', error);
			return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: `Nie udało się dodać projektu ${projectName}`
			});
		}
	}
);

router.put(
	'/update/:projectId/:images',
	verifyAdmin,
	(req, res, next) => {
		const images = req.params.images;

		if (images === 'true') {
			return deleteFiles(req, res, next);
		}
		next();
	},
	saveProject.fields([
		{ name: 'mainImages', maxCount: 15 },
		{ name: 'galleryImages', maxCount: 25 },
	]),
	async (req, res) => {
		const projectId = req.params.projectId || req.projectId;
		const { projectName, projectCat, projectURL, projectScr, goal, projectDesc,
			projectRepo, technologies, projectLongTxt, projectDiff, projectEndDate } = req.body;

		if (!projectId || !projectName || !projectCat || !projectURL || !goal || !projectDesc || !projectRepo || !projectLongTxt) {
			logger.error('Brak wymaganych danych do aktualizacji projektu');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Brak wymaganych danych do aktualizacji projektu'
			});
		}

		const mainImages = req.files?.mainImages || [];
		let screenName;
		if (mainImages.length > 0) {
			const firstFile = mainImages[0];
			screenName = extractScreenName(firstFile);
		} else if (projectScr) {
			screenName = projectScr;
		} else {
			logger.error('Brak danych dla `screenName`');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Brak danych dla `screenName`'
			});
		}

		try {
			const [result] = await pool.query(projectsQueries.updateProject,
				[projectName, projectCat, projectURL, screenName, goal, projectDesc, projectRepo, technologies,
					projectLongTxt, projectDiff, projectEndDate, projectId]);

			if (result.affectedRows === 0) {
				logger.warn(`Nie znaleziono projektu o ID ${projectId}`);
				return res.status(statusCode.NOT_FOUND).json({ message: 'Projekt o podanym ID nie istnieje' });
			}

			logger.info(`Projekt ${projectName} (ID: ${projectId}) został zaktualizowany`);
			return res.status(statusCode.OK).json({
				message: `Projekt ${projectName} poprawnie zaktualizowany`,
				projectId: projectId,
				projectName: projectName,
			});
		} catch (error) {
			logger.error(`Nie udało się zaktualizować projektu ${projectId}: ${error.message}`);
			return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: 'Nie udało się zaktualizować projektu',
				error: error.message
			});
		}
	}
);

router.delete('/delete/:projectId',
	verifyAdmin,
	deleteFiles,
	projectsController.deleteProject);

router.post('/photos', projectsController.photosList);

module.exports = router;
