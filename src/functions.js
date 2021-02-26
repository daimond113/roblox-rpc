const { ipcMain } = require('electron')
const { redBright } = require('chalk')
const { Registry } = require('rage-edit')
const reg = new Registry(
	'HKCU\\SOFTWARE\\Roblox\\RobloxStudioBrowser\\roblox.com'
)
const { post, get } = require('axios')
const { BrowserWindow } = require('electron')
const { join } = require('path')
const variables = require('./variables')
async function getROBLOSECURITY() {
	const ROBLOSECURITY = await reg.get('.ROBLOSECURITY')
	const exp = ROBLOSECURITY.split(',')[1]
		.replace('EXP::', '')
		.replace(/<|>/g, '')
	const cookie = ROBLOSECURITY.split(',')[2]
		.replace('COOK::', '')
		.replace(/<|>/g, '')
	if (new Date(exp).getTime() - Date.now() <= 0) {
		throw new Error('Cookie expired! Please refresh it.')
	}
	return cookie
}

async function getPresence(rpcUserId) {
	const user = await get(`https://verify.eryn.io/api/user/${rpcUserId}`).catch(
		(er) => {
			console.log(redBright(`RBLX_AUTHENTICATED_ERROR: ${er.message}`))
		}
	)
	if (!user) {
		return console.log(redBright("You aren't authenticated as any user!"))
	}
	const cookie = await getROBLOSECURITY()
	const presence = await post(
		'https://presence.roblox.com/v1/presence/users',
		{
			userIds: [user.data.robloxId],
		},
		{
			headers: {
				Cookie: `.ROBLOSECURITY=${cookie}`,
			},
		}
	).catch((er) => {
		console.log(redBright(`RBLX_PRESENCE_ERROR: ${er.message}`))
	})
	if (!presence) {
		return console.log(redBright('Wierd, no presence was found.'))
	}
	return presence
}

function createWindow() {
	const icon = join(__dirname, '..', 'robloxrpcicon.png')
	console.log(icon)
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true,
			preload: join(__dirname, 'preload.js'),
		},
		icon: icon,
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`)

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
		process.exit()
	})
}

module.exports = {
	getPresence,
	createWindow,
}