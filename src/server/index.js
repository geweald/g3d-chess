// Dependencies
const express = require("express")
const http = require("http")
const path = require("path")
const socketIO = require("socket.io")

const app = express()
const server = http.Server(app)
const io = socketIO(server)
app.set("port", 5000)
app.use("/static", express.static(__dirname + "/static"))

// Routing
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"))
})
// Starts the server.
server.listen(5000, () => {
  console.log("Starting server on port 5000")
})

// Add the WebSocket handlers
io.on("connection", socket => {})

setInterval(() => {
  io.sockets.emit("message", "hi!")
}, 1000)
