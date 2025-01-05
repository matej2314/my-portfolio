module.exports = {
    addPostWithImg: 'INSERT INTO posts (id, post_title, post_lead, post_content, post_imageName) VALUES(?,?,?,?,?)',
    addPostNoImg: 'INSERT INTO posts (id, post_title, post_lead, post_content) VALUES(?,?,?)',
    getAllPosts: 'SELECT * FROM posts ORDER BY id',
    editPost: 'UPDATE posts SET post_title=?, post_lead=?, post_content=?, post_imageName=? WHERE id=?',
    deletePost: 'DELETE from posts WHERE id=?',
}