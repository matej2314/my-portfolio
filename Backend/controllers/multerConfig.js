const multer = require('multer');
const path = require('path');

const removeResolutionAndExtension = (filename) => {
    const baseName = filename.replace(/(-\d+)(?=\.\w+$)/, '');
    return baseName;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const baseUploadPath = 'projects-photos';

        if (file.fieldname === 'mainImages') {
            
            cb(null, baseUploadPath);
        } else if (file.fieldname === 'galleryImages') {
            const projectId = req.projectId;
            const galleryPath = path.join(baseUploadPath, projectId.toString());
            cb(null, galleryPath);
        } else {
            cb(new Error('Nieobsługiwany typ pliku.'));
        }
    },
    filename: (req, file, cb) => {
        const baseName = removeResolutionAndExtension(file.originalname);
        cb(null, baseName + path.extname(file.originalname)); 

        // Ustawiamy nazwę tylko dla pierwszego pliku z kategorii mainImages
        if (file.fieldname === 'mainImages' && !req.screenName) {
            req.screenName = baseName; 
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
