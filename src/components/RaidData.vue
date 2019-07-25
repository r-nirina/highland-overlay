<template>
	<span :class="[ 'raid-data', isSoloFight ? 'solo-fight' : '' ]">
		<img class="party-icon" src="../assets/images/party.png" alt="Raid DPS">
		<span class="raid-dps">{{ raidDps }}</span>
	</span>
</template>

<script>
import { mapGetters } from "vuex"
export default {
	name: "RaidData",

	computed: {
		...mapGetters("data", [ "raidDps", "isSoloFight" ]),
	}
}
</script>

<style lang="scss" scoped>
.raid-data {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	border-top: solid 1px rgba(0, 223, 223, 0.7);

	opacity: 1;
	transition: opacity 360ms ease-out 720ms;
	&.solo-fight {
		opacity: 0;
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
