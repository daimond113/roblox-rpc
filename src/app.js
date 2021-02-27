const { app } = require('electron')
const {
	createBackgroundWindow,
	createWindow,
	createTray,
} = require('./functions')

app.whenReady().then(() => {
	const tray = createTray()
	createWindow(tray)
	createBackgroundWindow()
})

app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})
