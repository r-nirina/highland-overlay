import { beforeEach, describe, expect, it } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import snapshots from "../mocks/combat-data.json"
import { useDataStore } from "./data"

describe("data store", () => {
	beforeEach(() => {
		setActivePinia(createPinia())
	})

	it("starts empty", () => {
		const store = useDataStore()
		expect(store.isExpanded).toBe(false)
		expect(store.combatants).toEqual([])
		expect(store.isSoloFight).toBe(true)
		expect(store.raidDps).toBe(0)
		expect(store.durationString).toBe("00 : 00")
	})

	it("unfolds once data is received", () => {
		const store = useDataStore()
		store.updateData(snapshots[0])

		expect(store.isExpanded).toBe(true)
	})

	it("stays folded by the user when more data comes", () => {
		const store = useDataStore()
		store.updateData(snapshots[0])
		store.toggleExpanded()
		store.updateData(snapshots[1])

		expect(store.isExpanded).toBe(false)

		store.toggleExpanded()
		expect(store.isExpanded).toBe(true)
	})

	it("unfolds again when a new combat starts", () => {
		const store = useDataStore()
		const inCombat = { ...snapshots[1], isActive: "true" }
		const outOfCombat = { ...snapshots[1], isActive: "false" }
		store.updateData(inCombat)
		store.toggleExpanded()

		store.updateData(outOfCombat)
		expect(store.isExpanded).toBe(false)

		store.updateData(inCombat)
		expect(store.isExpanded).toBe(true)
	})

	it("keeps the top 8 combatants by encounter dps", () => {
		const store = useDataStore()
		store.updateData(snapshots[1])

		expect(store.combatants).toHaveLength(8)
		expect(store.combatants[0]).toMatchObject({ name: "YOU", job: "mnk", role: "melee", dps: 17.51, relativeDps: 100 })
		// Highest "dps" of the sample, but only 2 seconds of activity
		expect(store.combatants.map(c => c.name)).not.toContain("Gaalmak Errethios")
		expect(store.isSoloFight).toBe(false)
	})

	it("sums the raid dps", () => {
		const store = useDataStore()
		store.updateData(snapshots[1])

		expect(store.raidDps).toBe(84.67)
	})

	it("reads the encounter", () => {
		const store = useDataStore()
		store.updateData(snapshots[2])

		expect(store.encounter.title).toBe("Red Belly Gutter")
		expect(store.durationString).toBe("04 : 32")
	})
})
