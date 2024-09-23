const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', '*vercel.com'],
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a specific board room
  socket.on('join-board', ({ boardId }) => {
    socket.join(boardId);
    console.log(`User joined board: ${boardId}`);
  });

  // Handle drawing data
  socket.on('drawing-data', (data) => {
    const { boardId, shape } = data;
    // Broadcast to all other users in the same board (room)
    socket.to(boardId).emit('drawing-data', { boardId, shape });
  });

  // Handle clear canvas
  socket.on('clear-canvas', (data) => {
    const { boardId } = data;
    // Broadcast clear-canvas event to everyone in the room
    io.to(boardId).emit('clear-canvas', { boardId });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
