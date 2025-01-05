const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin.js');
const postsController = require('../controllers/postsController.js');

router.post('/new', verifyAdmin, postsController.addNewPost );

router.get('/collection', postsController.getAllPosts);

router.put('/edit', verifyAdmin, postsController.editPost);

router.delete('/delete', verifyAdmin, postsController.deletePost);

module.exports = router;
