# atriagate website

Restored from the public https://atriagate.co.jp/ pages on 2026-09-30 with the owner's authorization. This is a maintainable static restoration, not the original React/Vinext source repository.

## Editing

- `index.html`: homepage
- `business/{sales,social,event,bar}/index.html`: division pages
- `assets/site.css`: original public stylesheet
- `assets/improvements.css`: accessibility and responsive refinements
- `assets/site.js`: standalone menu, section navigation and photo scrolling
- `images/`, `og.png`: locally stored public site images
- `robots.txt`, `sitemap.xml`: search crawler settings

All visible email links and organization metadata use `atriagate.0905@gmail.com`. The sales, event and bar pages contain the supplied leader comments. Original metadata, canonical URLs and Google verification are preserved; page-specific social metadata and WebPage structured data are included. Sitemap modification dates are omitted rather than falsely reporting every request as an update.

## Preview and hosting

Run `npm start` with Node.js, then visit http://127.0.0.1:4173. There are no package dependencies or build step. Publish the static HTML, `assets`, `images`, `og.png`, `robots.txt`, and `sitemap.xml` using directory-index routing. Configure the public domain separately; a GitHub commit does not itself change domain or hosting settings. `server.cjs` is a local preview server, not a production server.

The existing public site is left untouched. Do not replace this restoration with an old site backup. Review the restored pages before switching production hosting.
