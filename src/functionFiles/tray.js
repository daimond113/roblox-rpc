const { join } = require('path')
const { Tray, Menu } = require('electron')
function createTray() {
	console.log(__dirname)
	const tray = new Tray(join(process.cwd(), 'robloxrpcicon.png'))
	const ctxMenuToBuild = [
		{ label: 'Exit', type: 'normal' },
		{ label: 'Unminimize', type: 'normal' },
	]
	tray.setToolTip('Roblox-RPC')
	tray.setContextMenu(Menu.buildFromTemplate(ctxMenuToBuild))
	return tray
}

module.exports = createTray
