const routes = (isMobile) => {
    const baseRoutes = [
      { path: '/', changefreq: 'daily', priority: 1.0 },
      { path: '/portfolio', changefreq: 'weekly', priority: 0.8 },
      { path: '/blog', changefreq: 'weekly', priority: 0.8 },
      { path: '/contact', changefreq: 'monthly', priority: 0.6 },
      { path: '/projects', changefreq: 'weekly', priority: 0.8 },
      { path: '/login_admin', changefreq: 'monthly', priority: 0.5 },
      { path: '/cms', changefreq: 'monthly', priority: 0.5 },
      { path: '*', changefreq: 'yearly', priority: 0.1 }
    ];
  
    const dynamicRoutes = [
      { path: '/project/details/417438eb-d942-41fb-83ce-dea97f8625be', changefreq: 'weekly', priority: 0.7 },
      { path: '/project/details/7df7a12e-3a96-4161-a550-d7f1d5e38319', changefreq: 'weekly', priority: 0.7 },
      { path: '/project/details/c5469db4-83d3-4edd-b891-74826efe39e9', changefreq: 'weekly', priority: 0.7 },
      { path: '/project/details/dfad08a3-7d33-49db-9430-ffb2f2ee0191', changefreq: 'weekly', priority: 0.7 },
      
    ];
  
    // Użyj PortfolioPage dla mobilnych i MainPage dla desktopowych
    const homeRoute = isMobile
      ? { path: '/', changefreq: 'daily', priority: 1.0 }
      : { path: '/', changefreq: 'daily', priority: 1.0 };
  
    return [homeRoute, ...baseRoutes, ...dynamicRoutes];
  };
  
  export default routes;
  