<template>
	<OverlayShell>
		<EncounterTimer class="encounter-timer" />
		<RaidDps class="raid-dps" />
	</OverlayShell>
</template>

<script>
import OverlayShell from "./OverlayShell.vue"
import EncounterTimer from "./EncounterTimer/EncounterTimer.vue"
import RaidDps from "./RaidDps/RaidDps.vue"

export default {
	name: "App",

	components: {
		OverlayShell,
		EncounterTimer,
		RaidDps,
	},
}
</script>

<style lang="scss" scoped>
.encounter-timer { margin: 40px auto; }
.raid-dps { width: 100%; }
</style>
