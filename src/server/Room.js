class Room {
  constructor(socket) {
    this.id = `room_${socket.id}`;
    this.players = [];
    this.startingPlayerIndex = 0;
  }

  addPlayer(socket) {
    if (this.canPlayerJoin()) {
      this.players.push({ socket, ready: false });
    }
  }

  getNextPlayerId() {
    this.startingPlayerIndex =
      (this.startingPlayerIndex + 1) % this.players.length;
    return this.players[this.startingPlayerIndex].socket.id;
  }

  canPlayerJoin() {
    return this.players.length < 2;
  }

  hasAnyPlayers() {
    return this.players.length > 0;
  }

  hasPlayer(socket) {
    return Boolean(this.players.find(p => p.socket === socket));
  }

  removePlayer(socket) {
    this.players = this.players.filter(p => p.socket === socket);
  }

  setPlayerReady(socket) {
    const player = this.players.find(p => p.socket === socket);
    if (player) {
      player.ready = true;
    }
  }

  setPlayersNotReady() {
    this.players.forEach(p => {
      p.ready = false;
    });
  }

  arePlayersReady() {
    return !this.canPlayerJoin() && this.players.every(p => p.ready);
  }
}

module.exports = Room;
