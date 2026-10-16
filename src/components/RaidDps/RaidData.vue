<template>
	<span class="raid-data">
		<img :class="[ 'party-icon', isSoloFight ? 'solo-fight' : '' ]" :src="PartyIcon" alt="Raid DPS">
		<span :class="[ 'raid-dps', isSoloFight ? 'solo-fight' : '' ]">{{ raidDps }}</span>
	</span>
</template>

<script>
import { mapState } from "pinia"
import { useDataStore } from "../../stores/data"
import PartyIcon from "../../assets/images/party.png"

export default {
	name: "RaidData",

	computed: {
		...mapState(useDataStore, [ "raidDps", "isSoloFight" ]),

		PartyIcon: function() { return PartyIcon },
	},
}
</script>

<style lang="scss" scoped>
.raid-data {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	border-top: solid 1px rgba(223, 223, 0, 0.7);

	.party-icon, .raid-dps {
		opacity: 1;
		transition: opacity 360ms ease-out 720ms;
		&.solo-fight {
			opacity: 0;
		}
	}

	.party-icon {
		max-height: 18px;
		height: auto;
		width: auto;
	}

	.raid-dps {
		display: block;
		text-align: right;
		line-height: 1.4;
		padding: 2px 8px;
		font-size: 14px;
	}
}
</style>
