const express = require('express');
const router = express.Router();
const pool = require('../database/db.js');
const verifyAdmin = require('../controllers/verifyAdmin.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../configs/logger.js');

router.use(express.json());

router.post('/new', verifyAdmin, async (req, res) => {
    const { postTitle, postLead, postContent, postImage } = req.body;
    const postId = uuidv4();

    if (!postTitle || !postContent) {
        return res.status(400).json({ message: 'Prześlij poprawne dane!' });
    }

    let query;
    let values;

    if (postImage) {
        query = 'INSERT INTO posts (id, post_title, post_lead, post_content, post_imageName) VALUES(?,?,?,?,?)';
        values = [postId, postTitle, postLead, postContent, postImage];
    } else {
        query = 'INSERT INTO posts (id, post_title, post_lead, post_content) VALUES(?,?,?)';
        values = [postId, postTitle, postContent];
    };

    try {
        await pool.query(query, values);
        logger.info('Post dodany pomyślnie!');
        return res.status(201).json({
            message: `Post ${postTitle} zapisany`,
            postId,
        })
    } catch (error) {
        logger.info('Błąd podczas zapisywania posta', error.message);

        return res.status(500).json({ message: `Błąd serwera: ${error.message}` });
    };

});

router.get('/collection', async (req, res) => {

    const query = 'SELECT * FROM posts ORDER BY id';

    try {
        const [rows] = await pool.query(query);

        if (rows.length === 0) {
            logger.error('Brak postów do pobrania');
            return res.status(404).json({ message: 'Brak postów' });
        };

        return res.status(200).json({ posts: rows });

    } catch (error) {
        logger.error('Błąd podczas pobierania postów:', error.message);

        return res.status(500).json({ message: 'Błąd serwera' });
    };

});

router.put('/edit', verifyAdmin, async (req, res) => {
    const { postId, postTitle, postLead, postContent } = req.body;
    let postImage = req.body.postImage;

    if (!postId || !postTitle || !postLead || postLead.trim() === '' || postTitle.trim() === '' || postContent.trim() === '') {
        logger.error('Brak wymaganych danych do edycji posta');
        return res.status(400).json({ message: 'Brak wymaganych danych do edycji posta!' });
    }

    postImage = postImage && postImage.trim() !== '' ? postImage : null;

    const query = 'UPDATE posts SET post_title=?, post_lead=?, post_content=?, post_imageName=? WHERE id=?';


    try {
        const [result] = await pool.query(query, [postTitle, postLead, postContent, postImage, postId]);
        logger.info('Post edytowany!');
        return res.status(200).json({
            message: `Post ${postTitle} poprawnie zaktualizowany`,
            postId
        });
    } catch (error) {
        logger.error('Nie udało się edytować posta', error.message);
        return res.status(500).json({ message: `Nie udało się edytować posta ${postTitle}` });
    }
});

router.delete('/delete', verifyAdmin, async (req, res) => {
    const { postId } = req.body;

    if (!postId || postId < 0) {
        logger.error('Podaj dane wymagane do usunięcia postu!');
        return res.status(404).json({ message: 'Podaj dane wymagane do usunięcia postu!' });
    };

    const query = 'DELETE from posts WHERE id=?';

    try {
        const [result] = await pool.query(query, [postId]);

        if (result.affectedRows === 0) {
            logger.info('Post nie znaleziony');
            return res.status(404).json({ message: 'Post o podanym ID nie istnieje' });
        }

        return res.status(200).json({
            message: `Post usunięty poprawnie`,
            postId
        })
    } catch (error) {
        logger.error('Nie udało się usunąć posta', error.message);
        return res.status(500).json({ message: 'Nie udało się usunąć posta' });
    }
})

module.exports = router;
