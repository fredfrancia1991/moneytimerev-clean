

const BASE_URL = "https://moneytimerev.fr"; // Remplace par ton domaine

// Ajoute ici toutes tes routes à indexer dans le sitemap
const pages = [
  "",
  "diagnostic",
  "coaching",
  "offres",
  "contact",
  // ajoute d'autres routes si besoin
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("")}
</urlset>`;

const path = require('path');
const fs = require('fs');

fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), sitemap);


console.log("✅ Sitemap généré dans public/sitemap.xml");