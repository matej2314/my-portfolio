const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const fs = require('fs');
const projectsQueries = require('../database/projectsQueries.js');
const { getMainPhotosPath, getGalleryPhotosPath } = require('../utils/projectPaths.js');

exports.getAllProjects = async (req, res) => {

    try {
        const [rows] = await pool.query(projectsQueries.getAllProjects);

        if (rows.length <= 0) {
            logger.error('Brak projektów do pobrania');
            return res.status(404).json({ message: 'Brak projektów w bazie danych' });
        }

        return res.status(200).json({
            message: 'Projekty pobrano poprawnie',
            projects: rows,
        });
    } catch (error) {
        logger.error('Nie udało się pobrać projektów', error.message);
        return res.status(500).json({
            message: 'Nie udało się pobrać projektów',
        });
    };
};

exports.deleteProject = async (req, res) => {
    const { projectName } = req.body;
    const projectId = req.projectId;
    const projectFolderPath = req.projectFolderPath;

    if (!projectId || projectId <= 0 || projectName === '') {
        logger.error('Brak wymaganych danych do usunięcia projektu');
        return res.status(400).json({ message: 'Brak wymaganych danych do usunięcia projektu' });
    }

    try {
        const [result] = await pool.query(projectsQueries.deleteProject, [projectId, projectName]);

        if (result.affectedRows == 0) {
            logger.info('Projekt nie znaleziony');
            return res.status(404).json({ message: 'Nie znaleziono projektu do usunięcia' });
        }

        try {
			
            await fs.rm(projectFolderPath, { recursive: true, force: true });
            logger.info(`Główny folder projektu ${projectId} usunięty.`);
        } catch (error) {
            logger.error(`Nie udało się usunąć głównego folderu projektu ${projectId}: ${error}`);
        }

        return res.status(200).json({ message: `Projekt ${projectName} usunięty.` });
    } catch (error) {
        logger.error('Nie udało się usunąć projektu', error);
        return res.status(500).json({ message: `Nie udało się usunąć projektu ${projectName}` });
    };
};

exports.photosList = async (req, res) => {
    const { projectId } = req.body;

    if (!projectId || projectId.toString().length < 0) {
        return res.status(400).json({ message: 'Prześlij poprawny identyfikator projektu.' });
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

        return res.status(200).json({
            message: 'Lista plików pobrana poprawnie.',
            images,
        });
    } catch (error) {
        logger.error(`Nie udało się poprawnie pobrać zdjęć: ${error}`);
        return res.status(500).json({ message: 'Nie udało się poprawnie pobrać zdjęć.' })
    };
};

