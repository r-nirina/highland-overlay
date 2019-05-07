const getInitialState = () => ({
	isActive: false,
})

const namespaced = true

const state = getInitialState()

const getters = {}

const mutations = {
	setActActivityState(state, isActive) {
		state.isActive = isActive
	},
}

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
