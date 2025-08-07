require('dotenv').config()
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user Connectd");
  socket.on("disconnect", () => {
    console.log("A user is dissconnectd");
  });
  socket.on("message", (data)=>{
    console.log(data);
    
    console.log("A user send a message");
    
  })
});
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
