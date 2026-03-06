const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/api');
const socketHandler = require('./socketHandler');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));

app.use('/api', apiRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

socketHandler(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
