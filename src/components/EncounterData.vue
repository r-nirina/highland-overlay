<template>
	<div class="encounter-data">
		<img class="encounter-icon" src="../assets/images/encounter.png" alt="Encounter">
		<div class="encounter-info">
			<span class="duration">{{ encounter.duration }}</span>
			<h1 class="title">{{ encounter.title }}</h1>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
export default {
	name: "EncounterData",

	computed: {
		...mapState("data", [ "encounter" ]),
	}
}
</script>

<style lang="scss" scoped>
.encounter-data {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	border-bottom: solid 1px rgba(0, 223, 223, 0.7);

	.encounter-icon {
		max-height: 40px;
		max-width: 40px;
		padding: 9px;
	}

	.encounter-info {
		flex: 1;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;

		.duration, .title {
			line-height: 1.4;
			font-size: 14px;
		}

		.duration {
			font-weight: 700,
		}

		.title {
			font-weight: 100,
		}
	}
}
</style>
