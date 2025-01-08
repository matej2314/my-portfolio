# Project: My Portfolio + CMS (fullstack)

![main-page-portfolio](https://api.msliwowski.net/images/dfad08a3-7d33-49db-9430-ffb2f2ee0191/mainpage.png)

Link to the page of the project: https://msliwowski.net

## Idea of the project

After a half year of learning JS, I decided to start use React.js as a frontend framework. The first project created with React is this Portfolio. It's my personal website which show my projects, skills and courses I took.

## Functionality

It's a fullstack project, but every user after getting to my page will see frontend app which only shows data and allow to contact with me. To make easier editing data, I created simple CMS. This middle app allows to change every single part of data displayed on main page. Also I made simple API server which deliver all data and is responsible for communication with the database.

## Tech stack/libraries

  1. Frontend + CMS

     - React.js,
     - tailwindcss,
     - sitemap,
     - package of visx libraries,
     - react-router-dom,
     - react-ga4,
     - framer-motion.

  2. Backend/API

     - Express.js,
     - bcrypt,
     - googleapis,
     - jsonwebtoken,
     - winston,
     - multer.

  3. DevOps

     - Docker,
     - Jenkins.

## Installation

  1. Clone repository.
  2. Run 'docker-compose.yml' file from main directory.

  Or:

  1. Clone repository. 
  2. Build image based on the Dockerfile from selected part of the project.
  3. Build container based on builded image. 
