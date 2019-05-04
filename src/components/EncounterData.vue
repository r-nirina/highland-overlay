<template>
	<div class="encounter-data">
		<span class="duration">{{ encounter.duration }}</span>
		<h1 class="title">{{ encounter.title }}</h1>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: "EncounterData",

	computed: {
		...mapState("data", [ "encounter" ])
	}
}
</script>

<style lang="scss" scoped>
.encounter-data {
	min-height: 42px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	border-bottom: solid 2px rgba(0, 115, 150, 0.7);

	.duration {
		padding: 0 12px;
		line-height: 1.6;
		min-width: 72px;
		text-align: center;
		border-right: solid 2px rgba(0, 115, 150, 0.7);
		line-height: 42px;
	}

	.title {
		flex: 1;
		padding: 0 16px;
		line-height: 1.6;
	}
}
</style>
