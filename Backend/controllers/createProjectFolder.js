const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');

const createProjectFolders = (req, res, next) => {
	if (!req.projectId) {
		req.projectId = uuidv4();
	};
	const projectId = req.projectId;

	const baseUploadPath = path.join(__dirname, '../projects-photos');
	const mainPhotosPath = `${baseUploadPath}/${projectId}/main`;
	const galleryPhotosPath = `${baseUploadPath}/${projectId}/gallery`;

	req.mainPhotosPath = mainPhotosPath;
	req.galleryPhotosPath = galleryPhotosPath;

	try {
		
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
