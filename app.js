const message = document.getElementById('message');
const registerLink = document.getElementById('register-link');

// User data structure
const users = [];

// Add user to users array
function registerUser(username, password) {
    // Hash and salt the password using a library like bcrypt
    // In this example, we'll just use a simple hash function for simplicity
    const hashedPassword = hashPassword(password);

    users.push({
        username,
        hashedPassword
    });
}

// Hash and salt the password
function hashPassword(password) {
    // In a real-world scenario, use a library like bcrypt
    // For simplicity, we'll just return a simple hash
    return password.split('').reverse().join('');
}

// Check if user exists and password matches
function authenticateUser(username, password) {
    return users.some(user => user.username === username && user.hashedPassword === hashPassword(password));
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(username, password)) {
        message.textContent = `Welcome, ${username}!`;
        message.classList.remove('error');
        message.classList.add('success');
    } else {
        message.textContent = 'Invalid credentials. Please try again.';
        message.classList.remove('success');
        message.classList.add('error');
    }

    message.classList.remove('hidden');
});

// Show register link on message dismissal
message.addEventListener('transitionend', () => {
    message.classList.add('hidden');
    registerLink.classList.remove('hidden');
});

// Register user on register link click
registerLink.addEventListener('click', event => {
    event.preventDefault();

    const username = prompt('Enter a username:');
    const password = prompt('Enter a password:');

    registerUser(username, password);

    message.textContent = `User ${username} registered successfully!`;
    message.classList.remove('error');
    message.classList.add('success');

    message.classList.remove('hidden');

    registerLink.classList.add('hidden');
});