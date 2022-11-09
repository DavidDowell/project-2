// add post Elements
var postModal = document.querySelector(".postModal");
var createPostBtn = document.querySelector(".createPostBtn");
var cancelBtn = document.querySelector(".cancel");
var postForm = document.querySelector('.postModal')

// submit new post form handler
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const post_text = document.querySelector('textarea[name="content"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

postForm.addEventListener('submit', newFormHandler);

createPostBtn.addEventListener('click', () => {
  postModal.style.display = "block";
})

cancelBtn.addEventListener('click',() => {
  postModal.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == postModal) {
    postModal.style.display = "none";
  }
}