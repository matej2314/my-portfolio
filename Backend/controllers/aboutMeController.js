const { v4: uuidv4 } = require('uuid');
const pool = require('../database/db.js');
const logger = require('../configs/logger.js');
const queries = require('../database/aboutMeQueries.js');

exports.getAllAbout = async (req, res) => {
    try {
        const [rows] = await pool.query(queries.getAllDescs);
        
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Brak opisów.' });
        };

        return res.status(200).json({
            message: 'Opis pobrany poprawnie.',
            aboutme: rows,
        })
    } catch (error) {
        logger.error('Nie udało się pobrać opisów omnie', error.message);
        return res.status(500).json({ message: 'Błąd serwera' });
    };
};

exports.addNewAbout = async (req, res) => {
    const id = uuidv4();
    const about = req.body.about;

    if (!about || about.trim().length < 0 || about.trim() === '') {
        return res.status(400).json({ message: 'Brak danych o opisie' });
    };

    try {
        await pool.query(queries.addNewDesc, [id, about]);
        logger.info('Opis dodany pomyślnie!');
        return res.status(201).json({
            message: 'Opis dodany pomyślnie!',
            id,
        })
    } catch (error) {
        logger.error('Nie udało się dodać opisu.', error.message);
        return res.status(500).json({ message: 'Nie udało się dodać opisu.' });
    
    };
};

exports.updateAbout = async (req, res) => {
    const { id, about } = req.body;

    if (!id || !about || id < 0 || about.trim().length == 0 || about.trim() === '') {
        logger.error('Podaj prawidłowe dane do usunięcia opisu');
        return res.status(400).json({ message: 'Podaj prawidłowe dane do usunięcia opisu' });
    };

    try {
        const [result] = await pool.query(queries.updateDesc, [about]);
        logger.info('Opis zaktualizowany pomyślnie.');
        return res.status(200).json({
            message: 'Opis zaktualizowany pomyślnie',
            id,
            about,
        });
    } catch (error) {
        logger.error('Nie udało się zaktualizować opisu');
        return res.status(500).json({ message: 'Nie udało się zaktualizować opisu' });
    };
};

exports.deleteAbout = async (req, res) => {
    const id = req.body.id;

    if (!id || id <= 0) {
        logger.error('Podaj prawidłowe id opisu');
        return res.status(400).json({ message: 'Podaj prawidłowe dane do usunięcia opisu' });
    };

    try {
        const [result] = await pool.query(queries.deleteDesc, [id]);
        

        if (result.affectedRows == 0) {
            logger.error('Opis nie znaleziony');
            return res.status(404).json({ message: 'Opis nie znaleziony' });
        };

        return res.status(200).json({
            message: 'Opis usunięty poprawnie',
            id,
        });
        
    } catch (error) {
        logger.error('Nie udało się usunąć opisu:', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć opisu' });
    };
};