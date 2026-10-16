<template>
	<div :class="[ 'job-icon', role ]">
		<img
			:src="jobIcon"
			:alt="job"
		/>
	</div>
</template>

<script>
import empty from "../../assets/images/jobs/empty.png"

// Every PNG in assets/images/jobs is an icon, named after its job code ("drk.png" for "drk")
const jobIcons = Object.fromEntries(
	Object.entries(import.meta.glob("../../assets/images/jobs/*.png", { eager: true, import: "default" }))
		.map(([ path, url ]) => [ path.split("/").pop().replace(".png", ""), url ]),
)

export default {
	name: "JobIcon",

	props: {
		job: { type: String, default: "" },
		role: { type: String, default: "" },
	},

	computed: {
		jobIcon: function() {
			return (jobIcons[this.job] || empty)
		},
	},
}
</script>

<style lang="scss" scoped>
.job-icon {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	&.tank {
		background-color: rgba(74, 108, 218, 0.5);
	}
	&.healer {
		background-color: rgba(59, 169, 74, 0.5);
	}
	&.melee,
	&.ranged,
	&.caster {
		background-color: rgba(190, 80, 80, 0.5);
	}
	/*
	&.ranged {
		background-color: rgba(223, 170, 85, 0.5);
	}
	&.caster {
		background-color: rgba(142, 101, 161, 0.5);
	}
	*/

	img {
		max-width: 20px;
		width: auto;
		max-height: 20px;
		height: auto;
	}
}
</style>
