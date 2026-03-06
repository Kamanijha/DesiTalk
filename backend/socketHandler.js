module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('join', ({ username, room }) => {
      socket.join(room);
      socket.data.username = username;
      socket.data.room = room;
      socket.to(room).emit('user-joined', { username });
    });

    // receive audio + subtitle and broadcast to others in the room
    socket.on('send-audio', (payload) => {
      const room = socket.data.room;
      if (room) {
        socket.to(room).emit('receive-audio', payload);
      }
    });

    socket.on('disconnect', () => {
      const room = socket.data.room;
      const username = socket.data.username;
      if (room) socket.to(room).emit('user-left', { username });
    });
  });
};
