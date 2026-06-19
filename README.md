# DesiTeraBox 🎬

A modern, fully responsive, SEO-optimized video streaming website.

---

## 📁 File Structure

```
desiterabox/
├── index.html            ← Main SPA (all pages handled via JS routing)
├── manifest.json         ← PWA manifest
├── sw.js                 ← Service Worker (PWA + offline cache)
├── robots.txt            ← SEO robots config
├── sitemap.xml           ← Static pages sitemap
├── generate-sitemap.js   ← Script to generate video sitemap
└── README.md
```

---

## 🚀 Quick Start

1. **Update the API URL** in `index.html`:
   ```js
   const CONFIG = {
     API_URL: 'https://your-api.com/videos',   // ← Your real API
     PLAYER_BASE: 'https://www.tcloudplay.com/?url=',
     ...
   };
   ```

2. **Register Service Worker** – add this just before `</body>` in `index.html`:
   ```html
   <script>
     if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('/sw.js');
     }
   </script>
   ```

3. **Generate the video sitemap:**
   ```bash
   node generate-sitemap.js
   ```

4. **Deploy** to any static host:
   - Vercel: `vercel --prod`
   - Netlify: drag & drop the folder
   - Cloudflare Pages: connect Git repo

---

## 📺 HilltopAds Integration

Replace the placeholder `<!-- HilltopAds ... -->` comments with your actual HilltopAds script tags:

**Top Banner (728×90)** – in `#hilltop-top` div  
**Mid-Feed (600×90)** – in `.ad-mid-feed` divs (auto-injected every 6 videos)  
**Sticky Bottom (320×50/90)** – in `#hilltop-bottom` div  

```html
<!-- Example HilltopAds snippet -->
<script>
  (function() {
    var s = document.createElement('script');
    s.src = '//YOUR_HILLTOPADS_ZONE_URL.js';
    s.async = true;
    document.getElementById('hilltop-top').appendChild(s);
  })();
</script>
```

---

## 🔍 SEO Checklist

- [x] Dynamic `<title>` and `<meta description>` per video
- [x] OpenGraph + Twitter Card tags
- [x] Canonical URLs
- [x] robots.txt
- [x] sitemap.xml (static) + generate-sitemap.js (dynamic videos)
- [x] Lazy loading images (`loading="lazy"` + IntersectionObserver)
- [x] Semantic HTML5 (`<article>`, `<header>`, `<main>`, `<nav>`, `<footer>`)
- [x] aria-labels for accessibility
- [x] Clean URL structure `/video/slug-id`
- [x] `history.pushState` for SPA navigation
- [x] Mobile-first responsive design
- [x] PWA installable

---

## ⚡ Performance Tips

- Host thumbnails on a CDN (Cloudflare Images, BunnyCDN)
- Enable Brotli / gzip compression on your server
- Add `Cache-Control: max-age=3600` headers for static assets
- Use Cloudflare or a similar CDN in front of the origin

---

## 📱 PWA Icons

Generate icons at https://realfavicongenerator.net/ and place them in `/icons/`:
- icon-72.png, icon-96.png, icon-128.png, icon-144.png, icon-192.png, icon-512.png

---

## 🛠 Customization

| What | Where |
|------|-------|
| Brand colors | CSS `:root` variables at top of `<style>` |
| Videos per page | `CONFIG.PAGE_SIZE` |
| Ad frequency | `CONFIG.AD_EVERY_N` |
| Player URL | `CONFIG.PLAYER_BASE` |
| Domain | Replace `desiterabox.com` globally |

---

## 📄 License

© 2025 DesiTeraBox. All rights reserved.
