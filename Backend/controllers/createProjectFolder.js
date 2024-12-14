const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const createProjectFolder = (req, res, next) => {
    const projectId = req.body.projectId || uuidv4();
    req.projectId = projectId; 

    const uploadPath = path.join(__dirname, '../projects-photos', projectId);
    req.uploadPath = uploadPath; 

    if (fs.existsSync(uploadPath)) {
        return next();
    } else {
        fs.mkdirSync(uploadPath, { recursive: true });
        logger.info(`Katalog dla projektu ${projectId} utworzony.`);
        next();
    }
};

module.exports = createProjectFolder;
