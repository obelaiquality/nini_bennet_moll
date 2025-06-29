document.addEventListener('DOMContentLoaded', () => {
  const posts         = Array.from(document.querySelectorAll('.review-card'));
  const searchInput   = document.getElementById('search');
  const authorFilter  = document.getElementById('author-filter');
  const genreFilter   = document.getElementById('genre-filter');
  const tagFilter     = document.getElementById('tag-filter');
  const ratingFilter  = document.getElementById('rating-filter');
  const yearFilter    = document.getElementById('year-filter');
  const sortOrder     = document.getElementById('sort-order');
  const darkToggle    = document.getElementById('theme-toggle');
  const reviewsParent = document.querySelector('.reviews');

  // Dark mode toggle (won’t break your existing code)
  if (darkToggle) {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('theme-dark');
      darkToggle.textContent = '☀️';
    }
    darkToggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('theme-dark');
      localStorage.setItem('dark', isDark);
      darkToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  // Core filter+sort logic
  function applyFiltersAndSort() {
    const q = searchInput.value.toLowerCase();
    const a = authorFilter.value;
    const g = genreFilter.value;
    const t = tagFilter.value;
    const r = parseFloat(ratingFilter.value) || 0;
    const y = yearFilter.value;

    // 1) filter
    let visible = posts.filter(card => {
      const title   = card.querySelector('h2').textContent.toLowerCase();
      const excerpt = (card.dataset.excerpt || '').toLowerCase();
      const auth    = card.dataset.author;
      const genre   = card.dataset.genre;
      const tags    = (card.dataset.tags || '').split(',');
      const rating  = parseFloat(card.dataset.rating) || 0;
      const year    = card.dataset.year;
      return (
           (title.includes(q) || excerpt.includes(q))
        && (!a || auth === a)
        && (!g || genre === g)
        && (!t || tags.includes(t))
        && (!ratingFilter.value || rating >= r)
        && (!y || year === y)
      );
    });

    // 2) sort by review-date / rating from dropdown
    const order = sortOrder.value;
    visible.sort((a,b) => {
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

    // 3) render
    reviewsParent.innerHTML = '';
    visible.forEach(c => reviewsParent.appendChild(c));
  }

  // wire up drop-downs + text input
  [ searchInput, authorFilter, genreFilter, tagFilter, ratingFilter, yearFilter, sortOrder ]
    .forEach(el => el.addEventListener('input', applyFiltersAndSort));

  // ==== new: alphabetical and rating buttons ====

  function resortVisible(compareFn) {
    const filtered = Array.from(reviewsParent.children);
    filtered.sort(compareFn);
    reviewsParent.innerHTML = '';
    filtered.forEach(c => reviewsParent.appendChild(c));
  }

  document.getElementById('sort-alpha-asc')
    .addEventListener('click', () => {
      resortVisible((a,b) =>
        a.querySelector('h2 a').textContent
         .localeCompare(b.querySelector('h2 a').textContent)
      );
    });

  document.getElementById('sort-alpha-desc')
    .addEventListener('click', () => {
      resortVisible((a,b) =>
        b.querySelector('h2 a').textContent
         .localeCompare(a.querySelector('h2 a').textContent)
      );
    });

  document.getElementById('sort-rating-asc')
    .addEventListener('click', () => {
      resortVisible((a,b) =>
        (parseFloat(a.dataset.rating)||0) - (parseFloat(b.dataset.rating)||0)
      );
    });

  document.getElementById('sort-rating-desc')
    .addEventListener('click', () => {
      resortVisible((a,b) =>
        (parseFloat(b.dataset.rating)||0) - (parseFloat(a.dataset.rating)||0)
      );
    });

  // initial render
  applyFiltersAndSort();
});
