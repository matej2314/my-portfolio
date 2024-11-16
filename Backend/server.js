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


const serviceRoutes = require('./routes/serviceRoutes.js');
const projectsRoutes = require('./routes/projectsRoutes.js');
const postsRoutes = require('./routes/postRoutes.js');
const dataRoutes = require('./routes/dataRoutes.js');
const skillsRoutes = require('./routes/skillsRoutes.js')

app.use('/services', serviceRoutes);
app.use('/projects', projectsRoutes);
app.use('/posts', postsRoutes);
app.use('/skills', skillsRoutes);
app.use('/data', dataRoutes);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './CMS', 'index.html'));
});

app.get('/main', (req, res) => {
	res.sendFile(path.join(__dirname, './CMS', 'main.html'));
});

app.listen(port, () => {
    logger.info(`BACKEND SERVER RUNNING. PORT ${port}`);
    console.log(`SERVER RUNNING ON PORT ${port}`);
});