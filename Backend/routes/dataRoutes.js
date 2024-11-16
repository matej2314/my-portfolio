const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(bodyParser.json());

router.get('/all', (req, res) => {
  const queryPosts = `
    SELECT 'posts' AS source, id, post_title AS title, post_content AS description, post_date, COALESCE(post_imageName, '') AS post_imageName FROM posts ORDER BY id;`;
  const queryProjects = `SELECT 'projects' AS source, pr.id, pr.project_name AS title, pr.project_category AS description, pr.project_URL AS details, pr.project_screenName FROM projects pr;`;
  const queryServices = `SELECT 'services' AS source, s.id, s.serviceName AS title, s.serviceDescription AS description FROM services s;`;
  const querySkills = `SELECT 'skills' AS source, s.id, s.skill_name AS title, s.skill_cat AS category, s.skill_level AS level FROM skills s;`;

  pool.query(queryPosts, (error, posts) => {
    if (error) {
      logger.error('Błąd pobierania danych z tabeli posts', error.code);
      return res.status(500).json({ message: 'Błąd serwera' });
    }

    pool.query(queryProjects, (error, projects) => {
      if (error) {
        logger.error('Błąd pobierania danych z tabeli projects', error.message);
        return res.status(500).json({ message: 'Błąd serwera' });
      }

      pool.query(queryServices, (error, services) => {
        if (error) {
          logger.error('Błąd pobierania danych z tabeli services', error.message);
          return res.status(500).json({ message: 'Błąd serwera' });
        }

        pool.query(querySkills, (error, skills) => {
          if (error) {
            logger.error('Błąd pobierania danych z tabeli skills', error.message);
            return res.status(500).json({ message: 'Błąd serwera' });
          }

          const allData = {
            posts: posts,
            projects: projects,
            services: services,
            skills: skills,
          };

          if (Object.values(allData).every(arr => arr.length === 0)) {
            return res.status(204).json({ message: 'Brak danych' });
          }

          logger.info('Wszystkie dane pobrane');
          return res.status(200).json({ data: allData });
        });
      });
    });
  });
});

module.exports = router;
