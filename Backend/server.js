const path = require('path');
const dotenv = require('dotenv').config({ path: './.env' });
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.SERV_PORT || 5051;
const cors = require('cors');
const logger = require('./logger.js');

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'CMS')));
app.use('/images',express.static(path.join(__dirname, 'projects-photos')));
app.use('/blog-photos', express.static(path.join(__dirname, 'blog')));

const serviceRoutes = require('./routes/serviceRoutes.js');
const projectsRoutes = require('./routes/projectsRoutes.js');
const postsRoutes = require('./routes/postRoutes.js');
const dataRoutes = require('./routes/dataRoutes.js');
const skillsRoutes = require('./routes/skillsRoutes.js');
const coursesRoutes = require('./routes/coursesRoutes.js');
const downloadRoutes = require('./routes/downloadRoute.js');
const emailRoutes = require('./routes/emailRoutes.js')

app.use('/services', serviceRoutes);
app.use('/projects', projectsRoutes);
app.use('/posts', postsRoutes);
app.use('/skills', skillsRoutes);
app.use('/courses', coursesRoutes);
app.use('/data', dataRoutes);
app.use('/download', downloadRoutes);
app.use('/email', emailRoutes);

app.listen(port, () => {
    logger.info(`BACKEND SERVER RUNNING. PORT ${port}`);
    console.log(`SERVER RUNNING ON PORT ${port}`);
});