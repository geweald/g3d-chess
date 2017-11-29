import openSocket from "socket.io-client"

const socket = openSocket("http://localhost:5000")

function getMessage(cb) {
  socket.on("message", data => console.log(data))
  //socket.emit("subscribeToTimer", 1000)
}

export { getMessage }
