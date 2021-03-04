const { join } = require('path')
const { Tray, Menu, BrowserWindow, nativeImage } = require('electron')
let activated = true

/**
 * @param {BrowserWindow} browserWindow
 */

function createTray(browserWindow) {
	const tray = new Tray(
		nativeImage.createFromPath(join(__dirname, '..', 'trayIcon.png'))
	)
	const exit = () => {
		process.exit()
	}
	const hide = () => {
		activated = !activated
		activated ? browserWindow.show() : browserWindow.hide()
		const newCtxMenu = [
			{ label: 'Exit', type: 'normal', click: exit },
			{ label: activated ? 'Hide' : 'Show', type: 'normal', click: hide },
		]
		tray.setContextMenu(Menu.buildFromTemplate(newCtxMenu))
	}
	const ctxMenuToBuild = [
		{ label: 'Exit', type: 'normal', click: exit },
		{ label: 'Hide', type: 'normal', click: hide },
	]
	tray.setContextMenu(Menu.buildFromTemplate(ctxMenuToBuild))
	tray.setToolTip('Roblox-RPC')
	return tray
}

module.exports = createTray
