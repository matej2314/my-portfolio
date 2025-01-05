module.exports = {
    getAllInterests: 'SELECT * FROM interests ORDER BY id',
    addNewInterest: 'INSERT INTO interests (id, interest_name) VALUES(?,?)',
    deleteInterest: 'DELETE FROM interests WHERE id=? AND interest_name=?',
};