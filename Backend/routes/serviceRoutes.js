const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const servicesController = require('../controllers/servicesController.js');

router.get('/collection', servicesController.getAllServices );

router.post('/new',verifyAdmin, servicesController.addNewService);

router.put('/edit', verifyAdmin, servicesController.editService);

router.delete('/', verifyAdmin, servicesController.deleteService);

module.exports = router;
