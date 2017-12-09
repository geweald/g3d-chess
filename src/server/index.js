const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set("port", 5000);
app.use("/static", express.static(__dirname + "/static"));

// Routing
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

// Starts the server.
server.listen(5000, () => {
  console.log("Starting server on port 5000");
});

const PiecesEnum = {
  King: "King",
  Queen: "Queen",
  Rook: "Rook",
  Bishop: "Bishop",
  Knight: "Knight",
  Pawn: "Pawn"
};

const getPieces = () => ({
  [PiecesEnum.King]: 1,
  [PiecesEnum.Queen]: 1,
  [PiecesEnum.Rook]: 2,
  [PiecesEnum.Bishop]: 2,
  [PiecesEnum.Knight]: 2,
  [PiecesEnum.Pawn]: 8
});

class Player {
  constructor(socket) {
    this.socket = socket;
    this.pieces = getPieces();
  }
}

class Match {
  constructor() {
    this.isStarted = false;
  }
}

class Room {
  constructor(socket) {
    this.id = `room_${socket.id}`;
    this.players = [];
    this.started = false;
  }

  addPlayer(socket) {
    if (this.canPlayerJoin()) {
      this.players.push(socket);
      socket.join(this.id);
    }
  }

  canPlayerJoin() {
    return this.players.length < 2;
  }

  hasAnyPlayers() {
    return this.players.length > 0;
  }

  hasPlayer(socket) {
    return Boolean(this.players.find(s => s === socket));
  }

  removePlayer(socket) {
    this.players = this.players.filter(s => s === socket);
  }

  startMatch() {
    //console.log("Match started", this.players);
  }
}

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

const rooms = [];

io.on("connection", socket => {
  const room = addToRoom(rooms, socket);

  socket.on("test", (id, msg) => {
    socket.broadcast.to(socket.id).emit("message", "xd");
  });

  socket.on("disconnect", () => {
    const playerRoom = rooms.find(r => r.hasPlayer(socket));

    if (playerRoom) {
      playerRoom.removePlayer(socket);
      if (!playerRoom.hasAnyPlayers()) {
        rooms.splice(rooms.indexOf(r => r.hasAnyPlayers()), 1);
      }
    }
  });
});
