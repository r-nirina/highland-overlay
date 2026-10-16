import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// The module keeps its listeners and connection in module state: load a fresh copy for each test
const loadOverlayPlugin = async() => {
	vi.resetModules()
	return import("./overlay-plugin")
}

describe("overlay-plugin", () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		vi.unstubAllGlobals()
	})

	describe("inside OverlayPlugin", () => {
		it("subscribes once OverlayPluginApi is ready", async() => {
			const api = { ready: false, callHandler: vi.fn() }
			vi.stubGlobal("window", { location: { search: "" }, OverlayPluginApi: api })
			const { addOverlayListener, startOverlayEvents } = await loadOverlayPlugin()

			addOverlayListener("CombatData", () => {})
			startOverlayEvents()
			expect(api.callHandler).not.toHaveBeenCalled()

			api.ready = true
			vi.advanceTimersByTime(300)
			// Both arguments are required by the C# method behind OverlayPluginApi
			expect(api.callHandler).toHaveBeenCalledWith(JSON.stringify({ call: "subscribe", events: [ "CombatData" ] }), null)
		})

		it("subscribes right away when OverlayPluginApi is already ready", async() => {
			const api = { ready: true, callHandler: vi.fn() }
			vi.stubGlobal("window", { location: { search: "" }, OverlayPluginApi: api })
			const { addOverlayListener, startOverlayEvents } = await loadOverlayPlugin()

			addOverlayListener("CombatData", () => {})
			startOverlayEvents()

			expect(api.callHandler).toHaveBeenCalledExactlyOnceWith(JSON.stringify({ call: "subscribe", events: [ "CombatData" ] }), null)
		})

		it("dispatches events to the listeners of their type", async() => {
			const fakeWindow = { location: { search: "" }, OverlayPluginApi: { ready: true, callHandler: vi.fn() } }
			vi.stubGlobal("window", fakeWindow)
			const { addOverlayListener, removeOverlayListener, startOverlayEvents } = await loadOverlayPlugin()
			const onCombatData = vi.fn()
			const onLogLine = vi.fn()

			addOverlayListener("CombatData", onCombatData)
			addOverlayListener("LogLine", onLogLine)
			startOverlayEvents()
			fakeWindow.__OverlayCallback({ type: "CombatData", isActive: "true" })

			expect(onCombatData).toHaveBeenCalledWith({ type: "CombatData", isActive: "true" })
			expect(onLogLine).not.toHaveBeenCalled()

			removeOverlayListener("CombatData", onCombatData)
			fakeWindow.__OverlayCallback({ type: "CombatData", isActive: "false" })
			expect(onCombatData).toHaveBeenCalledTimes(1)
		})
	})

	describe("with ?OVERLAY_WS=", () => {
		it("connects to the WebSocket server and subscribes once connected", async() => {
			const sockets = []
			class FakeWebSocket {
				constructor(url) {
					this.url = url
					this.listeners = {}
					this.send = vi.fn()
					sockets.push(this)
				}

				addEventListener(type, listener) {
					this.listeners[type] = listener
				}
			}
			vi.stubGlobal("WebSocket", FakeWebSocket)
			vi.stubGlobal("window", { location: { search: "?OVERLAY_WS=ws://127.0.0.1:10501/ws" } })
			const { addOverlayListener, startOverlayEvents } = await loadOverlayPlugin()
			const onCombatData = vi.fn()

			addOverlayListener("CombatData", onCombatData)
			startOverlayEvents()
			const [ socket ] = sockets
			expect(socket.url).toBe("ws://127.0.0.1:10501/ws")
			expect(socket.send).not.toHaveBeenCalled()

			socket.listeners.open()
			expect(socket.send).toHaveBeenCalledWith(JSON.stringify({ call: "subscribe", events: [ "CombatData" ] }))

			socket.listeners.message({ data: JSON.stringify({ type: "CombatData", isActive: "true" }) })
			expect(onCombatData).toHaveBeenCalledWith({ type: "CombatData", isActive: "true" })
		})
	})
})
