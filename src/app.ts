import functions from './functionFiles'
import { app, BrowserWindow, Tray } from 'electron'
const { createWindow, createTray, createBackgroundWindow } = functions
let tray: Tray
let backgroundWindow: BrowserWindow
let mainWindow: BrowserWindow

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
