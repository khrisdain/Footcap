//login functionality 
const loginPopup = document.createElement('div');
loginPopup.id = 'login-popup';
loginPopup.style.display = 'none';

loginPopup.innerHTML = `
  <div class="login-container">
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p id="login-message"></p>
    <p>Don't have an account? <a href="#" id="register-link">Register</a></p>
  </div>
`;

// Remove the duplicate append
document.body.appendChild(loginPopup);

// Add event listener to the person icon/login button
const loginButton = document.querySelector('a.nav-action-btn:has(ion-icon[name="person-outline"])');
// Alternative selector if the :has selector isn't supported in your environment
// const loginButton = document.querySelector('a.nav-action-btn');
loginButton.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default anchor behavior
  toggleLoginPopup();
});


function toggleLoginPopup() {
  const popup = document.getElementById('login-popup');
  popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

// First, define the necessary functions outside the event handlers
async function loadUsers() {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

function saveUsers(users){
    localStorage.setItem('users', JSON.stringify(users));
}

// Define the login handler function so it can be referenced later
async function loginHandler(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    //use local storage to simulate JSON persistence
    const users = await loadUsers();
    
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Login successful
        localStorage.setItem('currentUser', JSON.stringify(user)); //browsers local storage
        document.getElementById('login-message').textContent = 'Login successful!';
        document.getElementById('login-message').style.color = 'green';
        setTimeout(() => {
          toggleLoginPopup();
          updateUIAfterLogin(user);
        }, 1000); //1s
    } else {
        // Login failed
        document.getElementById('login-message').textContent = 'Invalid username or password';
        document.getElementById('login-message').style.color = '#ff5252';
    }
}

// Add the event listener to the form after appending it to the DOM
document.getElementById('login-form').addEventListener('submit', loginHandler);

// Registration functionality
document.getElementById('register-link').addEventListener('click', function(e) { //register-link from the document.getElementByID
    e.preventDefault();
    
    // Switch to registration form
    const loginForm = document.getElementById('login-form');
    loginForm.innerHTML = `
      <input type="text" id="reg-username" placeholder="Choose Username" required>
      <input type="password" id="reg-password" placeholder="Choose Password" required>
      <input type="password" id="confirm-password" placeholder="Confirm Password" required>
      <button type="submit">Register</button>
    `;
    
    // Change submit handler for registration
    loginForm.removeEventListener('submit', loginHandler);
    loginForm.addEventListener('submit', registerHandler);
});

async function registerHandler(e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('login-message').textContent = 'Passwords do not match';
        document.getElementById('login-message').style.color = '#ff5252';
        return;
    }
      
    const users = await loadUsers();
      
    if (users.find(u => u.username === username)) {
        document.getElementById('login-message').textContent = 'Username already exists';
        document.getElementById('login-message').style.color = '#ff5252';
        return;
    }
      
    // Add new user
    users.push({ username, password });
    saveUsers(users);
    
    document.getElementById('login-message').textContent = 'Registration successful! You can now login.';
    document.getElementById('login-message').style.color = 'green';
    
    // Reset form to login
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        loginForm.innerHTML = `
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        `;
        loginForm.removeEventListener('submit', registerHandler);
        loginForm.addEventListener('submit', loginHandler);
    }, 2000);
}

function updateUIAfterLogin(user) {
    // Update UI to show logged in status
    const loginText = document.querySelector('.nav-action-text');
    loginText.textContent = user.username; // Change "Login / Register" to username
}



//in js style

const style = document.createElement('style');
style.textContent = `
/* Login Popup Styles with Custom Color Palette - Perfectly Centered */
#login-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--oxford-blue_60, hsla(230, 41%, 14%, 0.4)); /* Dim overlay */
    display: none; /* Start hidden */
    z-index: 1000;
  }
  
  /* When displayed, flex to center the container */
  #login-popup[style*="display: flex"],
  #login-popup[style*="display:flex"],
  #login-popup.active {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  
  .login-container {
    background-color: hsla(0, 0%, 98%, 1);
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
    padding: 30px;
    position: relative;
    animation: popup-enter 0.3s ease forwards;
    border: 1px solid var(--maximum-blue-green_10, hsla(185, 75%, 45%, 0.1));
    /* Ensure the container stays in the middle */
    margin: auto;
    margin-top: 200px;
  }
  
  @keyframes popup-enter {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .login-container h2 {
    color: var(--smoky-black, rgb(7,6,1));
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 600;
  }
  
  #login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  #login-form input {
    padding: 14px 16px;
    border: 1px solid var(--onyx, hsl(0, 0%, 27%));
    background-color: var(--white, hsl(0, 0%, 100%));
    color: var(--smoky-black, rgb(7,6,1));
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  #login-form input::placeholder {
    color: var(--gray-x-11-gray, hsl(0, 0%, 74%));
    opacity: 0.7;
  }
  
  #login-form input:focus {
    border-color: var(--salmon, hsl(5, 100%, 73%));
    outline: none;
    box-shadow: 0 0 0 2px hsla(5, 100%, 73%, 0.2);
  }
  
  #login-form button {
    background-color: var(--bittersweet, hsl(5, 100%, 69%));
    color: var(--white, hsl(0, 0%, 100%));
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    margin-top: 10px;
  }
  
  #login-form button:hover {
    background-color: hsl(5, 100%, 65%);
    transform: translateY(-2px);
  }
  
  #login-form button:active {
    transform: translateY(0);
  }
  
  #login-message {
    text-align: center;
    margin: 15px 0;
    font-size: 14px;
    height: 20px;
    color: var(--white, hsl(0, 0%, 100%));
  }
  
  .login-container p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--gray-x-11-gray, hsl(0, 0%, 74%));
  }
  
  .login-container a {
    color: var(--salmon, hsl(5, 100%, 73%));
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;
  }
  
  .login-container a:hover {
    color: var(--bittersweet, hsl(5, 100%, 69%));
    text-decoration: underline;
  }
  
  /* Close button */
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 22px;
    color: var(--gray-x-11-gray, hsl(0, 0%, 74%));
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .close-btn:hover {
    color: var(--white, hsl(0, 0%, 100%));
  }`

document.head.appendChild(style);

// Check if user is already logged in
function checkLoginStatus() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    updateUIAfterLogin(user);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);

