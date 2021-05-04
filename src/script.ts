const rootDiv = document.getElementById('root')
const loaderTemplate = document.getElementById('loader') as HTMLTemplateElement
const mainTemplate = document.getElementById('main') as HTMLTemplateElement

function showLoader() {
	const loaderClone = loaderTemplate.content.cloneNode(true) as DocumentFragment
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
