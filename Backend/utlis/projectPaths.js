const path = require('path');

// Base path to the project photos directory
const baseUploadPath = path.join(__dirname, '../projects-photos');

const getProjectFolder = (projectId) => path.join(baseUploadPath, projectId.toString());

// Function to get the path to the 'main' folder for a specific project
const getMainPhotosPath = (projectId) => path.join(baseUploadPath, projectId, 'main');

// Function to get the path to the 'gallery' folder for a specific project
const getGalleryPhotosPath = (projectId) => path.join(baseUploadPath, projectId, 'gallery');

module.exports = {
    getProjectFolder,
    getMainPhotosPath,
    getGalleryPhotosPath
};
