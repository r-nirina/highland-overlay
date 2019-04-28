<template>
	<div class="combatant-data">
		<div :class="[ 'role', role ]"></div>
		<JobIcon class="job" :job="job" />
		<div class="details">
			<div class="name">{{ name }}</div>
			<div class="dps">{{ dps }}</div>
		</div>
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
		role: String,
	}
}
</script>

<style lang="scss" scoped>
.combatant-data {
	min-height: 32px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: stretch;

	.role {
		width: 4px;

		&.tank {
			background-color: #4a6bda;
		}
		&.healer {
			background-color: #3baa4a;
		}
		&.melee {
			background-color: #aa3b3b;
		}
		&.ranged {
			background-color: #dbb242;
		}
		&.caster {
			background-color: #914194;
		}
	}

	.job {
		padding: 4px;
	}

	.details {
		.name {}

		.dps {}
	}
}
</style>
