const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const logger = require('../logger');
const deleteFiles = require('./deleteFilesInDir');

const updateStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const projectId = req.body.projectId;
        const baseUploadPath = path.join(__dirname, '../projects-photos');
        const mainPhotosPath = `${baseUploadPath}/${projectId}/main`;
        const galleryPhotosPath = `${baseUploadPath}/${projectId}/gallery`;
        req.projectId = projectId;

        try {
            if (file.fieldname === 'mainImages') {
                const mainImages = req.files.mainImages;
                if (!mainImages) {
                    return cb(new Error('Brak plików w polu mainImages'));
                }

                // Usuwanie plików z głównego folderu
                await fs.access(mainPhotosPath).catch(() => {});
                await deleteFiles(mainPhotosPath);
                logger.info(`Pliki z katalogu ${mainPhotosPath} usunięte!`);

                if (Array.isArray(mainImages)) {
                    for (let i = 0; i < mainImages.length; i++) {
                        const filePath = `${mainPhotosPath}/${mainImages[i].originalname}`;
                        cb(null, filePath);
                    }
                } else {
                    const filePath = `${mainPhotosPath}/${mainImages.originalname}`;
                    cb(null, filePath);
                }
                logger.info(`Pliki w ${mainPhotosPath} zaktualizowane!`);
            }

            if (file.fieldname === 'galleryImages') {
                const galleryImages = req.files.galleryImages;
                if (!galleryImages) {
                    logger.error(`Brak plików w galleryImages`);
                    return cb(new Error('Brak plików w polu galleryImages'));
                }

                // Usuwanie plików z folderu galerii
                await fs.access(galleryPhotosPath).catch(() => {});
                await deleteFiles(galleryPhotosPath);
                logger.info(`Pliki z katalogu ${galleryPhotosPath} usunięte!`);

                if (Array.isArray(galleryImages)) {
                    for (let i = 0; i < galleryImages.length; i++) {
                        const filePath = `${galleryPhotosPath}/${galleryImages[i].originalname}`;
                        cb(null, filePath);
                    }
                } else {
                    const filePath = `${galleryPhotosPath}/${galleryImages.originalname}`;
                    cb(null, filePath);
                }
                logger.info(`Pliki w ${galleryPhotosPath} zaktualizowane!`);
            }
        } catch (error) {
            logger.error(`Błąd w obsłudze plików: ${error}`);
            cb(new Error('Nie udało się przeprowadzić aktualizacji plików.'));
        }
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    },
});

const updateProject = multer({
    storage: updateStorage,
    limits: {
        fileSize: 5 * 1024 * 1024,
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

module.exports = updateProject;
