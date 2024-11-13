const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../db.js');
const logger = require('../logger.js');

router.use(bodyParser.json());

router.get('/all', (req, res) => {

  const queryPosts = `SELECT 'posts' AS source, p.id, p.post_title AS title, p.post_content AS description, p.post_imageName AS details FROM posts p`;
  const queryProjects = `SELECT 'projects' AS source, pr.id, pr.project_name AS title, pr.project_category AS description, pr.project_URL AS details, pr.project_screenName FROM projects pr`;
  const queryServices = `SELECT 'services' AS source, s.id, s.serviceName AS title, s.serviceDescription AS description FROM services s`;

  pool.query(queryPosts, (error, posts) => {
    if (error) {
      logger.error('Błąd pobierania danych z tabeli posts', error.message);
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

       
        const allData = [...posts, ...projects, ...services];

        if (allData.length === 0) {
          return res.status(204).json({ message: 'Brak danych' });
        }

        logger.info('Wszystkie dane pobrane');
        return res.status(200).json({ data: allData });
      });
    });
  });
});

module.exports = router;
