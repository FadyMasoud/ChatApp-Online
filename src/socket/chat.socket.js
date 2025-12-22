const jwt = require("jsonwebtoken");

const users = {}; // socketId -> username

module.exports = (io) => {

  //Check if user is authenticated and have a token in the socket handshake before continuing like a middleware
  // io.use((socket, next) => {
  //   if (socket.handshake.auth.token) {
  //     next();
  //   } else {
  //     next(new Error("Authentication error"));
  //   }
  // });

  //Get username from token by decoding it
  // 🔐 AUTHENTICATE SOCKET USING JWT
  io.use((socket, next) => {
    // console.log(socket);
    
    if (!socket.handshake.auth.token) {
      return next(new Error("Authentication error"));
    }
    const token = socket.handshake.auth.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.username = decoded.username;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  // SOCKET.IO using Event
  io.on("connection", (socket) => {
    // console.log(socket);
    

    users[socket.id] = socket.username;
    console.log("user socket id",socket.id, socket.username);
    


    io.emit("users", users);


    
    socket.on("privateMessage", ({ to, message }) => {
      io.to(to).emit("message", {
        from: socket.username,
        message
      });
    });

    socket.on("disconnect", () => {
      delete users[socket.id];
      io.emit("users", users);
    });
  });
};
