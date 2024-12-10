const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(express.json());

router.get('/collection', async (req, res) => {
  const queries = [
    `SELECT 'posts' AS source, id, post_title AS title, post_lead, post_content AS content, post_date, COALESCE(post_imageName, '') AS post_imageName FROM posts ORDER BY id;`,
    `SELECT 'projects' AS source, id, project_name AS title, project_category AS category, project_URL AS link, project_screenName, project_description AS description,
     repo AS repo, technologies AS technologies, difficulty AS difficulty, end_date AS end_date, long_text AS long_text FROM projects;`,
    `SELECT 'services' AS source, id, serviceName AS title, serviceDescription AS description FROM services;`,
    `SELECT 'skills' AS source, id, skill_name AS title, skill_cat AS category, icon_name AS icon, icon_color as iconColor FROM skills;`,
    `Select 'courses' AS source, id, course_name AS title, course_date AS date, course_organizer AS organizer, course_category AS category FROM courses;`,
    `SELECT 'about_me' AS source, id, about_text AS aboutText FROM about_me;`,
    `SELECT 'interests' AS source, id, interest_name AS intName FROM interests;`,
  ];

  try {
    const results = await Promise.all(queries.map(query => pool.query(query)));

    const allData = {
      posts: results[0][0],  
      projects: results[1][0],
      services: results[2][0],
      skills: results[3][0],
      courses: results[4][0],
      about: results[5][0],
      interests: results[6][0],
    };

    if (Object.values(allData).every(arr => arr.length === 0)) {
      return res.status(204).json({ message: 'Brak danych' });
    }

    logger.info('Wszystkie dane pobrane');
    return res.status(200).json({ data: allData });
  } catch (error) {
    logger.error('Błąd pobierania danych', error.stack);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;
