const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082});

wss.on("connection", ws => {
  console.log("New Client Connected!");

  ws.on("message", message => {
    try {
      const data = JSON.parse(message);
      console.log(data.x, data.y);
    }
    catch(e) {
      console.log(`Something went wrong: ${e.message}`);
    }
  });

  /**/
  ws.on("close", () => {
    console.log("Client Disconnected!");
  });
});


