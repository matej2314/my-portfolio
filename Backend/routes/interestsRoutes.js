const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const interestsController = require('../controllers/interestsController.js');

router.get('/collection', interestsController.getAllInterests );

router.post('/new', verifyAdmin, interestsController.addNewInterest);

router.delete('/delete', verifyAdmin, interestsController.deleteInterest);


module.exports = router;