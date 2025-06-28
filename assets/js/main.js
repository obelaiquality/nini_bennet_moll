document.addEventListener('DOMContentLoaded', () => {
  const posts        = Array.from(document.querySelectorAll('.review-card'));
  const searchInput  = document.getElementById('search');
  const authorFilter = document.getElementById('author-filter');
  const genreFilter  = document.getElementById('genre-filter');
  const tagFilter    = document.getElementById('tag-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const yearFilter   = document.getElementById('year-filter');
  const sortOrder    = document.getElementById('sort-order');
  const darkToggle   = document.getElementById('theme-toggle');
  const reviewsParent= document.querySelector('.reviews');

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

  function applyFiltersAndSort() {
    const q = searchInput.value.toLowerCase();
    const a = authorFilter.value;
    const g = genreFilter.value;
    const t = tagFilter.value;
    const r = parseFloat(ratingFilter.value) || 0;
    const y = yearFilter.value;

    let visible = posts.filter(card => {
      const title   = card.querySelector('h2').textContent.toLowerCase();
      const excerpt = (card.dataset.excerpt || '').toLowerCase();
      const auth    = card.dataset.author;
      const genre   = card.dataset.genre;
      const tags    = (card.dataset.tags || '').split(',');
      const rating  = parseFloat(card.dataset.rating) || 0;
      const year    = card.dataset.year;

      return (title.includes(q) || excerpt.includes(q))
          && (!a || auth === a)
          && (!g || genre === g)
          && (!t || tags.includes(t))
          && (!ratingFilter.value || rating >= r)
          && (!y || year === y);
    });

    // Sort
    const order = sortOrder.value;
    visible.sort((a, b) => {
      const revA = a.dataset.reviewDate;
      const revB = b.dataset.reviewDate;
      const ratA = parseFloat(a.dataset.rating) || 0;
      const ratB = parseFloat(b.dataset.rating) || 0;
      if (order === 'newest')      return revB.localeCompare(revA);
      if (order === 'oldest')      return revA.localeCompare(revB);
      if (order === 'high-rating') return ratB - ratA;
      if (order === 'low-rating')  return ratA - ratB;
      return 0;
    });

    // Re-render
    reviewsParent.innerHTML = '';
    visible.forEach(card => reviewsParent.appendChild(card));
  }

  // Event listeners
  [searchInput, authorFilter, genreFilter, tagFilter, ratingFilter, yearFilter, sortOrder]
    .forEach(el => el.addEventListener('input', applyFiltersAndSort));

  applyFiltersAndSort();
});
