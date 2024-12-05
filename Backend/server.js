const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = process.env.SERV_PORT || 5051;
const cors = require('cors');
const logger = require('./logger.js');

app.use(express.json());

const allowedOrigins = ["http://185.170.196.107:5050", "https://msliwowski.net", "http://localhost:5173"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Nieautoryzowana domena!"));
        }
    },
    credentials: true,
}));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization',);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).end();
});

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
const authRoutes = require('./routes/auth.js');

app.use('/services', serviceRoutes);
app.use('/projects', projectsRoutes);
app.use('/posts', postsRoutes);
app.use('/skills', skillsRoutes);
app.use('/courses', coursesRoutes);
app.use('/data', dataRoutes);
app.use('/download', downloadRoutes);
app.use('/email', emailRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    logger.info(`BACKEND SERVER RUNNING. PORT ${port}`);
    console.log(`SERVER RUNNING ON PORT ${port}`);
});