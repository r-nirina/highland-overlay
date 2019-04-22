<template>
	<div class="combatant-data">
		<div class="name">{{ name }}</div>
		<div class="dps">{{ dps }}</div>
	</div>
</template>

<script>
export default {
	name: "CombatantData",
	props: {
		name: String,
		dps: String,
	}
}
</script>

<style lang="scss" scoped>
.combatant-data {
	width: 100%;
}
</style>
