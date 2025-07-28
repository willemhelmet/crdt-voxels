import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (room) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = {};
    }
    rooms[room][socket.id] = { x: 0, y: 0, z: 0 };
    io.to(room).emit("update", rooms[room]);
  });

  socket.on("position", (data) => {
    const { room, position } = data;
    if (rooms[room] && rooms[room][socket.id]) {
      rooms[room][socket.id] = position;
      io.to(room).emit("update", rooms[room]);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    for (const room in rooms) {
      if (rooms[room][socket.id]) {
        delete rooms[room][socket.id];
        io.to(room).emit("update", rooms[room]);
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});