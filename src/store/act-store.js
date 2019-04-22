const getInitialState = () => ({})

const namespaced = true

const state = getInitialState()

const getters = {}

const mutations = {}

const actions = {
	initActListener({ dispatch }) {
		document.addEventListener("onOverlayDataUpdate", (event) => {
			dispatch("data/updateData", event.detail, { root: true })
		})
		window.addEventListener("message", (event) => {
			if (event.data.type === "onOverlayDataUpdate") {
				dispatch("data/updateData", event.data.detail, { root: true })
			}
		})
	},
}

const actStore = {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}

export default actStore
