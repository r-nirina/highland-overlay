import { describe, expect, it } from "vitest"
import { isDragRelease } from "./drag"

describe("isDragRelease", () => {
	const press = { screenX: 100, screenY: 100 }

	it("lets a click in place through", () => {
		expect(isDragRelease(press, { screenX: 100, screenY: 100 })).toBe(false)
	})

	it("tolerates a mouse that shakes by a few pixels", () => {
		expect(isDragRelease(press, { screenX: 102, screenY: 101 })).toBe(false)
	})

	it("detects that the overlay was dragged", () => {
		expect(isDragRelease(press, { screenX: 160, screenY: 140 })).toBe(true)
	})

	it("lets a click through when its press was missed", () => {
		expect(isDragRelease(null, { screenX: 160, screenY: 140 })).toBe(false)
	})
})
