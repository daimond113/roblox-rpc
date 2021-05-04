import { join } from 'path'
import { Tray, Menu, BrowserWindow, nativeImage } from 'electron'
import { MenuItemConstructorOptions } from 'electron/main'
let activated = true

export default function createTray(browserWindow: BrowserWindow) {
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
		] as MenuItemConstructorOptions[]
		tray.setContextMenu(Menu.buildFromTemplate(newCtxMenu))
	}
	const ctxMenuToBuild = [
		{ label: 'Exit', type: 'normal', click: exit },
		{ label: 'Hide', type: 'normal', click: hide },
	] as MenuItemConstructorOptions[]
	tray.setContextMenu(Menu.buildFromTemplate(ctxMenuToBuild))
	tray.setToolTip('Roblox-RPC')
	return tray
}
