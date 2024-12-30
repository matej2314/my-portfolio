import { requestUrl } from '../../url.js';

const getProjectsUrl = requestUrl.projects.get;

const getIds = async () => {
  const response = await fetch(getProjectsUrl);
  const data = await response.json();
  const projects = data.projects;

  const dynamicRoutes = projects.map((project) => ({
    path: `/project/details/${project.id}`,
    changefreq: 'weekly',
    priority: 0.7,
  }));

  return dynamicRoutes;
};

const routes = async () => {

  const homeRoute = { path: '/', changefreq: 'daily', priority: 1.0 };

    const baseRoutes = [
      { path: '/portfolio', changefreq: 'weekly', priority: 0.8 },
      { path: '/blog', changefreq: 'weekly', priority: 0.8 },
      { path: '/contact', changefreq: 'monthly', priority: 0.6 },
      { path: '/projects', changefreq: 'weekly', priority: 0.8 },
      { path: '/login_admin', changefreq: 'monthly', priority: 0.5 },
      { path: '/cms', changefreq: 'monthly', priority: 0.5 },
      { path: '*', changefreq: 'yearly', priority: 0.1 }
    ];
  
 const dynamicRoutes = await getIds();
  
    return [homeRoute, ...baseRoutes, ...dynamicRoutes];
  };
  
  export default routes;
  