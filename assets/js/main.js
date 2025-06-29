document.addEventListener('DOMContentLoaded', () => {
  // — Dark toggle (already in default.html) —

  // — Featured carousel auto-rotate —
  const featured = Array.from(document.querySelectorAll('.featured-card'));
  let idx = 0;
  function showFeatured(i) {
    featured.forEach((c, j) => c.classList.toggle('active', j === i));
  }
  if (featured.length) {
    showFeatured(0);
    setInterval(() => {
      idx = (idx + 1) % featured.length;
      showFeatured(idx);
    }, 4000);
  }

  // — Filters & Sorting —
  const posts        = Array.from(document.querySelectorAll('.review-card'));
  const searchInput  = document.getElementById('search');
  const authorFilter = document.getElementById('author-filter');
  const genreFilter  = document.getElementById('genre-filter');
  const tagFilter    = document.getElementById('tag-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const yearFilter   = document.getElementById('year-filter');
  const sortOrder    = document.getElementById('sort-order');
  const reviewsParent= document.querySelector('.reviews');

  function applyFiltersAndSort() {
    const q = searchInput.value.toLowerCase();
    const a = authorFilter.value;
    const g = genreFilter.value;
    const t = tagFilter.value;
    const r = parseFloat(ratingFilter.value) || 0;
    const y = yearFilter.value;

    let visible = posts.filter(card => {
      const title   = card.querySelector('h2').textContent.toLowerCase();
      const excerpt = (card.dataset.excerpt||'').toLowerCase();
      const auth    = card.dataset.author;
      const genre   = card.dataset.genre;
      const tags    = (card.dataset.tags||'').split(',');
      const rating  = parseFloat(card.dataset.rating)||0;
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
    visible.sort((A,B) => {
      const revA = A.dataset.reviewDate;
      const revB = B.dataset.reviewDate;
      const ratA = parseFloat(A.dataset.rating)||0;
      const ratB = parseFloat(B.dataset.rating)||0;
      if (order==='newest')      return revB.localeCompare(revA);
      if (order==='oldest')      return revA.localeCompare(revB);
      if (order==='high-rating') return ratB - ratA;
      if (order==='low-rating')  return ratA - ratB;
      return 0;
    });

    // Re-render
    reviewsParent.innerHTML = '';
    visible.forEach(card => reviewsParent.appendChild(card));
  }

  [searchInput, authorFilter, genreFilter, tagFilter, ratingFilter, yearFilter, sortOrder]
    .forEach(el => el.addEventListener('input', applyFiltersAndSort));

  applyFiltersAndSort();
});
