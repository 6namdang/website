import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/esm/supabase.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const postsContainer = document.getElementById('posts');
const authForm = document.getElementById('auth');
const postForm = document.getElementById('post-form');
const logoutBtn = document.getElementById('logout');
let user = null;

async function loadPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  postsContainer.innerHTML = '';
  if (error) {
    postsContainer.textContent = error.message;
    return;
  }
  data.forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `<h3>${post.title}</h3>${
      post.image_url ? `<img src="${post.image_url}" alt="${post.title}">` : ''
    }<p>${post.content}</p>${
      user ? `<button data-id="${post.id}" class="delete">Delete</button>` : ''
    }`;
    postsContainer.appendChild(article);
  });
}

supabase.auth.onAuthStateChange((_event, session) => {
  user = session?.user || null;
  updateUI();
});

function updateUI() {
  if (user) {
    authForm.hidden = true;
    postForm.hidden = false;
    logoutBtn.hidden = false;
  } else {
    authForm.hidden = false;
    postForm.hidden = true;
    logoutBtn.hidden = true;
  }
  loadPosts();
}

authForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
});

postForm.addEventListener('submit', async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const file = document.getElementById('image').files[0];
  let imageUrl = null;
  if (file) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(Date.now() + '-' + file.name, file);
    if (error) {
      alert(error.message);
      return;
    }
    const {
      data: { publicUrl }
    } = supabase.storage.from('images').getPublicUrl(data.path);
    imageUrl = publicUrl;
  }
  const { error } = await supabase
    .from('posts')
    .insert([{ title, content, image_url: imageUrl }]);
  if (error) alert(error.message);
  postForm.reset();
  loadPosts();
});

postsContainer.addEventListener('click', async e => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    await supabase.from('posts').delete().eq('id', id);
    loadPosts();
  }
});

updateUI();
