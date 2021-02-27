const { redBright } = require('chalk')
const { post, get } = require('axios')
const getROBLOSECURITY = require('./cookie')

async function getPresence() {
	const cookie = await getROBLOSECURITY()
	const headers = {
		Cookie: `.ROBLOSECURITY=${cookie}`,
	}
	const user = await get('https://users.roblox.com/v1/users/authenticated', {
		headers: headers,
	}).catch((er) => {
		console.log(redBright(`RBLX_AUTHENTICATED_ERROR: ${er.message}`))
	})
	if (!user) {
		return console.log(redBright("You aren't authenticated as any user!"))
	}
	const presence = await post(
		'https://presence.roblox.com/v1/presence/users',
		{
			userIds: [user.data.id],
		},
		{
			headers: headers,
		}
	).catch((er) => {
		console.log(redBright(`RBLX_PRESENCE_ERROR: ${er.message}`))
	})
	if (!presence) {
		return console.log(redBright('Wierd, no presence was found.'))
	}
	return presence
}

module.exports = getPresence
