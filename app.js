async function findUser() {
  const username = document.getElementById('username').value.trim();
  const userDetailsDiv = document.getElementById('userDetails');

  if (!username) {
    userDetailsDiv.innerHTML = '<p class="text-danger">Please enter a username.</p>';
    return;
  }

  userDetailsDiv.innerHTML = `
<div class="spinner-grow text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
  `;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const user = await response.json();

    userDetailsDiv.innerHTML = `
      <div class="card mx-auto" style="width: 18rem;">
        <img src="${user.avatar_url}" class="card-img-top" alt="${user.login}">
        <div class="card-body">
          <h5 class="card-title">${user.name || 'Name not available'}</h5>
          <p class="card-text">
            <strong>Username:</strong> ${user.login}<br>
            <strong>Bio:</strong> ${user.bio || 'Not available'}<br>
            <strong>Location:</strong> ${user.location || 'Not available'}<br>
            <strong>Repos:</strong> ${user.public_repos}<br>
            <strong>Followers:</strong> ${user.followers}<br>
            <strong>Following:</strong> ${user.following}
          </p>
          <a href="${user.html_url}" class="btn btn-primary" target="_blank">View Profile</a>
        </div>
      </div>
    `;
  } catch (error) {
    userDetailsDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}
