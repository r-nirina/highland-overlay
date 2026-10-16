/*
 * OverlayPlugin's modern API (addOverlayListener, removeOverlayListener, startOverlayEvents),
 * ported to an ES module from https://github.com/OverlayPlugin/OverlayPlugin/blob/main/docs/assets/shared/common.js
 * Copyright (c) 2014 RainbowMage, hibiyasleep, ngld - MIT License
 *
 * Inside OverlayPlugin, messages go through window.OverlayPluginApi, injected by the plugin.
 * In a regular browser, add ?OVERLAY_WS=ws://127.0.0.1:10501/ws to the URL to use
 * OverlayPlugin's WebSocket server instead.
 */

const subscribers = {}
let sendMessage = null

function processEvent(msg) {
	for (const callback of subscribers[msg.type] ?? []) {
		callback(msg)
	}
}

function connectWebSocket(url) {
	let ws = null
	let queue = []

	const connect = () => {
		ws = new WebSocket(url)

		ws.addEventListener("open", () => {
			const pending = queue
			queue = null
			for (const msg of pending) {
				ws.send(JSON.stringify(msg))
			}
		})

		ws.addEventListener("message", (event) => {
			let msg
			try {
				msg = JSON.parse(event.data)
			} catch {
				// eslint-disable-next-line no-console
				console.error("Invalid message received from OverlayPlugin:", event.data)
				return
			}
			processEvent(msg)
		})

		ws.addEventListener("close", () => {
			queue = []
			// Don't spam the server with retries
			setTimeout(connect, 300)
		})
	}

	connect()

	return (msg) => {
		if (queue) {
			queue.push(msg)
		} else {
			ws.send(JSON.stringify(msg))
		}
	}
}

function connectOverlayPluginApi() {
	let queue = []

	// OverlayPluginApi is a C# object bound by CefSharp: callHandler(string data, object callback) fails
	// unless both arguments are passed, so send an explicit null callback
	const callHandler = msg => window.OverlayPluginApi.callHandler(JSON.stringify(msg), null)

	const waitForApi = () => {
		if (!window.OverlayPluginApi?.ready) {
			setTimeout(waitForApi, 300)
			return
		}

		window.__OverlayCallback = processEvent

		const pending = queue
		queue = null
		for (const msg of pending) {
			callHandler(msg)
		}
	}

	waitForApi()

	return (msg) => {
		if (queue) {
			queue.push(msg)
		} else {
			callHandler(msg)
		}
	}
}

function connect() {
	const wsUrl = new URLSearchParams(window.location.search).get("OVERLAY_WS")
	return wsUrl ? connectWebSocket(wsUrl) : connectOverlayPluginApi()
}

export function addOverlayListener(event, callback) {
	subscribers[event] ??= []
	subscribers[event].push(callback)
}

export function removeOverlayListener(event, callback) {
	const callbacks = subscribers[event] ?? []
	const index = callbacks.indexOf(callback)
	if (index > -1) {
		callbacks.splice(index, 1)
	}
}

// Register every listener before calling this: OverlayPlugin only sends the events subscribed here
export function startOverlayEvents() {
	sendMessage ??= connect()
	sendMessage({
		call: "subscribe",
		events: Object.keys(subscribers),
	})
}
