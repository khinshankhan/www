// Full credit to https://github.com/gaearon/overreacted.io/pull/797
const { WebSocketServer } = require("ws");
const chokidar = require("chokidar");

const wss = new WebSocketServer({ port: 3001 });
const watchCallbacks = [];

chokidar.watch("./content").on("all", (event) => {
  if (event === "change") {
    watchCallbacks.forEach((cb) => cb());
  }
});

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  watchCallbacks.push(onChange);
  ws.on("close", function close() {
    const index = watchCallbacks.findIndex(onChange);
    watchCallbacks.splice(index, 1);
  });

  function onChange() {
    ws.send("refresh");
  }
});
