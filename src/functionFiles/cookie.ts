import { Registry } from 'rage-edit'
const reg = new Registry(
	'HKCU\\SOFTWARE\\Roblox\\RobloxStudioBrowser\\roblox.com'
)

export default async function getROBLOSECURITY() {
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
