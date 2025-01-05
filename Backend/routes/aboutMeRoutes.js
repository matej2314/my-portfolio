const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const aboutController = require('../controllers/aboutMeController.js');

router.get('/collection', aboutController.getAllAbout);

router.post('/new', verifyAdmin, aboutController.addNewAbout);

router.delete('/delete', verifyAdmin, aboutController.deleteAbout);

router.put('/update', verifyAdmin, aboutController.updateAbout);



module.exports = router;