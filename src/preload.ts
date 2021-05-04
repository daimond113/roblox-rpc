import { contextBridge, ipcRenderer } from 'electron'
let Username = document.getElementById('username')
let Status = document.getElementById('state')
let Pfp = document.getElementById('pfp') as HTMLImageElement

contextBridge.exposeInMainWorld('process', {
	exit: () => ipcRenderer.invoke('process-exit'),
})

ipcRenderer.on('set-user-info', (_, data) => {
	Username = document.getElementById('username')
	Status = document.getElementById('state')
	Pfp = document.getElementById('pfp') as HTMLImageElement
	Username.classList.remove('gradient')
	Status.classList.remove('gradient')
	Pfp.classList.remove('gradient')
	Username.innerHTML = `Name: ${data.name}</br>Display Name: ${data.displayName}`
	Status.innerHTML = `</br>Status: ${data.location}`
	Pfp.src = data.profile
})
