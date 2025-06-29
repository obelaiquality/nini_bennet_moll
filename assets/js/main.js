document.addEventListener('DOMContentLoaded', () => {
  const cards       = Array.from(document.querySelectorAll('.review-card'));
  const searchEl    = document.getElementById('search');
  const authorEl    = document.getElementById('author-filter');
  const genreEl     = document.getElementById('genre-filter');
  const tagEl       = document.getElementById('tag-filter');
  const ratingEl    = document.getElementById('rating-filter');
  const yearEl      = document.getElementById('year-filter');
  const sortEl      = document.getElementById('sort-order');
  const reviewsRoot = document.querySelector('.reviews');
  const toggle      = document.getElementById('theme-toggle');
  const featuredEls = document.querySelectorAll('.hero-title, .hero-subtitle');

  // — Dark-mode toggle (now unified on localStorage.theme) —
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('theme-dark');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('theme-dark');
    toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // — Featured carousel rotation —
  const featuredCards = Array.from(document.querySelectorAll('.featured-card'));
  let idx = 0;
  if (featuredCards.length > 1) {
    setInterval(() => {
      idx = (idx + 1) % featuredCards.length;
      const f = featuredCards[idx];
      document.querySelector('.hero-title').textContent    = f.querySelector('h3').textContent;
      document.querySelector('.hero-subtitle').textContent = f.querySelector('p').textContent;
    }, 5000);
  }

  // — Filter & Sort —
  function update() {
    const q = searchEl.value.toLowerCase();
    const a = authorEl.value;
    const g = genreEl.value;
    const t = tagEl.value;
    const r = parseFloat(ratingEl.value) || 0;
    const y = yearEl.value;
    const o = sortEl.value;

    let subset = cards.filter(c => {
      const title = c.dataset.title.toLowerCase();
      const txt   = c.textContent.toLowerCase();
      const auth  = c.dataset.author;
      const gen   = c.dataset.genre;
      const tags  = c.dataset.tags.split(',');
      const rate  = parseFloat(c.dataset.rating) || 0;
      const date  = c.dataset.date;

      return (
        (title.includes(q) || txt.includes(q)) &&
        (!a || auth === a) &&
        (!g || gen === g) &&
        (!t || tags.includes(t)) &&
        (!ratingEl.value || rate >= r) &&
        (!y || date.startsWith(y))
      );
    });

    subset.sort((A, B) => {
      if (o === 'newest' || o === 'oldest') {
        return o === 'newest'
          ? B.dataset.date.localeCompare(A.dataset.date)
          : A.dataset.date.localeCompare(B.dataset.date);
      }
      if (o === 'high-rating' || o === 'low-rating') {
        return o === 'high-rating'
          ? parseFloat(B.dataset.rating) - parseFloat(A.dataset.rating)
          : parseFloat(A.dataset.rating) - parseFloat(B.dataset.rating);
      }
      if (o === 'alpha-asc' || o === 'alpha-desc') {
        const tA = A.dataset.title.toLowerCase();
        const tB = B.dataset.title.toLowerCase();
        return o === 'alpha-asc'
          ? tA.localeCompare(tB)
          : tB.localeCompare(tA);
      }
      return 0;
    });

    reviewsRoot.innerHTML = '';
    subset.forEach(c => reviewsRoot.appendChild(c));
  }

  [searchEl, authorEl, genreEl, tagEl, ratingEl, yearEl, sortEl]
    .forEach(el => el.addEventListener('input', update));

  update();
});
