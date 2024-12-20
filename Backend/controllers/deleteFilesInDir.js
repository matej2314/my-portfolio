const fs = require('fs/promises');
const path = require('path');
const logger = require('../logger');

const deleteFiles = async (dirPath) => {
    try {
        // Sprawdzamy, czy folder istnieje
        await fs.access(dirPath);
        logger.info(`Folder: ${dirPath} istnieje!`);
    } catch (error) {
        logger.error(`Folder ${dirPath} nie istnieje: ${error.message}`);
        return; // Jeśli folder nie istnieje, kończymy funkcję
    }

    try {
        // Odczytujemy pliki w folderze
        const files = await fs.readdir(dirPath);
        if (files.length === 0) {
            logger.info(`Folder ${dirPath} jest pusty.`);
            return; // Jeśli folder jest pusty, kończymy funkcję
        }

        let deleteErrors = 0; // Zmienna do liczenia błędów
        const maxDeleteErrors = 3; // Limity błędów, po których przerywamy operację

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            try {
                // Usuwanie pliku
                await fs.unlink(filePath);
                logger.info(`Plik ${filePath} został usunięty.`);
            } catch (error) {
                logger.error(`Nie udało się usunąć pliku ${filePath}: ${error.message}`);
                deleteErrors++; // Zliczanie błędów

                // Jeżeli osiągnięto maksymalny limit błędów, przerywamy operację
                if (deleteErrors >= maxDeleteErrors) {
                    logger.error(`Przekroczono limit błędów przy usuwaniu plików w ${dirPath}.`);
                    return; // Kończymy funkcję po przekroczeniu limitu błędów
                }
            }
        }

        if (deleteErrors > 0) {
            logger.error(`Wystąpiły błędy przy usuwaniu plików w ${dirPath}.`);
        } else {
            logger.info(`Wyczyszczono folder ${dirPath} pomyślnie.`);
        }
    } catch (error) {
        logger.error(`Błąd podczas odczytu zawartości folderu ${dirPath}: ${error.message}`);
    }
};

module.exports = deleteFiles;
