const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('../logger');
const deleteFiles = require('./deleteFilesInDir');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const projectId = req.body.projectId;
        const baseUploadPath = path.join(__dirname, '../projects-photos');
        const mainPhotosPath = `${baseUploadPath}/${projectId}/main`;
        const galleryPhotosPath = `${baseUploadPath}/${projectId}/gallery`;

        // Logowanie, żeby sprawdzić, co się dzieje z tymi ścieżkami
        console.log(`baseUploadPath: ${baseUploadPath}`);
        console.log(`mainPhotosPath: ${mainPhotosPath}`);
        console.log(`galleryPhotosPath: ${galleryPhotosPath}`);

        try {
            if (file.fieldname === 'mainImages') {
                const mainImages = req.files.mainImages;

                if (mainImages && mainImages.length > 0) {
                    try {
                        deleteFiles(mainPhotosPath); // Usuwanie starych plików w folderze
                        mainImages.forEach(image => {
                            if (image && image.buffer) {
                                const filePath = path.join(mainPhotosPath, image.originalname);
                                // Zapisz plik
                                fs.writeFileSync(filePath, image.buffer);
                            } else {
                                logger.error(`Plik w polu mainImages jest uszkodzony lub nie ma bufora.`);
                            }
                        });
                        logger.info(`Wszystkie pliki w ${mainPhotosPath} zapisane!`);
                        cb(null, mainPhotosPath);
                    } catch (error) {
                        logger.error(`Błąd podczas dodawania plików do folderu: ${mainPhotosPath}: ${error}`);
                        cb(new Error(`Błąd podczas dodawania plików do folderu: ${mainPhotosPath}`));
                    }
                } else {
                    cb(new Error('Brak plików w polu mainImages.'));
                }
            } else if (file.fieldname === 'galleryImages') {
                const galleryImages = req.files.galleryImages;

                if (galleryImages && galleryImages.length > 0) {
                    if (!fs.existsSync(galleryPhotosPath)) {
                        try {
                            fs.mkdirSync(galleryPhotosPath, { recursive: true });
                            logger.info(`Folder galerii ${galleryPhotosPath} utworzony!`);
                        } catch (error) {
                            logger.error(`Nie udało się utworzyć folderu galerii: ${error.message}`);
                            cb(new Error(`Nie udało się utworzyć folderu galerii: ${error.message}`));
                            return;
                        }
                    }

                    try {
                        deleteFiles(galleryPhotosPath); // Usuwanie starych plików w folderze
                        galleryImages.forEach(image => {
                            if (image && image.buffer) {
                                const filePath = path.join(galleryPhotosPath, image.originalname);
                                // Zapisz plik
                                fs.writeFileSync(filePath, image.buffer);
                            } else {
                                logger.error(`Plik w polu galleryImages jest uszkodzony lub nie ma bufora.`);
                            }
                        });
                        logger.info(`Wszystkie pliki w ${galleryPhotosPath} zapisane!`);
                        cb(null, galleryPhotosPath);
                    } catch (error) {
                        logger.error(`Nie udało się dodać zdjęć galerii do: ${galleryPhotosPath} : ${error.message}`);
                        cb(new Error(`Nie udało się dodać zdjęć galerii do: ${galleryPhotosPath} : ${error.message}`));
                    }
                } else {
                    cb(new Error('Brak plików w polu galleryImages.'));
                }
            } else {
                cb(new Error('Nieobsługiwany typ pliku.'));
            }
        } catch (err) {
            logger.error(`Błąd przy obsłudze plików: ${err}`);
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
