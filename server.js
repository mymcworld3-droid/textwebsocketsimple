// npm install ws
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let counter = 0;  // 全伺服器共享計數器

wss.on("connection", ws => {
  console.log("Client connected");

  // 新連線 → 把目前 counter 傳給他
  ws.send(JSON.stringify({ counter }));

  // 接收訊息
  ws.on("message", msg => {
    if (msg.toString() === "add") {
      counter++;

      // 廣播給所有人
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ counter }));
        }
      });
    }
  });
});
