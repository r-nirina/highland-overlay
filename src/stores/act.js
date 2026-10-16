import { defineStore } from "pinia"
import { addOverlayListener, startOverlayEvents } from "../services/overlay-plugin"
import { parseIsActive } from "../utils/transforms"
import { useDataStore } from "./data"

export const useActStore = defineStore("act", {
	state: () => ({
		isActive: false,
	}),

	actions: {
		async initActListener() {
			const onCombatData = (actData) => {
				useDataStore().updateData(actData)
				this.isActive = parseIsActive(actData["isActive"])
			}

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
