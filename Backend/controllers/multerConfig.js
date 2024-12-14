const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const baseUploadPath = path.join(__dirname, '..', 'projects-photos');

        if (file.fieldname === 'mainImages') {
            cb(null, baseUploadPath);
        } else if (file.fieldname === 'galleryImages') {
            const projectId = req.projectId;
            const galleryPath = path.join(baseUploadPath, projectId.toString());
            
           
            fs.mkdirSync(galleryPath, { recursive: true }); 
            
            cb(null, galleryPath);
        } else {
            cb(new Error('Nieobsługiwany typ pliku.'));
        }
    },
    filename: (req, file, cb) => {

        if (file.fieldname === 'mainImages') {
            cb(null, file.originalname);
        } else if (file.fieldname === 'galleryImages') {
            cb(null, file.originalname);
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
