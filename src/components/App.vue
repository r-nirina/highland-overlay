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
.encounter-timer { margin: 40px auto; }
.raid-dps { width: 100%; }
</style>
