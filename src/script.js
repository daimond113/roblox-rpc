const rootDiv = document.getElementById('root')
const loaderTemplate = document.getElementById('loader')
const mainTemplate = document.getElementById('main')

function showLoader() {
	const loaderClone = loaderTemplate.content.cloneNode(true)
	const loaderDiv = loaderClone.firstElementChild

	rootDiv.appendChild(loaderClone)

	return () => {
		loaderDiv.addEventListener('transitionend', () => {
			loaderDiv.remove()
		})

		loaderDiv.classList.add('fade')
	}
}

function showMain() {
	const mainClone = mainTemplate.content.cloneNode(true)

	rootDiv.appendChild(mainClone)
}

const hideLoader = showLoader()

function exit() {
	window.process.exit()
}

setTimeout(() => {
	showMain()
	hideLoader()
}, 1000)
