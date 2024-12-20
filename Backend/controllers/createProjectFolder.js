const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');

const createProjectFolders = (req, res, next) => {
	if (!req.projectId) {
		req.projectId = uuidv4(); // Generowanie unikalnego ID projektu
	}

	const baseUploadPath = path.join(__dirname, '../projects-photos');
	const mainPhotosPath = `${baseUploadPath}/${req.projectId}/main`;
	const galleryPhotosPath = `${baseUploadPath}/${req.projectId}/gallery`;

	req.mainPhotosPath = mainPhotosPath;
	req.galleryPhotosPath = galleryPhotosPath;

	try {
		// Tworzenie folderów, jeśli nie istnieją
		if (!fs.existsSync(mainPhotosPath)) {
			fs.mkdirSync(mainPhotosPath, { recursive: true });
		}
		if (!fs.existsSync(galleryPhotosPath)) {
			fs.mkdirSync(galleryPhotosPath, { recursive: true });
		}

		logger.info(`Katalogi dla projektu ${req.projectId} utworzone!`);
		next(); 
	} catch (error) {
		logger.error(`Błąd podczas tworzenia katalogów projektu: ${error.message}`);
		return res.status(500).json({ error: 'Nie udało się stworzyć katalogów projektu.' });
	}
};

module.exports = createProjectFolders;
