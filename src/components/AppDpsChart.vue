<template>
	<OverlayShell>
		<RaidDps />
	</OverlayShell>
</template>

<script>
import OverlayShell from "./OverlayShell.vue"
import RaidDps from "./RaidDps/RaidDps.vue"

export default {
	name: "AppDpsChart",

	components: {
		OverlayShell,
		RaidDps,
	},
}
</script>
