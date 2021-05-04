import eventEmitter from '../eventemitter'
import axios from 'axios'
import { redBright } from 'chalk'
const { get } = axios

interface Presence {
	data: {
		userPresences: [
			{
				lastLocation: string
				userPresenceType: number
			}
		]
	}
}

interface User {
	data: {
		name: string
		displayName: string
		id: number
	}
}

export default async function setUserInfo(presence: Presence, user: User) {
	const pfp = await get(
		`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.data.id}&size=420x420&format=Png&isCircular=false`
	).catch((er) => {
		throw new Error(redBright(`Profile picture failed, error: ${er.message}`))
	})
	const userPresences = presence.data.userPresences[0]
	const lastLocation = userPresences.lastLocation
	let finalLocation: string
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
