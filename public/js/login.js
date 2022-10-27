
// manages log in form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const user = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (user && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// manages sign up form
const signupFormHandler = async (event) => {
    
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Something went wrong, please try again');
    }
  }
};


document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
