const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('variables', {
	setEnabled: (value) => ipcRenderer.invoke('set-enabled-variable', value),
	getEnabled: () => ipcRenderer.invoke('get-enabled-variable'),
})

contextBridge.exposeInMainWorld('process', {
	exit: () => ipcRenderer.invoke('process-exit'),
})

contextBridge.exposeInMainWorld('htmlContent', {
	updateTextOfObjectById: (id, newText) =>
		ipcRenderer.invoke('update-html-text', id, newText),
})
