var cancelBtn = document.getElementsByClassName("cancel");
// add/view comments Elements
var viewCommentsBtns = document.querySelectorAll(".viewCommentsBtn");
// var addCommentBtn = document.querySelector(".addCommentBtn");
// var addCommentForm = document.querySelector(".addCommentForm");
// addCommentBtn.addEventListener("click", () => {
//   addCommentBtn.classList.toggle("closed");
//   addCommentForm.classList.toggle("closed");
// });
for (let i = 0; i < viewCommentsBtns.length; i++) {
  viewCommentsBtns[i].addEventListener("click", toggleView);
}
function toggleView(ev) {
  let btn = ev.currentTarget;
  let arrow = btn.querySelector(".icon");
  arrow.classList.toggle("invert");
  var commentListEl = btn.nextElementSibling;
  commentListEl.classList.toggle("closed");
}
// cancelBtn.onclick = function () {
//   addCommentBtn.classList.remove("closed");
//   addCommentForm.classList.add("closed");
// };
