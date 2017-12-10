import io from "socket.io-client";

const socket = io("http://localhost:5000");

export const emitReady = () => {
  socket.emit("ready");
};

// data = { fromPoint, toPoint }
export const emitMove = data => {
  socket.emit("move", data);
};

export const emitGameOver = () => {
  socket.emit("gameOver");
};

export const onStart = callback => {
  socket.on("start", id => {
    callback(id === socket.id);
  });
};

export const onOponentLeft = callback => {
  socket.on("oponentLeft", callback);
};

// callback = data => {}, gdzie data = { fromPoint, toPoint }
export const onOponentMoved = callback => {
  socket.on("oponentMoved", callback);
};

export const onWaitingForOponent = callback => {
  socket.on("waitingForOponent", callback);
};
