// @ts-nocheck
// Full credit to https://github.com/gaearon/overreacted.io/pull/797

import chokidar from "chokidar"
import { WebSocketServer } from "ws"

const port = 3001

// there is no ws.Server in the ESM version
// https://github.com/websockets/ws/issues/1538
const wss = new WebSocketServer({ port })
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
