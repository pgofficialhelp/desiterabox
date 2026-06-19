#!/usr/bin/env node
/**
 * DesiTeraBox – Sitemap Generator
 * Run: node generate-sitemap.js
 * Outputs: sitemap-videos.xml
 */

const fs   = require('fs');
const path = require('path');

const API_URL   = 'https://tera-links-backend.dailyweb577.workers.dev/video-links?page=1';
const BASE_URL  = 'https://desiterabox.com';
const OUT_FILE  = path.join(__dirname, 'sitemap-videos.xml');

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

async function generate() {
  console.log('Fetching videos from API…');
  const res  = await fetch(API_URL);
  const json = await res.json();

  if (!json.success || !Array.isArray(json.data)) {
    console.error('Bad API response');
    process.exit(1);
  }

  const videos = json.data;
  console.log(`Found ${videos.length} videos. Generating sitemap…`);

  const now = new Date().toISOString().split('T')[0];

  const urls = videos.map(v => {
    const slug = slugify(v.title) + '-' + v.id;
    const loc  = `${BASE_URL}/video/${slug}`;
    const thumb = v.thumbnail ? `
    <image:image>
      <image:loc>${escXml(v.thumbnail)}</image:loc>
      <image:title>${escXml(v.title)}</image:title>
    </image:image>` : '';
    return `  <url>
    <loc>${escXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${thumb}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(OUT_FILE, xml, 'utf8');
  console.log(`✅ Written ${videos.length} URLs to sitemap-videos.xml`);
}

function escXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

generate().catch(err => { console.error(err); process.exit(1); });
