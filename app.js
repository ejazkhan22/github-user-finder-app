// HTML structure
const appHTML = `
  <div style="text-align: center; margin-top: 20px; font-family: Arial, sans-serif;">
    <h1 style="color: #888;">GitHub User Finder</h1>
    <div style="margin-bottom: 20px;">
      <input 
        type="text" 
        id="username" 
        placeholder="Enter GitHub Username" 
        style="background-color: black; padding: 10px; width: 250px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;"
      />
      <button 
        onclick="findUser()" 
        style="padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; background-color: #007bff; color: white; cursor: pointer;"
      >
        Search
      </button>
    </div>
    <div id="userDetails" style="margin-top: 20px;"></div>
  </div>
`;

// Inject the HTML into the document
const appContainer = document.createElement('div');
appContainer.innerHTML = appHTML;
document.body.appendChild(appContainer);

// JavaScript for fetching and displaying user details
async function findUser() {
  const username = document.getElementById('username').value.trim();
  const userDetailsDiv = document.getElementById('userDetails');

  if (!username) {
    userDetailsDiv.innerHTML = '<p style="color: red;">Please enter a username.</p>';
    return;
  }

  userDetailsDiv.innerHTML = '<div style="font-size: 16px; color: #555;">Loading...</div>';

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error('User not found');
    }

    const user = await response.json();

    userDetailsDiv.innerHTML = `
      <div 
        style="
          text-align: center; 
          display: inline-block; 
          border: 1px solid #ddd; 
          padding: 20px; 
          border-radius: 10px; 
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 300px;
          background-color:rgb(12, 11, 11);
        "
      >
        <img 
          src="${user.avatar_url}" 
          alt="${user.login}" 
          style="
            width: 100px; 
            height: 100px; 
            border-radius: 50%; 
            margin-bottom: 10px;
          " 
        />
        <h2 style="font-size: 20px; color: #333;">${user.name || 'Name not available'}</h2>
        <p style="font-size: 16px; color: #555;"><strong>Username:</strong> ${user.login}</p>
        <p style="font-size: 14px; color: #666;"><strong>Bio:</strong> ${user.bio || 'Bio not available'}</p>
        <p style="font-size: 14px; color: #666;"><strong>Location:</strong> ${user.location || 'Location not available'}</p>
        <p style="font-size: 14px; color: #666;"><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p style="font-size: 14px; color: #666;"><strong>Followers:</strong> ${user.followers}</p>
        <p style="font-size: 14px; color: #666;"><strong>Following:</strong> ${user.following}</p>
        <a 
          href="${user.html_url}" 
          target="_blank" 
          style="
            display: inline-block; 
            margin-top: 10px; 
            padding: 10px 15px; 
            text-decoration: none; 
            background-color: #007bff; 
            color: white; 
            border-radius: 5px; 
            font-size: 14px;
          "
        >
          View Profile
        </a>
      </div>
    `;
  } catch (error) {
    userDetailsDiv.innerHTML = `<p style="color: red; font-size: 16px;">Error: ${error.message}</p>`;
  }
}
