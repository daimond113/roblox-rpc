const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('variables', {
	setEnabled: (value) => ipcRenderer.invoke('set-enabled-variable', value),
	getEnabled: () => ipcRenderer.invoke('get-enabled-variable'),
})

contextBridge.exposeInMainWorld('process', {
	exit: () => ipcRenderer.invoke('process-exit'),
})
