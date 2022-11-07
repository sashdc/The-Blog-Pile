const postFormHandler = async (event) => {
    console.log('trying to create post')
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim()
  const post_content = document.querySelector('#content').value.trim()

  const response = await fetch('/api/posts/', {
      method: 'POST',
      body: JSON.stringify({ title, post_content }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert('Failed to make new post')
  }
}

document.querySelector('#submit-post').addEventListener('click', postFormHandler)