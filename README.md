# Nini Book Reviews

This is a cosy book review website built with **Jekyll** and **Netlify CMS**.
Deploy it to Netlify or GitHub Pages and manage content through the
Netlify CMS interface.

## Usage

1. Deploy the site and visit `/admin/` to log in with your Git provider.
   Book reviews are created in Markdown and images are uploaded to
   `assets/images` automatically.
2. (Optional) Run `bundle exec jekyll serve` to preview the site locally.

## Structure
- `index.html` – homepage listing all book reviews
- `_layouts/` – templates used by Jekyll
- `_posts/` – markdown files for each book review
- `assets/` – CSS and images
- `admin/` – Netlify CMS configuration
