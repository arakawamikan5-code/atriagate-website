# atriagate website — maintenance handoff

## Source and production
- Source of truth: https://github.com/arakawamikan5-code/atriagate-website, branch main.
- Production: https://atriagate.co.jp/
- Hosting: Cloudflare Pages project atriagate-website.
- Pages URL: https://atriagate-website.pages.dev/
- Production automatically deploys from main. Framework None, no build command, output directory ".".
- On 2026-09-30 the custom domain was verified Active with SSL enabled and the corrected email and all three leader comments were checked on the production domain.
- The old ChatGPT Sites project is not the current production deployment. Do not switch hosting back to it.
- This is a static restoration of the original public site, not the original React/Vinext source.

## User workflow preferences
- The user wants requested site edits started promptly without repeating setup or requesting existing site files.
- First read the latest GitHub main and this file. Do not rely on an old local checkout.
- For an explicit routine site edit request, preserve the design, implement the requested change, check the relevant PC/mobile layouts, commit to main and verify the automatic deployment unless the user asks for preview-only or no publication.
- Clarify genuinely ambiguous content or material changes; do not repeatedly ask for permission already given.
- If authentication expires, explain the exact missing login. Do not claim the site must be rebuilt or ask the user for source files already in GitHub.
- Distinguish a saved GitHub commit from a completed production deployment.

## Files
- index.html: homepage.
- business/sales/index.html: 齋藤将吾.
- business/event/index.html: 山下翔.
- business/bar/index.html: やんばる.
- business/social/index.html: SNS division. No leader comment was supplied for this page.
- assets/site.css: original design; assets/improvements.css: layout refinements.
- assets/site.js: standalone menu and gallery behavior.
- images/ and og.png: public image assets.
- robots.txt and sitemap.xml: crawl settings.
- package.json and server.cjs: dependency-free local preview (npm start, port 4173).

## Content and checks
- Contact email everywhere, including mailto and structured data: atriagate.0905@gmail.com.
- Preserve the user-supplied leader comments, Japanese company naming, canonical URLs and search verification tags.
- Check changed pages at desktop and mobile widths; original verification used 1440, 390 and 320 pixels.
- Check images, no horizontal overflow, menu behavior, mail links and structured data as relevant.
- GitHub integration previously returned 403 because the GitHub App was authorized but not installed. The user installed it for this repository and writes succeeded.
- The local original restore commit differs from GitHub history: fetch/rebase or use the GitHub APIs with current file SHAs; never force-push the old local main.
- Public launch source commit: 4db1e3b918fd1e24264d6d2542af7453f4a79e71.
