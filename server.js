// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When user sends a message
  socket.on('chat message', (msg) => {
    io.emit('chat message', { id: socket.id, text: msg, time: new Date().toLocaleTimeString() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
