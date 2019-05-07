<template>
	<div :class="[ 'app', isActive ? 'active' : '' ]">
		<EncounterData />
		<CombatantData
			v-for="combatant in combatants"
			:key="combatant['name']"
			v-bind="combatant"
			class="combatant"
		/>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import CombatantData from "./CombatantData.vue"
import EncounterData from "./EncounterData.vue"

export default {
	name: "App",

	components: {
		CombatantData,
		EncounterData,
	},

	data: () => ({}),

	computed: {
		...mapState("act", [ "isActive" ]),
		...mapState("data", [ "combatants" ]),
	},

	mounted() {
		this.initActListener()
	},

	methods: {
		...mapActions("act", [ "initActListener" ]),
	},
}
</script>

<style lang="scss">
@import url("../assets/fonts/Ubuntu/Ubuntu.scss");
@import url("../assets/fonts/UbuntuMono/UbuntuMono.scss");

* {
	font-family:   'Ubuntu', sans-serif;
	font-size:     14px;
	box-sizing:    border-box;
	margin:        0;
	padding:       0;
	outline:       none;
	user-select:   none;
	position:      relative;
	line-height:   1;
}

html {
	height:             100%;
	width:              100%;
	color:              #ffffff;

	body {
		height:   100%;
		width:    100%;

		ul,
		ol {
			list-style:   none;
		}

		.app {
			background-color:   rgba(0, 0, 0, 0.6);
			opacity: 0;
			transition: opacity 360ms ease-out;

			&.active {
				opacity: 1;
			}

			.combatant:not(:last-of-type) {
				border-bottom: solid 1px rgba(0, 0, 0, 0.8);
			}
		}
	}
}

</style>
