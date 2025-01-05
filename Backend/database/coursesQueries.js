module.exports = {
    addNewCourse: 'INSERT INTO courses (id, course_name, course_date, course_organizer, course_category) VALUES (?, ?, ?, ?, ?)',
    getAllCourses: 'SELECT * FROM courses ORDER BY id',
    deleteCourse: 'DELETE from courses WHERE id=?',
}