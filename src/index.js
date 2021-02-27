require('./app.js')
const variables = require('./variables')
const { getPresence } = require('./functions')
const { Client } = require('discord-rpc')
const { redBright } = require('chalk')
const rpc = new Client({
	transport: 'ipc',
})
const userId = '814160723319455794'
let reallyLastLocation
let lastTime

rpc.on('ready', () => {
	console.log(`Authenticated as ${rpc.user.username}`)
})

setInterval(async () => {
	if (variables.enabled === true) {
		const presence = await getPresence()
		const userPresences = presence.data.userPresences[0]
		const lastLocation = userPresences.lastLocation

		if (reallyLastLocation !== lastLocation) {
			lastTime = Date.now()
			reallyLastLocation = lastLocation
		}

		switch (userPresences.userPresenceType) {
			case 0:
				rpc.clearActivity()
				break
			case 1:
				rpc.setActivity({
					state: 'Website',
					details: 'Currently on the',
					startTimestamp: lastTime,
					largeImageKey: 'robloxv3',
					largeImageText: 'On the website',
				})
				break
			case 2:
				rpc.setActivity({
					state: lastLocation,
					details: 'Playing',
					startTimestamp: lastTime,
					largeImageKey: 'robloxv3',
					largeImageText: 'Playing a game',
				})
				break
			case 3:
				rpc.setActivity({
					state: lastLocation,
					details: 'Working on',
					startTimestamp: lastTime,
					largeImageKey: 'robloxstudio',
					largeImageText: 'Editing in Roblox Studio',
				})
				break
			default:
				break
		}
	} else {
		lastTime = null
		reallyLastLocation = null
		rpc.clearActivity()
	}
}, 15000)

rpc
	.login({
		clientId: userId,
	})
	.catch((er) => {
		console.error(redBright(`RPC_ERROR: ${er.message}`))
	})
