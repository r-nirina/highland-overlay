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
		expect(store.hasData).toBe(false)
		expect(store.combatants).toEqual([])
		expect(store.isSoloFight).toBe(true)
		expect(store.raidDps).toBe(0)
		expect(store.durationString).toBe("00 : 00")
	})

	it("remembers that data was received", () => {
		const store = useDataStore()
		store.updateData(snapshots[0])

		expect(store.hasData).toBe(true)
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
