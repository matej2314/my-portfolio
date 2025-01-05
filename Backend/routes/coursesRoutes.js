const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const coursesController = require('../controllers/coursesController');

router.post('/new', verifyAdmin, coursesController.addNewCourse);

router.get('/collection', coursesController.getAllCourses);

router.delete('/delete', verifyAdmin, coursesController.deleteCourse);

module.exports = router;
