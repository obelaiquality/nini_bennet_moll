document.addEventListener('DOMContentLoaded', () => {
  const posts         = Array.from(document.querySelectorAll('.review-card'));
  const searchInput   = document.getElementById('search');
  const authorFilter  = document.getElementById('author-filter');
  const genreFilter   = document.getElementById('genre-filter');
  const tagFilter     = document.getElementById('tag-filter');
  const ratingFilter  = document.getElementById('rating-filter');
  const yearFilter    = document.getElementById('year-filter');
  const sortOrder     = document.getElementById('sort-order');
  const reviewsParent = document.querySelector('.reviews');

  // new buttons
  const alphaAscBtn   = document.getElementById('sort-alpha-asc');
  const alphaDescBtn  = document.getElementById('sort-alpha-desc');
  const ratingAscBtn  = document.getElementById('sort-rating-asc');
  const ratingDescBtn = document.getElementById('sort-rating-desc');

  function applyFiltersAndSort(orderOverride) {
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

    // decide sort key
    const order = orderOverride || sortOrder.value;

    visible.sort((A, B) => {
      const revA = A.dataset.reviewDate;
      const revB = B.dataset.reviewDate;
      const ratA = parseFloat(A.dataset.rating) || 0;
      const ratB = parseFloat(B.dataset.rating) || 0;
      const titleA = A.querySelector('h2').textContent.toLowerCase();
      const titleB = B.querySelector('h2').textContent.toLowerCase();

      switch(order) {
        case 'newest':      return revB.localeCompare(revA);
        case 'oldest':      return revA.localeCompare(revB);
        case 'high-rating': return ratB - ratA;
        case 'low-rating':  return ratA - ratB;
        case 'alpha-asc':   return titleA.localeCompare(titleB);
        case 'alpha-desc':  return titleB.localeCompare(titleA);
        case 'rating-asc':  return ratA - ratB;
        case 'rating-desc': return ratB - ratA;
        default:            return 0;
      }
    });

    // re-render
    reviewsParent.innerHTML = '';
    visible.forEach(c => reviewsParent.appendChild(c));
  }

  // wire up existing filters + sort dropdown
  [searchInput, authorFilter, genreFilter, tagFilter, ratingFilter, yearFilter, sortOrder]
    .forEach(el => el.addEventListener('input', () => applyFiltersAndSort()));

  // wire in the new buttons
  alphaAscBtn.addEventListener ('click', () => applyFiltersAndSort('alpha-asc'));
  alphaDescBtn.addEventListener('click', () => applyFiltersAndSort('alpha-desc'));
  ratingAscBtn.addEventListener ('click', () => applyFiltersAndSort('rating-asc'));
  ratingDescBtn.addEventListener('click', () => applyFiltersAndSort('rating-desc'));

  // initial render
  applyFiltersAndSort();
});
