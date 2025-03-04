const fs = require('fs/promises');
const path = require('path');
const logger = require('../configs/logger.js');
const { getProjectFolder, getMainPhotosPath, getGalleryPhotosPath } = require('../utils/projectPaths.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

const deleteFiles = async (req, res, next) => {
	req.projectId = req.params.projectId;
	const projectId = req.projectId;

	const projectFolderPath = getProjectFolder(projectId);
	const mainFolderPath = getMainPhotosPath(projectId);
	const galleryFolderPath = getGalleryPhotosPath(projectId);
	req.projectFolderPath = projectFolderPath;
	req.mainPhotosPath = mainFolderPath;
	req.galleryPhotosPath = galleryFolderPath;

	const folders = [mainFolderPath, galleryFolderPath];

	try {
		for (const folder of folders) {
			await fs.access(folder);
			logger.info(`Directory: ${folder} already exists!`);
		}

	} catch (error) {
		logger.error(`Directory doesn't exist: ${error.message}`);
		return res.status(statusCode.NOT_FOUND).json({
			error: `One of required directory doesn't exist`
		});
	}

	try {
		for (const folder of folders) {
			const files = await fs.readdir(folder);
			for (const file of files) {
				const filePath = path.join(folder, file);
				try {
					await fs.unlink(filePath);
					logger.info(`File ${filePath} deleted correctly.`);
				} catch (error) {
					logger.error(`Failed to delete file: ${filePath}: ${error.message}`);
				}
			}
		}
		logger.info(`All files have benn correctly deleted.`);
		next();

	} catch (error) {
		logger.error(`Error during file operations: ${error.message}`);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
			error: 'An error occured.'
		});
	}
}

module.exports = deleteFiles;
