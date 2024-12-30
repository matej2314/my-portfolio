import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import routes from './sitemapRoutes.js';

const generateSitemap = async () => {
  const smStream = new SitemapStream({ hostname: 'https://msliwowski.net' });

  // Pobierz trasy
  const siteRoutes = await routes();

  // Dodaj trasy do strumienia
  siteRoutes.forEach((route) => {
    smStream.write({
      url: route.path,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  });

  smStream.end();

  // Zapisz do pliku
  const sitemap = await streamToPromise(smStream);
  createWriteStream('./public/sitemap.xml').write(sitemap);
};

generateSitemap();
