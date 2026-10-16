import { describe, expect, it } from "vitest"
import {
	calculateRelativeDps,
	formatDuration,
	parseDpsString,
	parseDurationString,
	rankByDps,
	retrieveCombatantData,
	retrieveMaxDps,
	roundDps,
} from "./transforms"

describe("parseDpsString", () => {
	it("parses ACT dps values", () => {
		expect(parseDpsString("17.51")).toBe(17.51)
	})

	it("returns null when ACT has no value", () => {
		expect(parseDpsString("---")).toBeNull()
	})
})

describe("roundDps", () => {
	it("hides floating point noise", () => {
		expect(4521.33 + 3987.12 + 2210.07 + 1850.44).toBe(12568.960000000001)
		expect(roundDps(4521.33 + 3987.12 + 2210.07 + 1850.44)).toBe(12568.96)
	})
})

describe("retrieveCombatantData", () => {
	it("uses the dps over the whole encounter", () => {
		const combatant = retrieveCombatantData({ name: "Gaalmak Errethios", Job: "Arc", dps: "52.50", encdps: "0.36" })
		expect(combatant).toEqual({ name: "Gaalmak Errethios", job: "arc", role: "", dps: 0.36 })
	})

	it("maps jobs to roles", () => {
		expect(retrieveCombatantData({ name: "YOU", Job: "Drk", encdps: "1.00" }).role).toBe("tank")
	})

	it("recognizes the limit break", () => {
		expect(retrieveCombatantData({ name: "Limit Break", Job: "", encdps: "1000.00" }).job).toBe("lb")
	})
})

describe("calculateRelativeDps", () => {
	it("is a percentage of the top dps", () => {
		const combatants = [ { dps: 200 }, { dps: 50 } ]
		const relativeDps = combatants.map(calculateRelativeDps(retrieveMaxDps(combatants))).map(c => c.relativeDps)
		expect(relativeDps).toEqual([ 100, 25 ])
	})

	it("is 0 while nobody has dealt damage", () => {
		const combatants = [ { dps: 0 }, { dps: null } ]
		const relativeDps = combatants.map(calculateRelativeDps(retrieveMaxDps(combatants))).map(c => c.relativeDps)
		expect(relativeDps).toEqual([ 0, 0 ])
	})
})

describe("rankByDps", () => {
	it("sorts by ascending dps", () => {
		const combatants = [ { dps: 3 }, { dps: 1 }, { dps: 2 } ]
		expect(combatants.sort(rankByDps).map(c => c.dps)).toEqual([ 1, 2, 3 ])
	})
})

describe("parseDurationString", () => {
	it("parses mm:ss", () => {
		expect(parseDurationString("02:51")).toEqual({ minute: 2, seconds: 51 })
	})

	it("counts hours as minutes", () => {
		expect(parseDurationString("1:02:03")).toEqual({ minute: 62, seconds: 3 })
	})

	it("falls back to zero", () => {
		expect(parseDurationString(undefined)).toEqual({ minute: 0, seconds: 0 })
		expect(parseDurationString("--:--")).toEqual({ minute: 0, seconds: 0 })
	})
})

describe("formatDuration", () => {
	it("pads minutes and seconds", () => {
		expect(formatDuration({ minute: 2, seconds: 5 })).toBe("02 : 05")
	})
})
