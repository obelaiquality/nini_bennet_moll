document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('.review');
  const searchInput = document.getElementById('search');
  const authorFilter = document.getElementById('author-filter');
  const tagFilter = document.getElementById('tag-filter');
  const genreFilter = document.getElementById('genre-filter');
  const ratingFilter = document.getElementById('rating-filter');
  const yearFilter = document.getElementById('year-filter');
  const quoteEl = document.getElementById('quote-of-the-day');
  const darkToggle = document.getElementById('dark-toggle');
  const topAuthorsEl = document.getElementById('top-authors');
  const topGenresEl = document.getElementById('top-genres');

  // Display random quote
  if (quoteEl && window.quotes) {
    const q = window.quotes[Math.floor(Math.random() * window.quotes.length)];
    quoteEl.textContent = q;
  }

  // Dark mode toggle
  if (darkToggle) {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('dark');
    }
    darkToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('dark', document.documentElement.classList.contains('dark'));
    });
  }

  // Render star ratings
  document.querySelectorAll('.rating').forEach(el => {
    const value = parseFloat(el.dataset.rating);
    const fullStars = Math.floor(value);
    const half = value % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (half) stars += '½';
    el.textContent = stars;
  });

  // Summaries
  if (topAuthorsEl || topGenresEl) {
    const authorCount = {};
    const genreCount = {};
    posts.forEach(post => {
      authorCount[post.dataset.author] = (authorCount[post.dataset.author] || 0) + 1;
      genreCount[post.dataset.genre] = (genreCount[post.dataset.genre] || 0) + 1;
    });
    const topAuthors = Object.entries(authorCount).sort((a,b) => b[1]-a[1]).map(e => e[0]).slice(0,3).join(', ');
    const topGenres = Object.entries(genreCount).sort((a,b) => b[1]-a[1]).map(e => e[0]).slice(0,3).join(', ');
    if (topAuthorsEl) topAuthorsEl.textContent = topAuthors;
    if (topGenresEl) topGenresEl.textContent = topGenres;
  }

  function filterPosts() {
    const query = searchInput.value.toLowerCase();
    const authorVal = authorFilter.value;
    const tagVal = tagFilter.value;
    const genreVal = genreFilter.value;
    const ratingVal = parseFloat(ratingFilter.value || 0);
    const yearVal = yearFilter.value;

    posts.forEach(post => {
      const text = post.dataset.excerpt.toLowerCase() + post.querySelector('h2').textContent.toLowerCase();
      const author = post.dataset.author;
      const tags = post.dataset.tags.split(',');
      const genre = post.dataset.genre;
      const rating = parseFloat(post.dataset.rating || 0);
      const year = post.dataset.year;
      const matchesQuery = text.includes(query);
      const matchesAuthor = authorVal === '' || author === authorVal;
      const matchesTag = tagVal === '' || tags.includes(tagVal);
      const matchesGenre = genreVal === '' || genre === genreVal;
      const matchesRating = ratingFilter.value === '' || rating >= ratingVal;
      const matchesYear = yearVal === '' || year === yearVal;
      if (matchesQuery && matchesAuthor && matchesTag && matchesGenre && matchesRating && matchesYear) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterPosts);
  authorFilter.addEventListener('change', filterPosts);
  tagFilter.addEventListener('change', filterPosts);
  genreFilter.addEventListener('change', filterPosts);
  ratingFilter.addEventListener('change', filterPosts);
  yearFilter.addEventListener('change', filterPosts);
});
