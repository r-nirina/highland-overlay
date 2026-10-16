<template>
	<div :class="[ 'raid-dps', isExpanded ? 'expanded' : '' ]">
		<EncounterData />
		<CombatantData
			v-for="combatant in combatants"
			:key="combatant['name']"
			v-bind="combatant"
			class="combatant"
		/>
		<RaidData />
	</div>
</template>

<script>
import EncounterData from "./EncounterData.vue"
import CombatantData from "./CombatantData.vue"
import RaidData from "./RaidData.vue"
import { mapState } from "pinia"
import { useDataStore } from "../../stores/data"

export default {
	name: "RaidDps",

	components: {
		EncounterData,
		CombatantData,
		RaidData,
	},

	computed: {
		...mapState(useDataStore, [ "combatants", "isExpanded" ]),
	},
}
</script>

<style lang="scss" scoped>
// Insets of the clip-path below, registered so that they can be animated one after the other
@property --fold-right {
	syntax: "<length-percentage>";
	inherits: false;
	initial-value: 0px;
}
@property --fold-bottom {
	syntax: "<length-percentage>";
	inherits: false;
	initial-value: 0px;
}

.raid-dps {
	// Size of the encounter icon, the only part left visible once folded
	--icon-size: 48px;

	border-radius: 8px;
	overflow: hidden;
	clip-path: inset(0 var(--fold-right) var(--fold-bottom) 0 round 8px);

	// Folds vertically, then horizontally down to the encounter icon
	--fold-right: calc(100% - var(--icon-size));
	--fold-bottom: calc(100% - var(--icon-size));
	transition:
		--fold-bottom var(--fold-step) var(--fold-easing),
		--fold-right var(--fold-step) var(--fold-easing) var(--fold-step);

	// Unfolds horizontally to reveal the encounter data, then vertically
	&.expanded {
		--fold-right: 0px;
		--fold-bottom: 0px;
		transition:
			--fold-right var(--fold-step) var(--fold-easing),
			--fold-bottom var(--fold-step) var(--fold-easing) var(--fold-step);
	}

	& > * {
		background-color: rgba(0, 0, 0, 0.6);
	}
	.combatant:not(:last-of-type) {
		border-bottom: solid 1px rgba(0, 0, 0, 0.8);
	}
}
</style>
