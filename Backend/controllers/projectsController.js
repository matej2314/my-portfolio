const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const fs = require('fs');
const projectsQueries = require('../database/projectsQueries.js');
const { getMainPhotosPath, getGalleryPhotosPath } = require('../utils/projectPaths.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.getAllProjects = async (req, res) => {

    try {
        const [rows] = await pool.query(projectsQueries.getAllProjects);

        if (rows.length <= 0) {
            logger.error('Projects not found.');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Projects not found.'
            });
        }

        return res.status(statusCode.OK).json({
            message: 'Projects fetched correctly.',
            projects: rows,
        });
    } catch (error) {
        logger.error('Failed to fetch projects:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch projects.',
        });
    };
};

exports.deleteProject = async (req, res) => {
    const { projectName } = req.body;
    const projectId = req.projectId;
    const projectFolderPath = req.projectFolderPath;

    if (!projectId || projectId <= 0 || projectName === '') {
        logger.error('No required data');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'No required data.'
        });
    }

    try {
        const [result] = await pool.query(projectsQueries.deleteProject, [projectId, projectName]);

        if (result.affectedRows == 0) {
            logger.info('Project not found');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Project not found.'
            });
        }

        try {

            await fs.rm(projectFolderPath, { recursive: true, force: true });
            logger.info(`Main project directory ${projectId} deleted.`);
        } catch (error) {
            logger.error(`Failed to delete main project directory: ${projectId}: ${error}`);
        }

        return res.status(statusCode.OK).json({ message: `Project ${projectName} deleted correctly.` });
    } catch (error) {
        logger.error('Failed to delete project', error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to delete project: ${projectName}`
        });
    };
};

exports.photosList = async (req, res) => {
    const { projectId } = req.body;

    if (!projectId || projectId.toString().length < 0) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter the correct project ID.'
        });
    };

    const mainPhotos = getMainPhotosPath(projectId);
    const galleryPhotos = getGalleryPhotosPath(projectId);

    try {
        const mainFiles = await fs.readdir(mainPhotos);
        const galleryFiles = await fs.readdir(galleryPhotos);
        const images = {
            mainFiles,
            galleryFiles,
        }

        return res.status(statusCode.OK).json({
            message: 'File list fetched correctly.',
            images,
        });
    } catch (error) {
        logger.error(`Failed to fetch pictures: ${error}`);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch pictures.'
        })
    };
};

