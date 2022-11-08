// add post Elements
var postModal = document.querySelector(".postModal");
var createPostBtn = document.querySelector(".createPostBtn");
var cancelBtn = document.getElementsByClassName("cancel");

// add/view comments Elements
var viewCommentsBtns = document.querySelectorAll('.viewCommentsBtn');
var addCommentBtn = document.querySelector('.addCommentBtn');
var addCommentForm = document.querySelector('.addCommentForm');

// comment
addCommentBtn.addEventListener('click', () => {
    addCommentBtn.classList.toggle('closed');
    addCommentForm.classList.toggle('closed');
})

// comment
for(let i = 0; i < viewCommentsBtns.length; i++) {
    viewCommentsBtns[i].addEventListener('click', toggleView)
}

// comment
function toggleView(ev){
    let btn = ev.currentTarget;
    let arrow = btn.querySelector('.icon');
    arrow.classList.toggle('invert');

    var commentListEl = btn.nextElementSibling;
    commentListEl.classList.toggle('closed');
}

// post
createPostBtn.addEventListener('click', () => {
    postModal.style.display = "block";
})

// post and comment
cancelBtn.onclick = function() {
  postModal.style.display = "none";
  addCommentBtn.classList.remove('closed');
  addCommentForm.classList.add('closed');
}

// post
window.onclick = function(event) {
  if (event.target == postModal) {
    postModal.style.display = "none";
  }
}
