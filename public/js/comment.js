var cancelBtn = document.getElementsByClassName("cancel");
var addCommentBtn = document.querySelector(".addCommentBtn");
var addCommentForm = document.querySelector(".addCommentForm");
addCommentBtn.addEventListener("click", () => {
  addCommentBtn.classList.toggle("closed");
  addCommentForm.classList.toggle("closed");
});
cancelBtn.onclick = function () {
  addCommentBtn.classList.remove("closed");
  addCommentForm.classList.add("closed");
};

async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="commentTextArea"]')
    .value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log("submit new comment", comment_text);

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else if(!comment_text) {
    document.location.reload();
  }
}

document
  .querySelector(".addCommentForm")
  .addEventListener("submit", commentFormHandler);
