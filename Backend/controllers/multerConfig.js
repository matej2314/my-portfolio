const multer = require('multer');
const path = require('path');
const fs = require('fs');  // Do sprawdzania i tworzenia folderów

const removeResolutionAndExtension = (filename) => {
    const baseName = filename.replace(/(-\d+)(?=\.\w+$)/, '');  // Usuwamy rozdzielczość i rozszerzenie
    return baseName;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const baseUploadPath = path.join(__dirname, '..', 'projects-photos'); // Absolutna ścieżka do katalogu

        if (file.fieldname === 'mainImages') {
            cb(null, baseUploadPath);
        } else if (file.fieldname === 'galleryImages') {
            const projectId = req.projectId;
            const galleryPath = path.join(baseUploadPath, projectId.toString());
            
            // Sprawdzamy, czy folder dla projektu istnieje, jeśli nie - tworzymy
            fs.mkdirSync(galleryPath, { recursive: true }); // Używamy { recursive: true } żeby stworzyć wszystkie brakujące foldery
            
            cb(null, galleryPath);
        } else {
            cb(new Error('Nieobsługiwany typ pliku.'));
        }
    },
    filename: (req, file, cb) => {
        const baseName = removeResolutionAndExtension(file.originalname);  // Usuwamy rozdzielczość i rozszerzenie z nazwy pliku

        // Jeśli plik jest z mainImages, zapisujemy tylko nazwę (bez rozszerzenia)
        if (file.fieldname === 'mainImages') {
            cb(null, baseName);  // Zapisuje nazwę pliku bez rozszerzenia
        } else if (file.fieldname === 'galleryImages') {
            // Dla galleryImages zapisujemy pełną nazwę (z rozszerzeniem)
            cb(null, file.originalname);  // Pełna nazwa pliku (wraz z rozszerzeniem)
        }

        // Ustawiamy nazwę tylko dla pierwszego pliku z kategorii mainImages
        if (file.fieldname === 'mainImages' && !req.screenName) {
            req.screenName = baseName;  // Przechowujemy nazwę pliku z mainImages bez rozdzielczości
        }
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error('Nieobsługiwany format pliku.'));
    }
});

module.exports = upload;
