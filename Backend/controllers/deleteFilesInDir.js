const fs = require('fs');
const path = require('path');
const logger = require('../logger');

const deleteFilesInDir = (req, res, next) => {
    const mainPhotosPath = req.mainPhotosPath;
    const galleryPhotosPath = req.galleryPhotosPath;

    const deleteFiles = (dirPath) => {
        if (!fs.existsSync(dirPath)) {
            logger.error(`Folder ${dirPath} nie istnieje.`);
            res.status(404).json({ message: 'Folder nie istnieje' });
            return;
        }

        const files = fs.readdirSync(dirPath);

        if (files.length === 0) {
            logger.info(`Folder ${dirPath} jest pusty.`);
            return;
        }

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            try {
                fs.unlinkSync(filePath);
                logger.info(`Plik ${filePath} został usunięty.`);
            } catch (error) {
                logger.error(`Nie udało się usunąć pliku ${filePath}: ${error.message}`);
            }
        };
        logger.info(`Pliki z folderu ${dirPath} zostały usunięte.`);
    };

    try {
        if (req.files.mainImages) {
            deleteFiles(mainPhotosPath);
        }

        if (req.files.galleryImages) {
            deleteFiles(galleryPhotosPath);
        }

        next(); 
    } catch (error) {
        logger.error(`Błąd podczas czyszczenia folderów: ${error.message}`);
        res.status(500).json({ error: 'Błąd podczas czyszczenia folderów.' });
    }
};

module.exports = deleteFilesInDir;
