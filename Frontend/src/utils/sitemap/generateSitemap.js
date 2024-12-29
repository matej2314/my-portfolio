import { SitemapStream } from 'sitemap';
import fs from 'fs';
import routes from './sitemapRoutes.js';  // Funkcja routes, którą masz

const generateSitemap = async () => {
  try {
    const allRoutes = await routes(false); // false, jeśli chcesz wersję desktopową

    // Sprawdzamy dokładnie, co zawiera allRoutes
    console.log('All Routes:', allRoutes);

    // Teraz filtrujemy undefined i inne nieprawidłowe ścieżki
    const validRoutes = allRoutes.filter(route => route && route.path);

    // Logujemy po przefiltrowaniu
    console.log('Valid Routes:', validRoutes);

    if (validRoutes.length === 0) {
      throw new Error('Brak prawidłowych tras do wygenerowania mapy witryny');
    }

    const sitemap = new SitemapStream({ hostname: 'https://msliwowski.net' }); // Podstawowy adres
    const writeStream = fs.createWriteStream('./public/sitemap.xml');

    sitemap.pipe(writeStream);

    // Przechodzimy po wszystkich trasach i dodajemy pełny URL
    validRoutes.forEach(route => {
      const fullUrl = `https://msliwowski.net${route.path}`;

      console.log('Writing route:', { path: fullUrl, changefreq: route.changefreq, priority: route.priority });

      // Zapisujemy pełny URL
      sitemap.write({
        path: fullUrl,
        changefreq: route.changefreq,
        priority: route.priority
      });
    });

    sitemap.end();

    console.log('Mapa witryny została wygenerowana!');
  } catch (error) {
    console.error('Błąd podczas generowania mapy witryny:', error);
  }
};

generateSitemap();
