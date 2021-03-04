const { app } = require('electron')
const {
	createBackgroundWindow,
	createWindow,
	createTray,
} = require('./functions')
let tray
let backgroundWindow
let mainWindow

app.whenReady().then(() => {
	mainWindow = createWindow()
	tray = createTray(mainWindow)
	backgroundWindow = createBackgroundWindow()
})

app.on('activate', function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

process.on('exit', () => {
	tray.destroy()
})
