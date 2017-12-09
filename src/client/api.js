import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("message", data => console.log(data));
socket.emit("test");
