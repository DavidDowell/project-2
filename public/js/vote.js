async function voteClickHandler(event) {
    event.preventDefault();
    let counter = 0;
    const add = $('#add');
    const sub = $('#sub');

    add.click(function() {
        counter++;
        $('#vote-count').text(counter);
    });

    sub.click(function() {
        counter--;
        $('#count').text(counter);
    });

    console.log('hit')
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/posts/vote', {
      method: 'PUT',
      body: JSON.stringify({
        post_id: id
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

  
