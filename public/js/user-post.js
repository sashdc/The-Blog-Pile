async function deleteFormHandler(event) {
  event.preventDefault();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (confirm('Are you sure you want to delete this post?')){

  const response = await fetch(`/api/posts/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}}

const editButtonHandler = async (event) => {
  event.preventDefault();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch('/api/posts/editpost', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.replace(`/api/posts/editpost`);
  } else {
      alert('You cannot update this post')
  }
}

document
  .querySelector("#delete")
  .addEventListener("click", deleteFormHandler);

  document
  .querySelector("#edit")
  .addEventListener("click", editButtonHandler);
