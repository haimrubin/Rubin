# Haim Rubin — Portfolio

Premium developer portfolio built with Next.js, TypeScript, and SCSS. All content is driven by JSON data files — no CMS or database required.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Projects

Edit `data/projects.json` — add a new object to the `projects` array:

```json
{
  "id": "project-009",
  "slug": "my-project",
  "title": "Project Title",
  "client": "Client Name",
  "year": "2026",
  "category": "Websites",
  "description": "Short description.",
  "url": "https://example.com",
  "technologies": ["WordPress", "PHP"],
  "featured": false,
  "iframe": true,
  "preview": "/projects/my-project.webp"
}
```

Add a preview image to `public/projects/`.

## Site Configuration

Edit `data/site.json` for personal info, contact links, and stats.

## Deploy

Deploy to [Vercel](https://vercel.com) — zero config required.

```bash
npm run build
```
