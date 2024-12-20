const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger');
const createProjectFolder = require('./createProjectFolder');

const createStorage = multer.diskStorage({
	destination: async (req, file, cb) => {
		projectId = req.projectId;
		galleryPhotosPath = req.galleryPhotosPath;
		mainPhotosPath = req.mainPhotosPath;

		try {
			// Decydujemy, gdzie zapisać plik
			if (file.fieldname === 'mainImages') {
				cb(null, mainPhotosPath); // Ścieżka folderu
			} else if (file.fieldname === 'galleryImages') {
				cb(null, galleryPhotosPath); // Ścieżka folderu
			} else {
				cb(new Error('Nieobsługiwany typ pliku.'));
			}
		} catch (error) {
			logger.error(`Nie udało się stworzyć katalogów projektu: ${error.message}`);
			cb(error);
		}
	},
	filename: (req, file, cb) => {
		// Zachowujemy oryginalną nazwę pliku
		cb(null, file.originalname);
	},
});

const saveProject = multer({
	storage: createStorage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5 MB
	},
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

		if (mimetype && extname) {
			return cb(null, true);
		}

		cb(new Error('Nieobsługiwany format pliku.'));
	},
});

module.exports = saveProject;
