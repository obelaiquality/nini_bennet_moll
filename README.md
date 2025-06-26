# Nini Book Reviews

This is a cosy book review website built with **Jekyll** and **Netlify CMS**.
It can be hosted for free on GitHub Pages and allows content editing through a
simple web interface provided by Netlify.

## Usage

1. Run `bundle exec jekyll serve` to preview the site locally.
2. Visit `http://localhost:4000/admin/` for the content manager. The CMS is
   configured with `local_backend: true` so you can log in and create posts
   without any extra setup.
3. Uploaded images are stored in `assets/images`.

## Structure
- `index.html` – homepage listing all book reviews
- `_layouts/` – templates used by Jekyll
- `_posts/` – markdown files for each book review
- `assets/` – CSS and images
- `admin/` – Netlify CMS configuration
