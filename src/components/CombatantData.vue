<template>
	<div class="combatant-data">
		<JobIcon :job="job" />
		<div class="name">{{ name }}</div>
		<div class="dps">{{ dps }}</div>
	</div>
</template>

<script>
import JobIcon from "./JobIcon.vue"

export default {
	name: "CombatantData",

	components: {
		JobIcon
	},

	props: {
		name: String,
		dps: Number,
		job: String,
	}
}
</script>

<style lang="scss" scoped>
.combatant-data {
	width: 100%;
}
</style>
