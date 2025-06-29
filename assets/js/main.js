document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js loaded'); // <— verify this appears in your console

  // grab everything once:
  const searchEl   = document.getElementById('search');
  const authorEl   = document.getElementById('author-filter');
  const genreEl    = document.getElementById('genre-filter');
  const tagEl      = document.getElementById('tag-filter');
  const ratingEl   = document.getElementById('rating-filter');
  const yearEl     = document.getElementById('year-filter');
  const sortEl     = document.getElementById('sort-order');
  const reviewsDiv = document.querySelector('.reviews-list');
  const cards      = Array.from(reviewsDiv.querySelectorAll('.review-card'));
  const toggle     = document.getElementById('theme-toggle');
  const heroItems  = Array.from(document.querySelectorAll('.featured-item'));

  // — Dark-mode (unified on localStorage.theme) —
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('theme-dark');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', () => {
    const nowDark = document.documentElement.classList.toggle('theme-dark');
    toggle.textContent = nowDark ? '☀️' : '🌙';
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  });

  // — Featured carousel —
  if (heroItems.length > 0) {
    let idx = 0;
    // show only the first at start
    heroItems.forEach((el,i) => el.style.display = i === 0 ? 'block' : 'none');
    setInterval(() => {
      heroItems[idx].style.display = 'none';
      idx = (idx + 1) % heroItems.length;
      heroItems[idx].style.display = 'block';
    }, 5000);
  }

  // — Filters & Sort —  
  function refresh() {
    const q = searchEl.value.toLowerCase();
    const a = authorEl.value;
    const g = genreEl.value;
    const t = tagEl.value;
    const r = parseFloat(ratingEl.value) || 0;
    const y = yearEl.value;

    // 1) filter
    let visible = cards.filter(c => {
      const txt   = (c.dataset.title + c.textContent).toLowerCase();
      const auth  = c.dataset.author;
      const gen   = c.dataset.genre;
      const tags  = c.dataset.tags.split(',');
      const rate  = parseFloat(c.dataset.rating) || 0;
      const date  = c.dataset.date;

      return (
        txt.includes(q) &&
        (!a || auth === a) &&
        (!g || gen === g) &&
        (!t || tags.includes(t)) &&
        (!ratingEl.value || rate >= r) &&
        (!y || date.startsWith(y))
      );
    });

    // 2) sort
    visible.sort((A, B) => {
      const o = sortEl.value;

      if (o === 'newest' || o === 'oldest') {
        return o === 'newest'
          ? B.dataset.date.localeCompare(A.dataset.date)
          : A.dataset.date.localeCompare(B.dataset.date);
      }
      if (o === 'high-rating' || o === 'low-rating') {
        const a = parseFloat(A.dataset.rating), b = parseFloat(B.dataset.rating);
        return o === 'high-rating' ? b - a : a - b;
      }
      if (o === 'az' || o === 'za') {
        const a = A.dataset.title.toLowerCase(), b = B.dataset.title.toLowerCase();
        return o === 'az' ? a.localeCompare(b) : b.localeCompare(a);
      }
      return 0;
    });

    // 3) re-render just the cards
    reviewsDiv.innerHTML = '';
    visible.forEach(c => reviewsDiv.appendChild(c));
  }

  // wire up all controls
  [searchEl, authorEl, genreEl, tagEl, ratingEl, yearEl].forEach(el =>
    el.addEventListener('input', refresh)
  );
  sortEl.addEventListener('change', refresh);

  // initial
  refresh();
});
