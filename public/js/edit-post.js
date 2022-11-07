async function editFormHandler(event) {
    event.preventDefault();
    console.log('trying to edit post')

    const post_title = document.querySelector('#post-title').value;
    const post_content = document.querySelector('#post-content').value.trim();
    const post_id = req.session.post_id;

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-post').addEventListener('click', editFormHandler);