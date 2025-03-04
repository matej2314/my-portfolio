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
        return res.status(statusCode.BAD_REQUEST).json({ message: 'Enter the correct data!' });
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
        logger.info('Post added correctly!');
        return res.status(statusCode.CREATED).json({
            message: `Post ${postTitle} saved correctly.`,
            postId,
        })
    } catch (error) {
        logger.info('Adding new post error:', error.message);

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Internal server error: ${error.message}`
        });
    };
};

exports.getAllPosts = async (req, res) => {
    try {
        const [rows] = await pool.query(postsQueries.getAllPosts);

        if (rows.length === 0) {
            logger.error('No posts found.');
            return res.status(statusCode.NOT_FOUND).json({
                message: 'No posts found.'
            });
        };

        return res.status(statusCode.OK).json({ posts: rows });

    } catch (error) {
        logger.error('Posts fetching error:', error.message);

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error.'
        });
    };
};

exports.editPost = async (req, res) => {
    const { postId, postTitle, postLead, postContent } = req.body;
    let postImage = req.body.postImage;

    if (!postId || !postTitle || !postLead || postLead.trim() === '' || postTitle.trim() === '' || postContent.trim() === '') {
        logger.error('No required post details.');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter required post details!'
        });
    }

    postImage = postImage && postImage.trim() !== '' ? postImage : null;

    try {
        const [result] = await pool.query(postsQueries.editPost, [postTitle, postLead, postContent, postImage, postId]);
        logger.info('Post edited correctly!');
        return res.status(statusCode.OK).json({
            message: `Post ${postTitle} correctly updated.`,
            postId
        });
    } catch (error) {
        logger.error('Editing blog post error:', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            message: `Failed to edit blog post: ${postTitle}`
        });
    };
};

exports.deletePost = async (req, res) => {
    const { postId } = req.body;

    if (!postId || postId < 0) {
        logger.error('Enter the correct blog post details!');
        return res.status(statusCode.BAD_REQUEST).json({
            message: 'Enter the correct blog post details!'
        });
    };

    try {
        const [result] = await pool.query(postsQueries.deletePost, [postId]);

        if (result.affectedRows === 0) {
            logger.info('Blog post not found');
            return res.status(statusCode.NOT_FOUND).json({ message: 'Blog post not found.' });
        }

        return res.status(statusCode.OK).json({
            message: `Blog post deleted correctly.`,
            postId
        })
    } catch (error) {
        logger.error('Failed to delete blog post', error.message);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete blog post.' });
    };
};