const express = require('express');
const router = express.Router();
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(express.json());

router.get('/all', async (req, res) => {
  const queries = [
    `SELECT 'posts' AS source, id, post_title AS title, post_content AS content, post_date, COALESCE(post_imageName, '') AS post_imageName FROM posts ORDER BY id;`,
    `SELECT 'projects' AS source, pr.id, pr.project_name AS title, pr.project_category AS category, pr.project_URL AS link, pr.project_screenName, pr.project_description AS description, pr.repo AS repo, pr.long_text AS long_text FROM projects pr;`,
    `SELECT 'services' AS source, s.id, s.serviceName AS title, s.serviceDescription AS description FROM services s;`,
    `SELECT 'skills' AS source, s.id, s.skill_name AS title, s.skill_cat AS category, s.icon_name AS icon, s.icon_color as iconColor FROM skills s;`,
    `Select 'courses' AS source, c.id, c.course_name AS title, c.course_date AS date, c.course_organizer AS organizer, c.course_category AS category FROM courses c;`
  ];

  try {
    const results = await Promise.all(queries.map(query => pool.query(query)));

    const allData = {
      posts: results[0][0],  
      projects: results[1][0],
      services: results[2][0],
      skills: results[3][0],
      courses: results[4][0],
    };

    if (Object.values(allData).every(arr => arr.length === 0)) {
      return res.status(204).json({ message: 'Brak danych' });
    }

    logger.info('Wszystkie dane pobrane');
    return res.status(200).json({ data: allData });
  } catch (error) {
    logger.error('Błąd pobierania danych', error.message);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
});

module.exports = router;
