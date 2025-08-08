require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const generateResponse = require("./src/service/ai.service");
const io = new Server(httpServer, {
  /* options */
});
const chatHistory = [
  {
    role:"user",
    parts:[{text:'who was pm of India in 2019'}]
  },
  {
    role:"model",
    parts:[
      {
        text:"The Prime Minister of India in 2019 was **Narendra Modi**"
      }
    ]
  }
]

io.on("connection", (socket) => {
  console.log("A user Connectd");
  socket.on("disconnect", () => {
    console.log("A user is dissconnectd");
  });
  socket.on("ai-message", async (data) => {
    console.log("Ai message recieved:", data);
    chatHistory.push({
      role:"user",
      parts:[{text:data}]
    })

    const mama = await generateResponse(chatHistory);
    console.log("AI-Response", mama);
    socket.emit("ai-message-response", { mama });
  });
});
httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
