module.exports = {
    getAllDescs: 'SELECT * from about_me ORDER BY id',
    addNewDesc: 'INSERT INTO about_me (id, about_text) VALUES(?,?)',
    deleteDesc: 'DELETE FROM about_me WHERE id=?',
    updateDesc: 'UPDATE about_me SET about_text=?',
};