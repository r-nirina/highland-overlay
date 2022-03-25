/* eslint-disable no-new */
import Vue from "vue"
import store from "./store"
import AppTimer from "./components/AppTimer"

if (process.env.NODE_ENV === "production") {
	Vue.config.devtools = false
	Vue.config.productionTip = false
}

new Vue({
	el: "#app",
	store,
	render: h => h(AppTimer),
})
