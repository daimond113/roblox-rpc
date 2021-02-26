function switchRPC() {
	console.log(window.variables)
	window.variables.setEnabled(!window.variables.getEnabled())
	console.log(window.variables.getEnabled())
}
function killRPC() {
	window.process.exit()
}
