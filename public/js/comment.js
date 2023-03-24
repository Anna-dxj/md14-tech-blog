const submitBtn = document.querySelector('#comment-submit-btn')

const createCommentHandler = async (event) => {
    event.preventDefault();

    const text = document.querySelector('#comment-input').value.trim()
     const hrefParsed = document.location.href.split('/')
     const post_id = hrefParsed[hrefParsed.length - 1]
     console.log(post_id)
    if (text) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({ text, post_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            console.log(response)
            document.location.replace(document.location.href)
        } else {
              alert(response.status + ': ' + response.statusText);
        }
    }
}

submitBtn.addEventListener('click', createCommentHandler)