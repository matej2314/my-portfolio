const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const skillsController = require('../controllers/skillsController.js');

router.post('/new', verifyAdmin, skillsController.addNewSkill);

router.get('/collection', skillsController.getAllSkills);

router.delete('/delete', verifyAdmin, skillsController.deleteSkill);

module.exports = router;