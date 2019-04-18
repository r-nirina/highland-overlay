import Vue from "vue"
import Vuex, { Store } from "vuex"

// import ElectronStore from "./ElectronStore"

Vue.use(Vuex)

export default new Store({
	modules: {
		// electron: ElectronStore,
	},
})
