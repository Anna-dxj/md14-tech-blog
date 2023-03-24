const deletePostHandler = async (event) => {
    event.preventDefault()
    const hrefParsed = document.location.href.split('/')
    const id = hrefParsed[hrefParsed.length - 1]
    
    const response = await fetch(`../api/post/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace(`/dashboard`)
    } else {
        alert(`${response.status}: ${response.statusText}`)
    }
}

document.querySelector('#delete-post-btn').addEventListener('click', deletePostHandler);