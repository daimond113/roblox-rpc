const getPresence = require('./functionFiles/presence')
const {
	createWindow,
	createBackgroundWindow,
} = require('./functionFiles/window')
const createTray = require('./functionFiles/tray')

module.exports = {
	getPresence,
	createWindow,
	createBackgroundWindow,
	createTray,
}
