// Full credit to https://github.com/gaearon/overreacted.io/pull/797
const chokidar = require("chokidar")
const WebSocket = require("ws")

const port = 3001

const wss = new WebSocket.Server({ port })
let watcherCallbacks = []

chokidar.watch("./content", { persistent: true }).on("all", (event, path) => {
  console.log("[watcher.js]", event, path)
  watcherCallbacks.forEach((cb) => cb && cb())
})

wss.on("listening", function connection() {
  console.log(`[watcher.js] WebSocket server listening on ws://localhost:${port}`)
})

wss.on("connection", function connection(ws) {
  ws.on("error", console.error)

  watcherCallbacks.push(onChange)
  let index = watcherCallbacks.length - 1

  ws.on("close", function close() {
    console.log("[watcher.js] closing")
    watcherCallbacks[index] = null
  })

  function onChange() {
    ws.send("refresh")
  }
})
