/* eslint-disable no-new */
import Vue from "vue"
import App from "./components/App.vue"
import store from "./store"

if (process.env.NODE_ENV === "production") {
	Vue.config.devtools = false
	Vue.config.productionTip = false
}

new Vue({
	el: "#app",
	store,
	render: h => h(App),
})
