const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title-input').value.trim();
    const text = document.querySelector('#post-body-input').value.trim()
    if (title && text) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
              alert(response.status + ': ' + response.statusText);
        }
    }
}

document.querySelector('#new-post-submit-btn').addEventListener('click', createPostHandler);