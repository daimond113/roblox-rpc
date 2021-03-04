const { contextBridge, ipcRenderer } = require('electron')
let username = document.getElementById('username')
let status = document.getElementById('state')
let pfp = document.getElementById('pfp')

contextBridge.exposeInMainWorld('process', {
	exit: () => ipcRenderer.invoke('process-exit'),
})

ipcRenderer.on('set-user-info', (_, data) => {
	username = document.getElementById('username')
	status = document.getElementById('state')
	pfp = document.getElementById('pfp')
	username.classList.remove('gradient')
	status.classList.remove('gradient')
	pfp.classList.remove('gradient')
	username.innerHTML = `Name: ${data.name}</br>Display Name: ${data.displayName}`
	status.innerHTML = `</br>Status: ${data.location}`
	pfp.src = data.profile
})
