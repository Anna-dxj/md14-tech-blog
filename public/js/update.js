const updatePostHandler =  async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title-input').value.trim();
    const text = document.querySelector('#post-body-input').value.trim();
    const hrefParsed = document.location.href.split('/')
    const id = hrefParsed[hrefParsed.length - 1]
    if (title&&text&&id) {
        const response = await fetch (`../api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, text}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        if (response.ok) {
            document.location.replace(`/post-details/${id}`)        
        } else {
            alert(response.status)
        }
    }
}
document.querySelector('#update-post-btn').addEventListener('click', updatePostHandler)