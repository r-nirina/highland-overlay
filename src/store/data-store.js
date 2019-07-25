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

const getters = {
	raidDps: (state) => {
		return state.combatants.reduce((acc, c) => ((c.dps != null) ? (acc + c.dps) : acc), 0)
	},
	isSoloFight: (state) => {
		return state.combatants.length < 2
	},
}

const mutations = {
	updateCombatantsData(state, combatants) {
		state.combatants = combatants
	},

	updateEncounterData(state, encounter) {
		state.encounter = encounter
	},
}

const actions = {
	updateData({ commit }, actData) {
		const combatants = Object.values(actData["Combatant"])
			.map(retrieveCombatantData)
			.sort(rankByDps)
			.reverse()
			.slice(0, 8)
		const maxDps = retrieveMaxDps(combatants)
		const combatantsDataCompleted = combatants
			.map(calculateRelativeDps(maxDps))
		commit("updateCombatantsData", combatantsDataCompleted)

		const encounter = retrieveEncounterData(actData["Encounter"])
		commit("updateEncounterData", encounter)

		commit("act/setActActivityState", actData["isActive"] || false, { root: true })
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
