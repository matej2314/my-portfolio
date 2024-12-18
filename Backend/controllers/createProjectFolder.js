const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const createProjectFolder = (req, res, next) => {
    const projectId = uuidv4();
    req.projectId = projectId; 

    const uploadPath = path.join(__dirname, '../projects-photos', projectId);
    const mainPhotosPath = path.join(__dirname, uploadPath, 'main');
    const galleryPhotosPath = path.join(__dirname, uploadPath, 'gallery');

    req.mainPhotosPath = mainPhotosPath;
    req.galleryPhotosPath = galleryPhotosPath;
   
    if (fs.existsSync(uploadPath)) {
        return next();
    } else {
        fs.mkdirSync(uploadPath, { recursive: true });
        fs.mkdirSync(mainPhotosPath, { recursive: true });
        fs.mkdirSync(galleryPhotosPath, { recursive: true });
        logger.info(`Katalog dla projektu ${projectId} utworzony.`);
        next();
    }
};

module.exports = createProjectFolder;
