import { defineStore } from "pinia"
import {
	retrieveCombatantData,
	retrieveEncounterData,
	calculateRelativeDps,
	retrieveMaxDps,
	rankByDps,
	roundDps,
	formatDuration,
} from "../utils/transforms"

export const useDataStore = defineStore("data", {
	state: () => ({
		hasData: false,
		combatants: [],
		encounter: {
			title: "",
			duration: { minute: 0, seconds: 0 },
		},
	}),

	getters: {
		raidDps: (state) => {
			return roundDps(state.combatants.reduce((acc, c) => ((c.dps != null) ? (acc + c.dps) : acc), 0))
		},
		isSoloFight: (state) => {
			return state.combatants.length < 2
		},
		durationString: (state) => {
			return formatDuration(state.encounter.duration)
		},
	},

	actions: {
		updateData(actData) {
			const combatants = Object.values(actData["Combatant"])
				.map(retrieveCombatantData)
				.sort(rankByDps)
				.reverse()
				.slice(0, 8)
			const maxDps = retrieveMaxDps(combatants)
			this.combatants = combatants
				.map(calculateRelativeDps(maxDps))

			this.encounter = retrieveEncounterData(actData["Encounter"])
			this.hasData = true
		},
	},
})
