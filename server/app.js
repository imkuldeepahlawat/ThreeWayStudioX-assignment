const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const userRouter = require("./routes/user.route");

app.use(cors());
app.use(express.json());

// Your socket.io code
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `*`,
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Exporting app for use in index.js
module.exports = { app, server };
