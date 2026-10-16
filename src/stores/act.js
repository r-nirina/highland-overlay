import { defineStore } from "pinia"
import { addOverlayListener, startOverlayEvents } from "../services/overlay-plugin"
import { useDataStore } from "./data"

export const useActStore = defineStore("act", {
	actions: {
		async initActListener() {
			const onCombatData = actData => useDataStore().updateData(actData)

			// ?mock replays recorded combat data, to work on the overlay without ACT
			if (new URLSearchParams(window.location.search).has("mock")) {
				const { playMockCombatData } = await import("../mocks/play-mock-combat-data")
				playMockCombatData(onCombatData)
				return
			}

			addOverlayListener("CombatData", onCombatData)
			startOverlayEvents()
		},
	},
})
