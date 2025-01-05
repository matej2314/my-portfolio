module.exports = {
    addNewSkill: 'INSERT into skills (id, skill_name, skill_cat, icon_name, icon_color) VALUES (?, ?, ?, ?, ?)',
    getAllSkills: 'SELECT * FROM skills ORDER BY id',
    deleteSkill: 'DELETE FROM skills WHERE id=?',
};