document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('.review');
  const searchInput = document.getElementById('search');
  const authorFilter = document.getElementById('author-filter');
  const tagFilter = document.getElementById('tag-filter');

  function filterPosts() {
    const query = searchInput.value.toLowerCase();
    const authorVal = authorFilter.value;
    const tagVal = tagFilter.value;

    posts.forEach(post => {
      const text = post.dataset.excerpt.toLowerCase() + post.querySelector('h2').textContent.toLowerCase();
      const author = post.dataset.author;
      const tags = post.dataset.tags.split(',');
      const matchesQuery = text.includes(query);
      const matchesAuthor = authorVal === '' || author === authorVal;
      const matchesTag = tagVal === '' || tags.includes(tagVal);
      if (matchesQuery && matchesAuthor && matchesTag) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });
  }

  searchInput.addEventListener('input', filterPosts);
  authorFilter.addEventListener('change', filterPosts);
  tagFilter.addEventListener('change', filterPosts);
});
