const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../configs/logger.js');
const {getMainPhotosPath, getGalleryPhotosPath, getProjectFolder} = require('../utlis/projectPaths');

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

		logger.info(`Katalogi dla projektu ${projectId} utworzone!`);
		next();
		
	} catch (error) {
		logger.error(`Błąd podczas tworzenia katalogów projektu: ${error.message}`);
		return res.status(500).json({ error: 'Nie udało się stworzyć katalogów projektu.' });
	}
};

module.exports = createProjectFolders;
