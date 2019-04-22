const getInitialState = () => ({
	combatants: [],
	encounter: null,
})

const namespaced = true

const state = getInitialState()

const getters = {}

const mutations = {
	updateCombatantsData(state, combatants) {
		state.combatants = combatants
	},

	updateEncounterData(state, encounter) {
		state.encounter = encounter
	},
}

const actions = {
	updateData({ commit }, encounterData) {
		const combatants = Object.values(encounterData["Combatant"])
		const encounter = Object.values(encounterData["Encounter"])
		commit("updateCombatantsData", combatants)
		commit("updateEncounterData", encounter)
	},
}

const dataStore = {
	namespaced,
	state,
	getters,
	mutations,
	actions,
}

export default dataStore
