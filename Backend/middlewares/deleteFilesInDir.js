const fs = require('fs/promises');
const path = require('path');
const logger = require('../configs/logger.js');
const {getProjectFolder, getMainPhotosPath, getGalleryPhotosPath} = require('../utils/projectPaths.js');

const deleteFiles = async (req, res, next) => {
	req.projectId = req.params.projectId;
	const projectId = req.projectId;

	const projectFolderPath = getProjectFolder(projectId);
	const mainFolderPath = getMainPhotosPath(projectId);
	const galleryFolderPath = getGalleryPhotosPath(projectId);
	req.projectFolderPath = projectFolderPath;
	req.mainPhotosPath = mainFolderPath;
	req.galleryPhotosPath = galleryFolderPath;
	
	const folders = [ mainFolderPath, galleryFolderPath];

	try {
		for (const folder of folders) {
			await fs.access(folder);
			logger.info(`Folder: ${folder} istnieje!`);
		}

	} catch (error) {
		logger.error(`Folder nie istnieje: ${error.message}`);
		return res.status(404).json({ error: 'Jeden z wymaganych folderów nie istnieje.' });
	}
	
	try {
		for (const folder of folders) {
			const files = await fs.readdir(folder);
			for (const file of files) {
				const filePath = path.join(folder, file);
				try {
					await fs.unlink(filePath);
					logger.info(`Plik ${filePath} został usunięty.`);
				} catch (error) {
					logger.error(`Nie udało się usunąć pliku ${filePath}: ${error.message}`);
				}
			}
		}
		logger.info(`Wszystkie pliki zostały pomyślnie usunięte.`);
		next();
		
	} catch (error) {
		logger.error(`Błąd podczas operacji na plikach: ${error.message}`);
		return res.status(500).json({ error: 'Wystąpił błąd podczas operacji na plikach.' });
	}
}

module.exports = deleteFiles;
