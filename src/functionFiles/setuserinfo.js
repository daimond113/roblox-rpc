const eventEmitter = require('../eventemitter')
const { get } = require('axios')
const { redBright } = require('chalk')

async function setUserInfo(presence, user) {
	const pfp = await get(
		`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.data.id}&size=420x420&format=Png&isCircular=false`
	).catch((er) => {
		throw new Error(redBright(`Profile picture failed, error: ${er.message}`))
	})
	const userPresences = presence.data.userPresences[0]
	const lastLocation = userPresences.lastLocation
	let finalLocation
	switch (userPresences.userPresenceType) {
		case 0:
			finalLocation = 'Offline'
			break
		case 1:
			finalLocation = 'Website'
			break
		case 2:
			finalLocation = `In game, ${lastLocation}`
			break
		case 3:
			finalLocation = `In studio, ${lastLocation}`
			break
		default:
			break
	}
	eventEmitter.emit('set-user-info', {
		name: user.data.name,
		displayName: user.data.displayName,
		location: finalLocation,
		profile: pfp.data.data[0].imageUrl,
	})
}

module.exports = setUserInfo
