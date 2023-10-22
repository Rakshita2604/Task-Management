// Define your Socket.io client and connect to the server
const socket = io();

// Authentication section
const authSection = document.getElementById('auth-section');
const loginForm = document.getElementById('login-form');
const loginButton = document.getElementById('login-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Task management section
const taskSection = document.getElementById('task-section');
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const createTaskButton = document.getElementById('create-task');

// Real-time task updates
socket.on('newTask', (task) => {
    // Update the UI with the new task
    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item';
    taskItem.textContent = `Title: ${task.title}, Description: ${task.description}`;
    taskList.appendChild(taskItem);
});

// Event listeners
loginButton.addEventListener('click', () => {
    // Implement user authentication with JWT here and handle UI changes based on authentication success
    // Function to handle authentication
function authenticateUser(username, password) {
    // Make an AJAX request to your backend for authentication
    $.ajax({
      type: 'POST',
      url: '/api/auth', // Replace with your authentication endpoint
      data: {
        username: username,
        password: password,
      },
      success: function (response) {
        // Check if authentication was successful
        if (response.token) {
          // Authentication successful
          hideAuthSection();
          showTaskSection();
          setAuthToken(response.token);
        } else {
          // Authentication failed
          alert('Authentication failed. Please check your credentials.');
        }
      },
      error: function (err) {
        console.error('Authentication error:', err);
      },
    });
  }
  
  // Function to hide the authentication section
  function hideAuthSection() {
    document.getElementById('auth-section').style.display = 'none';
  }
  
  // Function to show the task section
  function showTaskSection() {
    document.getElementById('task-section').style.display = 'block';
  }
  
  // Function to set the JWT token in localStorage
  function setAuthToken(token) {
    localStorage.setItem('jwtToken', token);
  }
  
  // Event listener for the login button
  document.getElementById('login-button').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    authenticateUser(username, password);
  });
  
  // Check for a stored token on page load (for persistent sessions)
  const storedToken = localStorage.getItem('jwtToken');
  if (storedToken) {
    hideAuthSection();
    showTaskSection();
  }
  
  // Implement your task management functionality and real-time updates here  
});

createTaskButton.addEventListener('click', () => {
    // Create a new task and emit a real-time event to notify other clients
    const task = {
        title: titleInput.value,
        description: descriptionInput.value,
    };

    socket.emit('taskCreated', task);
    // You can also save the task to the server and update the UI with the new task.
    // Function to create a new task
function createTask(title, description) {
    const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage
  
    // Make an AJAX request to create a new task
    $.ajax({
      type: 'POST',
      url: '/api/tasks', // Replace with your task creation endpoint
      data: {
        title: title,
        description: description,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
      },
      success: function (task) {
        // Task creation successful, update the UI
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item';
        taskItem.textContent = `Title: ${task.title}, Description: ${task.description}`;
        document.getElementById('task-list').appendChild(taskItem);
      },
      error: function (err) {
        console.error('Task creation error:', err);
        alert('Task creation failed. Please try again.');
      },
    });
  }
  
  // Event listener for the create task button
  document.getElementById('create-task').addEventListener('click', function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    createTask(title, description);
  });
  
});


