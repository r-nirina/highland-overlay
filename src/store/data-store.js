import {
	retrieveCombatantData,
	retrieveEncounterData,
	calculateRelativeDps,
	retrieveMaxDps,
	rankByDps,
} from "../utils/transforms"

const getInitialState = () => ({
	combatants: [],
	encounter: {
		title: "",
		duration: "",
	},
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
			.map(retrieveCombatantData)
			.sort(rankByDps)
			.reverse()
			.slice(0, 8)
		const maxDps = retrieveMaxDps(combatants)
		const combatantsDataCompleted = combatants
			.map(calculateRelativeDps(maxDps))
		commit("updateCombatantsData", combatantsDataCompleted)

		const encounter = retrieveEncounterData(encounterData["Encounter"])
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
