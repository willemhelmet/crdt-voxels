import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  // console.log("a user connected");

  socket.on("join", (room) => {
    socket.join(room);
    if (!rooms[room]) {
      rooms[room] = {};
    }
    rooms[room][socket.id] = {
      position: { x: 0, y: 0, z: 0 },
      view: "editor",
      color: "#ff0000",
    };
    io.to(room).emit("update", rooms[room]);
  });

  socket.on("position", (data) => {
    const { room, position } = data;
    if (rooms[room] && rooms[room][socket.id]) {
      rooms[room][socket.id].position = position;
      io.to(room).emit("update", rooms[room]);
    }
  });

  socket.on("viewChange", (data) => {
    const { room, view } = data;
    console.log("view change", view);
    if (rooms[room] && rooms[room][socket.id]) {
      rooms[room][socket.id].view = view;
      io.to(room).emit("update", rooms[room]);
    }
  });

  socket.on("colorChange", (data) => {
    const { room, color } = data;
    console.log("color change", color);
    if (rooms[room] && rooms[room][socket.id]) {
      rooms[room][socket.id].color = color;
      io.to(room).emit("update", rooms[room]);
    }
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
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
