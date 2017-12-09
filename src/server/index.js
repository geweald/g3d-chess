const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const Room = require("./Room");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

let rooms = [];

const addToRoom = (rooms, socket) => {
  const freeRoom = rooms.find(r => r.canPlayerJoin());
  if (freeRoom) {
    freeRoom.addPlayer(socket);
    return freeRoom;
  }
  const newRoom = new Room(socket);
  newRoom.addPlayer(socket);
  rooms.push(newRoom);
  return newRoom;
};

io.on("connection", socket => {
  const room = addToRoom(rooms, socket);

  socket.join(room.id);
  socket.broadcast.to(room.id).emit("oponentJoined");

  socket.on("ready", () => {
    room.setPlayerReady(socket);
    if (room.arePlayersReady()) {
      io.in(room.id).emit("start", room.getNextPlayerId());
    }
  });

  socket.on("move", data => {
    socket.broadcast.to(room.id).emit("oponentMoved", data);
  });

  socket.on("gameOver", () => {
    room.setPlayersNotReady();
  });

  socket.on("disconnect", () => {
    room.removePlayer(socket);
    if (room.hasAnyPlayers()) {
      socket.broadcast.to(room.id).emit("oponentLeft");
    } else {
      rooms = rooms.filter(r => r.hasAnyPlayers());
    }
  });
});

server.listen(5000, () => {
  console.log("Starting server on port 5000");
});
