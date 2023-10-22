const express = require('express');
const http = require('http'); // Require the HTTP module for Socket.io
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();

// Create a basic HTTP server
const server = http.createServer(app);

// Initialize Socket.io and attach it to the HTTP server
const io = socketIo(server);

// Database connection (using Mongoose, if you're using MongoDB)
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
const tasksRoute = require('./routes/tasks');
app.use('/api/tasks', tasksRoute);

// Real-time functionality using Socket.io
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // You can listen for specific events from clients
    socket.on('taskCreated', (task) => {
      // Handle the event (e.g., save the task to the database)
      // Then emit an event to notify other connected clients about the new task
      socket.broadcast.emit('newTask', task);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
