const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082});

wss.on("connection", ws => {
  console.log("New Client Connected!");

  ws.on("message", data => {
    console.log(`Client has sent us: ${data}`);

    ws.send("smth in it");
  });

  ws.on("close", () => {
    console.log("Client Disconnected!");
  });
});


