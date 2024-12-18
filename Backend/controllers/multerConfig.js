const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../logger');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectId = req.body.projectId;
        req.projectId = projectId;
        const baseUploadPath = path.join(__dirname, '..', 'projects-photos');
        const mainPhotosPath = path.join(baseUploadPath, projectId, 'main');
        const galleryPhotosPath = path.join(baseUploadPath, projectId, 'gallery');
        req.mainPhotosPath = mainPhotosPath;
        req.galleryPhotosPath = galleryPhotosPath;

        try {
            if (file.fieldname === 'mainImages') {
                try {
                    cb(null, mainPhotosPath);
                    logger.info(`Wszystkie pliki w ${mainPhotosPath} zapisane!`)
                } catch (error) {
                    logger.error(`Błąd podczas dodawania plików do folderu: ${mainPhotosPath}: ${error}`);
                    cb(new Error(`Błąd podczas dodawania plików do folderu: ${mainPhotosPath}`));
                };

            } else if (file.fieldname === 'galleryImages') {
                
                if (!fs.existsSync(galleryPhotosPath)) {

                    try {
                        fs.mkdirSync(galleryPhotosPath, { recursive: true });
                        logger.info(`Folder galerii ${galleryPhotosPath} utworzony!`)
                    } catch (error) {
                        logger.error(`Nie udało się utworzyć folderu galerii: ${error.message}`);
                        cb(new Error(`Nie udało się utworzyć folderu galerii: ${error.message}`));
                        return;
                    };
                   
                };

                try {
                    cb(null, galleryPhotosPath);
                    logger.info(`Wszystkie pliki w ${galleryPhotosPath} zapisane!`)
                } catch (error) {
                    logger.error(`Nie udało się dodać zdjęć galerii do: ${galleryPhotosPath} : ${error.message}`);
                    cb(new Error(`Nie udało się dodać zdjęć galerii do: ${galleryPhotosPath} : ${error.message}`));
                };
               
            } else {
              cb(new Error('Nieobsługiwany typ pliku.'));
            };
            
        } catch (err) {
            logger.error(`Błąd przy obsłudze plików: ${err}`)
            cb(new Error('Błąd przy obsłudze plików.'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
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
    }
});

module.exports = upload;
