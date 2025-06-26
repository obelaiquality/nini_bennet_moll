# Nini Book Reviews

This is a cosy book review website built with **Jekyll** and **Netlify CMS**.
Deploy it to Netlify or GitHub Pages and manage content through the Netlify
CMS interface. When hosting on GitHub Pages the CMS needs to commit directly to
your repository, so the `admin/config.yml` file uses the GitHub backend with a
placeholder repository value. Replace `yourusername/nini_bennet_moll` with your
own GitHub repository before going live.

## Usage

1. Deploy the site and visit `/admin/` to log in with your GitHub account.
   Book reviews are created in Markdown and images are uploaded to
   `assets/images` automatically. Ensure the backend configuration in
   `admin/config.yml` points to your repository so the CMS can save posts.
2. (Optional) Run `bundle exec jekyll serve` to preview the site locally.

## Structure
- `index.html` – homepage listing all book reviews
- `_layouts/` – templates used by Jekyll
- `_posts/` – markdown files for each book review
- `assets/` – CSS and images
- `admin/` – Netlify CMS configuration
