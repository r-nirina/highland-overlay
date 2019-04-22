import Vue from "vue"
import Vuex from "vuex"

import actStore from "./act-store"
import dataStore from "./data-store"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		act: actStore,
		data: dataStore,
	},
})
