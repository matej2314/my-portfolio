const path = require('path');
const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger.js');

router.use(bodyParser.json());

router.post('/', (req, res) => {
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    const postDate = req.body.postDate;
    const postId = uuidv4();

    if (postTitle.trim().length < 0 || postContent.trim().length < 0 || !postDate) {
        return res.status(400).json({ message: 'Prześlij poprawne dane!' });
    }

    const query = 'INSERT INTO posts (id, post_title, post_content, post_imageName) VALUES(?,?,?,?)';

    pool.query(query, [postId, postTitle, postContent, postDate], (error, result) => {
        if (error) {
            logger.error('Błąd podczas zapisywania posta', error.message);

            return res.status(500).json({ message: `Błąd serwera: ${error.message}` });
        }
        logger.info('Post saved');
       return res.status(201).json({ message: 'Post zapisany', postId: postId });
    });
});

router.get('/all', (req, res) => {


    const query = 'SELECT * FROM posts ORDER BY id';

    pool.query(query, (error, rows) => {
        if (error) {
            logger.error('Błąd podczas pobierania postów:', error.message);

            return res.status(500).json({ message: 'Błąd serwera' });
        }

        if (rows.length === 0) {
            logger.error('Brak postów do pobrania');
            return res.status(400).json({ message: 'Brak postów' });
        }
        logger.info('POSTS GET SUKCES');
        res.status(200).json({ posts: rows });
    });
});

module.exports = router;
