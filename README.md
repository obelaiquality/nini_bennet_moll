# Nini Book Reviews

This is a cosy book review website built with **Jekyll** and **Netlify CMS**.
The homepage now includes simple search and filtering options so visitors can
quickly find reviews by author or topic.
Deploy it to Netlify or GitHub Pages and manage content through the Netlify
CMS interface. When hosting on GitHub Pages the CMS needs to commit directly to
your repository, so the `admin/config.yml` file uses the GitHub backend with a
placeholder repository value. Replace `yourusername/nini_bennet_moll` with your
own GitHub repository before going live.

If you host the site at `https://<username>.github.io/nini_bennet_moll`, make
sure the Jekyll `baseurl` in `_config.yml` matches the repository name. The
included configuration sets `baseurl: "/nini_bennet_moll"` so links resolve
correctly on GitHub Pages.

## Usage

1. Deploy the site and visit `/admin/` (e.g. `https://<username>.github.io/nini_bennet_moll/admin/`) to log in with your GitHub account.
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

## New Features

- Filter posts by author or tags directly on the homepage.
- Optional author biography section per review.
- Netlify CMS configuration updated to support tags and author bios.
