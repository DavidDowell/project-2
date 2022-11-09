document.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();

    var voteLink = event.target.closest("a.vote");
    if (!voteLink) {
        return;
    }

    if (voteLink.classList.contains("done") || voteLink.classList.contains("inprogress")) {
        return;
    }

    var voteType = voteLink.classList.contains("up") ? "up" : "down";

    var item = voteLink.closest(".article");

    var itemId = item.getAttribute("data-itemid");

    if (!itemId) {
        return;
    }

    voteLink.classList.add("inprogress");
    var body = new FormData();
    body.append("itemId", itemId);
    body.append("voteType", voteType);

    const response =  fetch("/api/posts/vote", {
        method: "PUT",
        body:  JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        if (!res.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return res.json();
    })
    .then(function(data) {
        if (data === "ok") { // Or whatever
            voteLink.classList.add("done");
        } else {
        }
    })
    .catch(function(error) {
    })
    .finally(function() {
        voteLink.classList.remove("inprogress");
    });
});