const postBtn = document.querySelector('#new-post-submit-btn');
const updateBtn = document.querySelector('#update-post-btn');

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

const updatePostHandler = (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#post-title-update').value.trim();
    const text = document.querySelector('#post-body-update').value.trim()
    console.log(title, text)
    return;
    if (event.target.hasAttribute('data-update-id')) {
        const id = event.target.getAttribute('data-update-id')

        const response =  fetch(`/api/post/${id}`, {
            method: "PUT",
            body: JSON.stringify({title, text}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            document.location.replace("/dashboard")
        } else {
            alert(response.statusText)
        }
    }
}

const deletePostHandler = async (event) => {
    if (event.target.hasAttribute('data-delete-id')) {
        const id = event.target.getAttribute('data-delete-id')

        const response = await fetch (`/api/post/${id}`, {
            method: "DELETE", 
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

postBtn.addEventListener('click', createPostHandler);
updateBtn.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('works');
});
document.querySelector('#stuff').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('stuff button')
})
document.querySelector('#delete-btn').addEventListener('click', deletePostHandler);