const express = require('express');
const router = express.Router();
const allDataContr = require('../controllers/allDataController');

router.get('/collection', allDataContr.getAllData);

module.exports = router;
