const { Server } = require("socket.io");
const chatSocket = require("./chat.socket");

module.exports = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  chatSocket(io);
};