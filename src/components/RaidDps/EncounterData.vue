<template>
	<div class="encounter-data">
		<img
			class="encounter-icon"
			:src="encounterIcon"
			alt="Encounter"
			@click="toggleExpanded"
		>
		<div class="encounter-info">
			<span class="duration">{{ durationString }}</span>
			<h1 class="title">{{ encounter.title }}</h1>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia"
import { useDataStore } from "../../stores/data"
import EncounterIcon from "../../assets/images/encounter.png"

export default {
	name: "EncounterData",

	computed: {
		...mapState(useDataStore, [ "encounter", "durationString" ]),

		encounterIcon: function() { return EncounterIcon },
	},

	methods: {
		...mapActions(useDataStore, [ "toggleExpanded" ]),
	},
}
</script>

<style lang="scss" scoped>
.encounter-data {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	border-bottom: solid 1px rgba(223, 223, 0, 0.7);
	padding-right: 9px;
	gap: 4px;

	.encounter-icon {
		// Set by RaidDps, which folds down to this icon
		width: var(--icon-size);
		height: var(--icon-size);
		padding: 8px;
		// Folds / unfolds the overlay
		cursor: pointer;
	}

	.encounter-info {
		flex: 1;
		display: flex;
		gap: 4px;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;

		.duration, .title {
			line-height: 1;
			font-size: 14px;
		}

		.duration {
			font-weight: 700;
		}

		.title {
			font-weight: 300;
		}
	}
}
</style>
