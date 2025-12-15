const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const path = require("path");
const initSocket = require("./socket");


dotenv.config();

connectDB();

const app = express();
app.use(express.json());




app.use("/api/auth", require("./routes/authRoutes"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);
// Init Socket.IO
initSocket(server);


const Port=process.env.PORT || 5000
server.listen(Port, () => {
  console.log("Chat App Living Room running on http://localhost:" + Port);
});