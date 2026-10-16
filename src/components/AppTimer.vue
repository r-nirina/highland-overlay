<template>
	<OverlayShell>
		<EncounterTimer />
	</OverlayShell>
</template>

<script>
import OverlayShell from "./OverlayShell.vue"
import EncounterTimer from "./EncounterTimer/EncounterTimer.vue"

export default {
	name: "AppTimer",

	components: {
		OverlayShell,
		EncounterTimer,
	},
}
</script>
