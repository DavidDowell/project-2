async function upvoteClickHandler(event) {
    event.preventDefault();


    console.log('hit')

  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const vote = true
    const response = await fetch('/api/posts/vote', {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        vote_for: vote 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  };

  async function downvoteClickHandler(event) {
    event.preventDefault();


    console.log('hit')

  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const vote = false
    const response = await fetch('/api/posts/vote', {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id,
        vote_for: vote 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#upvote').addEventListener('click', upvoteClickHandler);
  document.querySelector('#downvote').addEventListener('click', downvoteClickHandler);