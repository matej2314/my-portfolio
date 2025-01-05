module.exports = {
    registerAdminCheck: 'SELECT * FROM users WHERE role = "admin" LIMIT 1',
    register: 'INSERT INTO users SET ?',
    login: 'SELECT * FROM users WHERE email = ?',
}