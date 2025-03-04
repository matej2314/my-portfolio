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
        logger.error('Enter skill details.');

        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter skill details'
        });
    };

    try {
        await pool.query(skillsQueries.addNewSkill, [id, skillName, skillCat, skillIcon, iconColor]);
        logger.info(`Skill ${skillName} added correctly.`);
        return res.status(statusCode.CREATED).json({
            message: `Skill ${skillName} added correctly.`,
            skillId: id,
            skillName,
        });
    } catch (error) {
        logger.error('Failed to add new skill.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to add new skill.'
        });
    };
};

exports.getAllSkills = async (req, res) => {
    try {
        const [rows] = await pool.query(skillsQueries.getAllSkills);

        if (rows.length === 0) {
            logger.info('No skill found.');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'No skill found.'
            });
        };

        return res.status(statusCode.OK).json({
            message: 'Skills fetched correctly.',
            skills: rows,
        })
    } catch (error) {
        logger.error('Failed to fetch skills.', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch skills.'
        });
    };
};

exports.deleteSkill = async (req, res) => {
    const { skillId } = req.body;

    if (!skillId || skillId === 0) {
        logger.error('Enter correct skill details.');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter correct skill details.'
        });
    };

    try {
        const [result] = await pool.query(skillsQueries.deleteSkill, [skillId]);

        if (result.affectedRows === 0) {
            logger.info('Skill not found.');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Skill not found.'
            })
        }

        return res.status(statusCode.OK).json({
            message: 'Skill deleted correctly.',
            skillId: skillId,
        })
    } catch (error) {
        logger.error('Failed to delete skill.');
        return res.status(statusCode.OK).json({
            message: 'Failed to delete skill.'
        });
    };
};