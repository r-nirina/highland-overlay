<template>
	<EncounterTimer class="encounter-timer" />
	<RaidDps class="raid-dps" />
</template>

<script>
import EncounterTimer from "./EncounterTimer/EncounterTimer.vue"
import RaidDps from "./RaidDps/RaidDps.vue"

export default {
	name: "App",

	components: {
		EncounterTimer,
		RaidDps,
	},
}
</script>

<style lang="scss" scoped>
// Left aligned on the encounter icon of the dps chart, both unfold from the left
.encounter-timer { margin: 40px 0; }
.raid-dps { width: 100%; }
</style>
