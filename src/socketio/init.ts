module.exports = (io) => {
    io.sockets.on("connection", (client) => {
        console.log("Iniciando init do socket.io.js");
        client.emit("init", "This servers is initialized");
    });
}