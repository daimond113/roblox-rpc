const { ipcRenderer } = require("electron");

let count = 0

setInterval(() => {
    ipcRenderer.send('message', `This is message number ${count}`)
    count++
}, 1000)