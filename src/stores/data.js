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

// How long the overlay stays unfolded once the encounter has ended, to read its results
export const FOLD_DELAY = 10000

let foldTimeout = null

function cancelFold() {
	clearTimeout(foldTimeout)
	foldTimeout = null
}

export const useDataStore = defineStore("data", {
	state: () => ({
		// Folded until the first combat data, then unfolded by each new combat and folded a few seconds after
		// it ends, and folded / unfolded by clicking the encounter icon
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

			// OverlayPlugin sends combat data every second, in combat or not: a new combat is when it becomes
			// active, and the encounter ends when it becomes inactive
			const isActive = parseIsActive(actData["isActive"])
			if (!this.hasData || (isActive && !this.isActive)) {
				cancelFold()
				this.isExpanded = true
			} else if (!isActive && this.isActive) {
				cancelFold()
				foldTimeout = setTimeout(() => {
					this.isExpanded = false
				}, FOLD_DELAY)
			}
			this.hasData = true
			this.isActive = isActive
		},

		toggleExpanded() {
			// The user takes over: a pending fold would undo their choice
			cancelFold()
			this.isExpanded = !this.isExpanded
		},
	},
})
