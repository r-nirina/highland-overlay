<template>
	<div :class="[ 'app', isActive ? 'active' : '' ]">
		<slot />
	</div>
</template>

<script>
import { mapState } from "pinia"
import { useActStore } from "../stores/act"

export default {
	name: "OverlayShell",

	computed: {
		...mapState(useActStore, [ "isActive" ]),
	},
}
</script>

<style lang="scss" scoped>
.app {
	opacity: 0;
	transition: opacity 360ms ease-out 10s;

	&.active {
		opacity: 1;
		transition: opacity 360ms ease-out;
	}
}
</style>
