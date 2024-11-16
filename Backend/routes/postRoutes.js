const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger.js');

router.use(express.json());

router.post('/new', (req, res) => {
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    const postId = uuidv4();

    if (!postTitle || !postContent) {
        return res.status(400).json({ message: 'Prześlij poprawne dane!' });
    }
    console.log(postContent, postTitle);

    const query = 'INSERT INTO posts (id, post_title, post_content) VALUES(?,?,?)';

    pool.query(query, [postId, postTitle, postContent], (error, result) => {
        if (error) {
            logger.info('Błąd podczas zapisywania posta', error.message);

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
            return res.status(404).json({ message: 'Brak postów' });
        }
        logger.info('POSTS GET SUKCES');
        res.status(200).json({ posts: rows });
    });
});

router.put('/edit', (req, res) => {
    const postId = req.body.postId;
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    let postImage = req.body.imgName;

    if (!postId || !postTitle || postTitle.trim() === '' || postContent.trim() === '') {
        logger.error('Brak wymaganych danych do edycji posta');
        return res.status(400).json({ message: 'Brak wymaganych danych do edycji posta!' });
    }

    postImage = postImage && postImage.trim() !== '' ? postImage : null;

    const query = 'UPDATE posts SET post_title=?, post_content=?, post_imageName=? WHERE id=?';

    pool.query(query, [postTitle, postContent, postImage, postId], (error, result) => {
        if (error) {
            logger.error('Nie udało się edytować posta', error.message);
            return res.status(500).json({ message: 'Nie udało się edytować posta' });
        }

        return res.status(200).json({
            message: 'Post poprawnie zaktualizowany',
            postId,
        });
    });

});

module.exports = router;
