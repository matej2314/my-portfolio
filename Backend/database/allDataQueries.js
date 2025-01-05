module.exports = [
    `SELECT 'posts' AS source, id, post_title AS title, post_lead, post_content AS content, post_date, COALESCE(post_imageName, '') AS post_imageName FROM posts ORDER BY id;`,
    `SELECT 'projects' AS source, id, project_name AS title, project_category AS category, project_URL AS link, project_screenName, goal AS goal, project_description AS description,
     repo AS repo, technologies, difficulty AS difficulty, end_date AS end_date, long_text AS long_text FROM projects;`,
    `SELECT 'services' AS source, id, serviceName AS title, serviceDescription AS description FROM services;`,
    `SELECT 'skills' AS source, id, skill_name AS title, skill_cat AS category, icon_name AS icon, icon_color as iconColor FROM skills;`,
    `Select 'courses' AS source, id, course_name AS title, course_date AS date, course_organizer AS organizer, course_category AS category FROM courses;`,
    `SELECT 'about_me' AS source, id, about_text AS aboutText FROM about_me;`,
    `SELECT 'interests' AS source, id, interest_name AS intName FROM interests;`,
];