async function switchRPC() {
	const promiedValue = await window.variables.getEnabled()
	const value = !promiedValue
	window.variables.setEnabled(value)
	console.log(value)
	if (value) {
		window.htmlContent.updateTextOfObjectById('enableordisable', 'Disable RPC')
	} else {
		window.htmlContent.updateTextOfObjectById('enableordisable', 'Enable RPC')
	}
}
function killRPC() {
	window.process.exit()
}
