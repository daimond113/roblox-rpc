const { ipcMain, BrowserWindow, app } = require('electron')
const { join } = require('path')
const eventEmitter = require('../eventemitter')

function createWindow() {
	const icon = join(__dirname, '..', 'robloxrpcicon.png')
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: join(__dirname, '..', 'preload.js'),
		},
		icon: icon,
	})

	mainWindow.on('close', (e) => {
		mainWindow.minimize()
		e.preventDefault()
	})

	mainWindow.setMenu(null)

	mainWindow.loadFile(join(__dirname, '..', 'html', 'index.html'))

	ipcMain.handle('process-exit', () => {
		process.exit()
	})

	eventEmitter.on('set-user-info', (data) => {
		mainWindow.webContents.send('set-user-info', data)
	})

	return mainWindow
}

function createBackgroundWindow() {
	const win = new BrowserWindow({
		show: false,
		webPreferences: {
			contextIsolation: true,
		},
	})

	win.loadFile(join(__dirname, '..', 'src', 'html', 'background.html'))

	return win
}

module.exports = {
	createWindow: createWindow,
	createBackgroundWindow: createBackgroundWindow,
}
