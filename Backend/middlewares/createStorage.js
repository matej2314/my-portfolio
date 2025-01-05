const multer = require('multer');
const path = require('path');
const logger = require('../configs/logger.js');

const createStorage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const mainPhotosPath = req.mainPhotosPath;
		const galleryPhotosPath = req.galleryPhotosPath;
		
		try {
			
			if (file.fieldname === 'mainImages') {
				cb(null, mainPhotosPath); 
			} else if (file.fieldname === 'galleryImages') {
				cb(null, galleryPhotosPath);
			} else {
				cb(new Error('Nieobsługiwany typ pliku.'));
			}
		} catch (error) {
			logger.error(`Nie udało się zapisać zdjęć projektu: ${error.message}`);
			cb(error);
		}
	},
	filename: (req, file, cb) => {
		
		cb(null, file.originalname);
	},
});

const saveProject = multer({
	storage: createStorage,
	limits: {
		fileSize: 15 * 1024 * 1024, // 5 MB
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
