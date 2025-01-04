const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const logger = require('../configs/logger.js');

router.post('/', (req, res) => {
    const folder = req.body.folder;

    if (!folder || folder == '') {
        logger.error('Brak folderu do wylistowania');
        return res.status(400).json({ message: 'Brak folderu do wylistowania' });
    };

    const folderPath = path.join(__dirname, `../projects-photos/${folder}/gallery`)

    if (!fs.existsSync(folderPath)) {
        logger.error('Folder nie istnieje');
        return res.status(404).json({message: 'Podany folder nie istnieje.'})
    };

    try {
        const files = fs.readdirSync(folderPath);
        return res.status(200).json({
            message: 'Lista plików pobrana poprawnie',
            photos: files,
        });
    } catch (error) {
        logger.error('Błąd odczytu plików:', error.message);
        return res.status(500).json({ message: 'Błąd odczytu plików' })
    }
});

module.exports = router;