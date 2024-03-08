// Full credit to https://github.com/gaearon/overreacted.io/pull/797
const chokidar = require("chokidar")
const WebSocket = require("ws")

const port = 3001

const wss = new WebSocket.Server({ port })
let autorefresherCallbacks = []

chokidar.watch("./content", { persistent: true }).on("all", (event, path) => {
  console.log("[autorefresher.js]", event, path)
  autorefresherCallbacks.forEach((cb) => cb && cb())
})

wss.on("listening", function connection() {
  console.log(`[autorefresher.js] WebSocket server listening on ws://localhost:${port}`)
})

wss.on("connection", function connection(ws) {
  ws.on("error", console.error)

  autorefresherCallbacks.push(onChange)
  let index = autorefresherCallbacks.length - 1

  ws.on("close", function close() {
    console.log("[autorefresher.js] closing")
    autorefresherCallbacks[index] = null
  })

  function onChange() {
    ws.send("refresh")
  }
})
