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
			logger.error('Required data not found.');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Required data not found.'
			});
		}

		if (!req.files.mainImages) {
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Main image not found.'
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
			logger.info(`Project ${projectName} added correctly!`);

			return res.status(statusCode.CREATED).json({
				message: `Project ${projectName} added correctly!`,
				projectId: projectId,
			});
		} catch (error) {
			logger.error('Failed to add project:', error);
			return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: `Failed to add project ${projectName}`
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
			logger.error('Required data not found.');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'Required data not found.'
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
			logger.error('No data for `screenName`');
			return res.status(statusCode.BAD_REQUEST).json({
				message: 'No data for `screenName`'
			});
		}

		try {
			const [result] = await pool.query(projectsQueries.updateProject,
				[projectName, projectCat, projectURL, screenName, goal, projectDesc, projectRepo, technologies,
					projectLongTxt, projectDiff, projectEndDate, projectId]);

			if (result.affectedRows === 0) {
				logger.warn(`Project with ID ${projectId} not found`);
				return res.status(statusCode.NOT_FOUND).json({ message: 'Project with entered ID does not exist.' });
			}

			logger.info(`Project ${projectName} (ID: ${projectId}) updated correctly.`);
			return res.status(statusCode.OK).json({
				message: `Project ${projectName} updated correctly.`,
				projectId: projectId,
				projectName: projectName,
			});
		} catch (error) {
			logger.error(`Failed to update the project ${projectId}: ${error.message}`);
			return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
				message: 'Failed to update the project.',
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
