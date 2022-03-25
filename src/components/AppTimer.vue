<template>
  <div :class="[ 'app', isActive ? 'active' : '' ]">
    <EncounterTimer />
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import EncounterTimer from "./EncounterTimer/EncounterTimer.vue"
import RaidDps from "./RaidDps/RaidDps.vue"

export default {
	name: "App",

	components: {
    RaidDps,
    EncounterTimer,
	},

	data: () => ({}),

	computed: {
		...mapState("act", [ "isActive" ]),
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
    overflow: hidden;

		ul,
		ol {
			list-style:   none;
		}

		.app {
			opacity: 0;
			transition: opacity 360ms ease-out 10s;

      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: start;

      &.active {
        opacity: 1;
        transition: opacity 360ms ease-out;
      }
		}
	}
}

</style>
