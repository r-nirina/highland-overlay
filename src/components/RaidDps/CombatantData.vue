<template>
	<div :class="[ 'combatant-data', isSelf ? 'you' : '' ]">
		<div class="info-wrapper">
			<div class="dps-bar-wrapper">
				<div class="bar" :style="{ width: `${relativeDps}%` }"></div>
			</div>
			<div class="dps-info">
				<JobIcon class="job" :job="job" :role="role" />
				<div class="details">
					<div class="name">{{ name }}</div>
					<div class="dps">{{ dps }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import JobIcon from "../utils/JobIcon.vue"

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
		relativeDps: Number,
	},

	computed: {
		isSelf: function() {
			return this.name === "YOU"
		},
	},
}
</script>

<style lang="scss" scoped>
.combatant-data {
	min-height: 20px;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: stretch;

	.info-wrapper {
		flex: 1;

		.dps-bar-wrapper {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;

			.bar {
				height: 100%;
				background-color: rgba(0, 115, 150, 0.2);
				transition: width 240ms linear 60ms;
				border-right: solid 1px rgba(0, 223, 223, 0.7);
			}
		}

		.dps-info {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: stretch;
			height: 100%;

			.job {
				padding: 4px;
			}

			.details {
				flex: 1;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;

				.name,
				.dps {
					padding: 0 6px;
					font-weight: 100;
				}
			}
		}
	}

	&.you .info-wrapper {
		.dps-bar-wrapper {
			.bar {
				background-color: rgba(0, 115, 150, 0.5);
			}
		}
	}
}
</style>
