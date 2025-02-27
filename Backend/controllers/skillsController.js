const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const { v4: uuidv4 } = require('uuid');
const skillsQueries = require('../database/skillsQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.addNewSkill = async (req, res) => {
    const id = uuidv4();
    const skillIcon = req.body.icon;
    const { skillName, skillCat, iconColor } = req.body;

    if (!skillName || skillName === '' || skillCat === '' || !skillCat || !skillIcon) {
        logger.error('Brak danych do dodania skilla');

        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Brak danych do dodania nowego skilla'
        });
    };

    try {
        await pool.query(skillsQueries.addNewSkill, [id, skillName, skillCat, skillIcon, iconColor]);
        logger.info(`Umiejętność ${skillName} dodana pomyślnie`);
        return res.status(statusCode.CREATED).json({
            message: `Umiejętność ${skillName} dodana pomyślnie`,
            skillId: id,
            skillName,
        });
    } catch (error) {
        logger.error('Nie udało się dodać nowej umiejętności', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Nie udało się dodać nowej umiejętności'
        });
    };
};

exports.getAllSkills = async (req, res) => {
    try {
        const [rows] = await pool.query(skillsQueries.getAllSkills);

        if (rows.length === 0) {
            logger.info('Brak umiejętności w bazie danych');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Brak umiejętności w bazie danych'
            });
        };

        return res.status(statusCode.OK).json({
            message: 'Umiejętności pobrane poprawnie',
            skills: rows,
        })
    } catch (error) {
        logger.error('Nie udało się pobrać umiejętności', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Nie udało się pobrać umiejętności'
        });
    };
};

exports.deleteSkill = async (req, res) => {
    const { skillId } = req.body;

    if (!skillId || skillId === 0) {
        logger.error('Brak danych do usunięcia skilla');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Brak danych do usunięcia skilla'
        });
    };

    try {
        const [result] = await pool.query(skillsQueries.deleteSkill, [skillId]);

        if (result.affectedRows === 0) {
            logger.info('Umiejętność nie znaleziona');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Umiejętność nie znaleziona'
            })
        }

        return res.status(statusCode.OK).json({
            message: 'Umiejętność usunięta poprawnie',
            skillId: skillId,
        })
    } catch (error) {
        logger.error('Nie udało się usunąć umiejętności');
        return res.status(statusCode.OK).json({
            message: 'Nie udało się usunąć umiejętności'
        });
    };
};