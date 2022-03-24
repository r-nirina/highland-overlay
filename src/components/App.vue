<template>
  <div :class="[ 'app', isActive ? 'active' : '' ]">
    <div class="left-pane">
      <EncounterData />
      <CombatantData
        v-for="combatant in combatants"
        :key="combatant['name']"
        v-bind="combatant"
        class="combatant"
      />
      <RaidData />
    </div>
    <div class="right-pane">
      <EncounterTimer />
    </div>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"
import CombatantData from "./CombatantData.vue"
import EncounterData from "./EncounterData.vue"
import EncounterTimer from "./EncounterTimer.vue";
import RaidData from "./RaidData.vue"

export default {
	name: "App",

	components: {
		CombatantData,
		EncounterData,
    EncounterTimer,
		RaidData,
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

      .left-pane {
        & > * {
          background-color: rgba(0, 0, 0, 0.6);
        }

        .combatant:not(:last-of-type) {
          border-bottom: solid 1px rgba(0, 0, 0, 0.8);
        }
      }
      .right-pane {
        margin-left: 60px;
        margin-top: 60px;
        background-color: rgba(0, 0, 0, 0);
      }
		}
	}
}

</style>
