import "@fontsource/ubuntu/300.css"
import "@fontsource/ubuntu/400.css"
import "@fontsource/ubuntu/700.css"
import "./styles/global.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { useActStore } from "./stores/act"

export function mountOverlay(rootComponent) {
	const pinia = createPinia()

	createApp(rootComponent)
		.use(pinia)
		.mount("#app")

	useActStore(pinia).initActListener()
}
