const { ipcMain, BrowserWindow, app } = require('electron')
const { join } = require('path')
const variables = require('../variables')

function createWindow(tray) {
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

	mainWindow.setMenu(null)

	mainWindow.loadFile(join(__dirname, '..', 'html', 'index.html'))

	mainWindow.webContents.openDevTools()

	ipcMain.handle('get-enabled-variable', () => {
		return variables.enabled
	})

	ipcMain.handle('set-enabled-variable', (_, value) => {
		if (typeof value !== 'boolean') {
			throw new TypeError(`Value, expected string, got ${typeof value}`)
		}
		variables.enabled = value
	})

	ipcMain.handle('process-exit', () => {
		app.quit()
	})

	ipcMain.handle('update-html-text', (_, id, newText) => {
		mainWindow.webContents.executeJavaScript(
			`document.getElementById('${id}').innerHTML = '${newText}'`
		)
	})

	tray.on('click', () => {})
}

function createBackgroundWindow() {
	const win = new BrowserWindow({
		show: false,
		webPreferences: {
			contextIsolation: true,
		},
	})

	win.loadFile(join(__dirname, '..', 'src', 'html', 'background.html'))
}

module.exports = {
	createWindow: createWindow,
	createBackgroundWindow: createBackgroundWindow,
}
