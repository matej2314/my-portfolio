const pool = require('../database/db.js');
const { v4: uuidv4 } = require('uuid');
const logger = require('../configs/logger.js');
const postsQueries = require('../database/postsQueries.js');
const { StatusCodes } = require('http-status-codes');
const statusCode = StatusCodes;

exports.addNewPost = async (req, res) => {
    const { postTitle, postLead, postContent, postImage } = req.body;
    const postId = uuidv4();

    if (!postTitle || !postContent) {
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Prześlij poprawne dane!' });
    }

    let query;
    let values;

    if (postImage) {
        query = postsQueries.addPostWithImg;
        values = [postId, postTitle, postLead, postContent, postImage];
    } else {
        query = postsQueries.addPostNoImg;
        values = [postId, postTitle, postContent];
    };

    try {
        await pool.query(query, values);
        logger.info('Post dodany pomyślnie!');
        return res.status(statusCode.CREATED).json({
            message: `Post ${postTitle} zapisany`,
            postId,
        })
    } catch (error) {
        logger.info('Błąd podczas zapisywania posta', error.message);

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Błąd serwera: ${error.message}`
        });
    };
};

exports.getAllPosts = async (req, res) => {
    try {
        const [rows] = await pool.query(postsQueries.getAllPosts);

        if (rows.length === 0) {
            logger.error('Brak postów do pobrania');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'Brak postów'
            });
        };

        return res.status(statusCode.OK).json({ posts: rows });

    } catch (error) {
        logger.error('Błąd podczas pobierania postów:', error.message);

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Błąd serwera'
        });
    };
};

exports.editPost = async (req, res) => {
    const { postId, postTitle, postLead, postContent } = req.body;
    let postImage = req.body.postImage;

    if (!postId || !postTitle || !postLead || postLead.trim() === '' || postTitle.trim() === '' || postContent.trim() === '') {
        logger.error('Brak wymaganych danych do edycji posta');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Brak wymaganych danych do edycji posta!'
        });
    }

    postImage = postImage && postImage.trim() !== '' ? postImage : null;

    try {
        const [result] = await pool.query(postsQueries.editPost, [postTitle, postLead, postContent, postImage, postId]);
        logger.info('Post edytowany!');
        return res.status(statusCode.OK).json({
            message: `Post ${postTitle} poprawnie zaktualizowany`,
            postId
        });
    } catch (error) {
        logger.error('Nie udało się edytować posta', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Nie udało się edytować posta ${postTitle}`
        });
    };
};

exports.deletePost = async (req, res) => {
    const { postId } = req.body;

    if (!postId || postId < 0) {
        logger.error('Podaj dane wymagane do usunięcia postu!');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Podaj dane wymagane do usunięcia postu!'
        });
    };

    try {
        const [result] = await pool.query(postsQueries.deletePost, [postId]);

        if (result.affectedRows === 0) {
            logger.info('Post nie znaleziony');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Post o podanym ID nie istnieje' });
        }

        return res.status(statusCode.OK).json({
            message: `Post usunięty poprawnie`,
            postId
        })
    } catch (error) {
        logger.error('Nie udało się usunąć posta', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Nie udało się usunąć posta' });
    };
};