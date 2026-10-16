<template>
	<div :class="[ 'app', hasData ? 'visible' : '' ]">
		<slot />
	</div>
</template>

<script>
import { mapState } from "pinia"
import { useDataStore } from "../stores/data"

export default {
	name: "OverlayShell",

	computed: {
		...mapState(useDataStore, [ "hasData" ]),
	},
}
</script>

<style lang="scss" scoped>
// Hidden until the first combat data, then stays visible to read the results
.app {
	opacity: 0;
	transition: opacity 360ms ease-out;

	&.visible {
		opacity: 1;
	}
}
</style>
