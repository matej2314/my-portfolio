const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../configs/logger.js');
const { getMainPhotosPath, getGalleryPhotosPath, getProjectFolder } = require('../utils/projectPaths.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

const createProjectFolders = (req, res, next) => {
	if (!req.projectId) {
		req.projectId = uuidv4();
	};
	const projectId = req.projectId;

	const projectFolder = getProjectFolder(projectId);
	const mainPhotosPath = getMainPhotosPath(projectId);
	const galleryPhotosPath = getGalleryPhotosPath(projectId);

	req.projecFolderPath = projectFolder;
	req.mainPhotosPath = mainPhotosPath;
	req.galleryPhotosPath = galleryPhotosPath;

	try {

		if (!fs.existsSync(projectFolder)) {
			fs.mkdirSync(projectFolder, { recursive: true });
		}

		if (!fs.existsSync(mainPhotosPath)) {
			fs.mkdirSync(mainPhotosPath, { recursive: true });
		}
		if (!fs.existsSync(galleryPhotosPath)) {
			fs.mkdirSync(galleryPhotosPath, { recursive: true });
		}

		logger.info(`Directories for the project ${projectId} created!`);
		next();

	} catch (error) {
		logger.error(`Failed to create project directories: ${error}`);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
			error: 'Failed to create project directories.'
		});
	}
};

module.exports = createProjectFolders;
