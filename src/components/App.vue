<template>
	<div class="app">
		<CombatantData
			v-for="combatant in combatants"
			:key="combatant['name']"
			v-bind:name="combatant['name']"
			v-bind:dps="combatant['dps']"
		/>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import CombatantData from "./CombatantData.vue"

export default {
	name: "App",

	components: {
		CombatantData
	},

	data: () => ({}),

	computed: {
		...mapState("data", [ "combatants" ])
	},

	mounted() {
		this.initActListener()
	},

	methods: {
		...mapActions("act", [ "initActListener" ])
	}
}
</script>

<style lang="scss">
@import url("../assets/fonts/Ubuntu/Ubuntu.scss");
@import url("../assets/fonts/UbuntuMono/UbuntuMono.scss");

* {
	font-family:   'Ubuntu', sans-serif;
	box-sizing:    border-box;
	margin:        0;
	padding:       0;
	outline:       none;
	user-select:   none;
}

html {
	height:             100%;
	width:              100%;
	background-color:   rgba(0, 0, 0, 0.5);
	color:              #ffffff;

	body {
		height:   100%;
		width:    100%;

		ul,
		ol {
			list-style:   none;
		}
	}
}

</style>
