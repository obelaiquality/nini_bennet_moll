document.addEventListener('DOMContentLoaded', () => {
  // Review cards and filter controls
  const posts        = document.querySelectorAll('.review-card');
  const searchInput  = document.getElementById('search');
  const authorFilter = document.getElementById('author-filter');
  const genreFilter  = document.getElementById('genre-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const yearFilter   = document.getElementById('year-filter');
  const darkToggle   = document.getElementById('theme-toggle');

  // Dark mode toggle
  if (darkToggle) {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('theme-dark');
    }
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('theme-dark');
      localStorage.setItem('dark', isDark);
    });
  }

  // Filtering function
  function filterPosts() {
    const q = searchInput.value.toLowerCase();
    const a = authorFilter.value;
    const g = genreFilter.value;
    const r = parseFloat(ratingFilter.value) || 0;
    const y = yearFilter.value;

    posts.forEach(card => {
      const title   = card.querySelector('h2').textContent.toLowerCase();
      const excerpt = (card.dataset.excerpt || '').toLowerCase();
      const auth    = card.dataset.author;
      const genre   = card.dataset.genre;
      const rating  = parseFloat(card.dataset.rating) || 0;
      const year    = card.dataset.year;

      const okQuery  = title.includes(q) || excerpt.includes(q);
      const okAuthor = !a || auth === a;
      const okGenre  = !g || genre === g;
      const okRating = !ratingFilter.value || rating >= r;
      const okYear   = !y || year === y;

      card.style.display = (okQuery && okAuthor && okGenre && okRating && okYear)
        ? ''
        : 'none';
    });
  }

  // Listen for filter changes
  [searchInput, authorFilter, genreFilter, ratingFilter, yearFilter]
    .forEach(el => el.addEventListener('input', filterPosts));

  // Initial run
  filterPosts();
});
