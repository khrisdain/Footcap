const form = document.getElementById('postForm');
const imageInput = document.getElementById('imageInput');
const textInput = document.getElementById('textInput');
const postsContainer = document.getElementById('postsContainer');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');


function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
  <img src="${post.image}" alt="Post image" class="post-image" data-src="${post.image}">
  <p><strong>${post.name}</strong> (${post.email})</p>
  <p>${post.text}</p>
`;


    postsContainer.prepend(div);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const imageData = reader.result;
    const textData = textInput.value;

    const newPost = {
        image: imageData,
        text: textData,
        name: nameInput.value,
        email: emailInput.value
      };
      
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    posts.push(newPost);
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    form.reset();
    loadPosts();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

loadPosts(); // Load posts on page load

// Lightbox modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

// Delegate click to all .post-image elements
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('post-image')) {
    modalImg.src = e.target.dataset.src;
    modal.classList.remove('hidden');
  }

  if (e.target === modal || e.target === modalClose) {
    modal.classList.add('hidden');
    modalImg.src = '';
  }
});

