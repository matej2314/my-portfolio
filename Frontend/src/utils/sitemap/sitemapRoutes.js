import { requestUrl } from '../../url.js';

const getProjectsUrl = requestUrl.projects.get;

const projectsData = async () => {
  try {
    const response = await fetch(getProjectsUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Sprawdzamy, czy dane zawierają właściwość `projects`
    if (!data.projects) {
      throw new Error('Brak danych o projektach');
    }

    // Zwracamy zmapowane dane projektów
    return data.projects.map(item => ({
      path: `/project/details/${item.id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return []; // Zwracamy pustą tablicę w razie błędu
  }
};

const routes = async (isMobile) => {
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

  // Pobieramy dynamiczne trasy
  const dynamicRoutes = await projectsData();
  
  // Używamy warunku isMobile tylko do określenia, która strona ma być na początku
  const homeRoute = isMobile
    ? { path: '/', changefreq: 'daily', priority: 1.0 }
    : { path: '/', changefreq: 'daily', priority: 1.0 };

  // Łączymy statyczne trasy z dynamicznymi
  const allRoutes = [homeRoute, ...baseRoutes, ...dynamicRoutes];

  // Logowanie wynikowych tras
  console.log('All Routes:', allRoutes);

  return allRoutes;
};


  
  export default routes;
  