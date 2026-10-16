import { defineStore } from "pinia"
import {
	retrieveCombatantData,
	retrieveEncounterData,
	calculateRelativeDps,
	retrieveMaxDps,
	rankByDps,
	roundDps,
	formatDuration,
	parseIsActive,
} from "../utils/transforms"

export const useDataStore = defineStore("data", {
	state: () => ({
		// Folded until the first combat data, then unfolded by each new combat, and folded / unfolded
		// by clicking the encounter icon
		isExpanded: false,
		hasData: false,
		// Whether ACT's encounter is in progress
		isActive: false,
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

			// OverlayPlugin sends combat data every second, in combat or not: a new combat is when it becomes active
			const isActive = parseIsActive(actData["isActive"])
			if (!this.hasData || (isActive && !this.isActive)) {
				this.isExpanded = true
			}
			this.hasData = true
			this.isActive = isActive
		},

		toggleExpanded() {
			this.isExpanded = !this.isExpanded
		},
	},
})
