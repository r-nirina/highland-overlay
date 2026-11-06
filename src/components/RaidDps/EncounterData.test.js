import { describe, expect, it, vi } from "vitest"
import EncounterData from "./EncounterData.vue"

describe("EncounterData", () => {
	it("initializes with null press positions", () => {
		const data = EncounterData.data()
		expect(data.iconPress).toBeNull()
		expect(data.reloadPress).toBeNull()
	})

	it("records reloadPress on mousedown", () => {
		const context = { reloadPress: null }
		EncounterData.methods.onReloadPress.call(context, { screenX: 150, screenY: 200 })
		expect(context.reloadPress).toEqual({ screenX: 150, screenY: 200 })
	})

	it("triggers window.location.reload on click without drag", () => {
		const reloadMock = vi.fn()
		vi.stubGlobal("window", { location: { reload: reloadMock } })

		const context = { reloadPress: { screenX: 100, screenY: 100 } }
		EncounterData.methods.onReloadClick.call(context, { screenX: 100, screenY: 100 })

		expect(reloadMock).toHaveBeenCalledTimes(1)
		vi.unstubAllGlobals()
	})

	it("does not trigger reload if the overlay was dragged", () => {
		const reloadMock = vi.fn()
		vi.stubGlobal("window", { location: { reload: reloadMock } })

		const context = { reloadPress: { screenX: 100, screenY: 100 } }
		EncounterData.methods.onReloadClick.call(context, { screenX: 150, screenY: 150 })

		expect(reloadMock).not.toHaveBeenCalled()
		vi.unstubAllGlobals()
	})
})
