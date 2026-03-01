let posts = [];
let filteredCategory = "All";
let currentPostId = null;

// Load posts from JSON
fetch('posts.json')
.then(res => res.json())
.then(data => {
    posts = data;
    renderPosts();
});

// Render posts
function renderPosts() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    posts.filter(post => filteredCategory === "All" || post.category === filteredCategory)
         .forEach(post => {
        let card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 80)}...</p>
        `;
        card.onclick = () => openModal(post.id);
        grid.appendChild(card);
    });
}

// Filtering
document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', e => {
        filteredCategory = e.target.dataset.category;
        document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderPosts();
    });
});

// Modal functions
function openModal(id) {
    currentPostId = id;
    let post = posts.find(p => p.id === id);
    document.getElementById('modalTitle').innerText = post.title;
    document.getElementById('modalImage').src = post.image;
    document.getElementById('modalContent').innerText = post.content;
    document.getElementById('modal').style.display = 'flex';
    renderComments();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Dark/Light toggle
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeBtn.textContent = document.body.classList.contains('light-theme') ? '🌑' : '🌙';
});

// Comments system
let comments = {}; // { postId: [comments...] }

function renderComments() {
    const list = document.getElementById('commentsList');
    list.innerHTML = '';
    if (!comments[currentPostId]) comments[currentPostId] = [];
    comments[currentPostId].forEach(c => {
        let div = document.createElement('div');
        div.className = 'comment';
        div.innerText = c;
        list.appendChild(div);
    });
}

document.getElementById('addCommentBtn').addEventListener('click', () => {
    const input = document.getElementById('commentInput');
    if (!comments[currentPostId]) comments[currentPostId] = [];
    comments[currentPostId].push(input.value);
    input.value = '';
    renderComments();
});
