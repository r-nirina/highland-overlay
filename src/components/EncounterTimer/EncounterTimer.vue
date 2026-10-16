<template>
	<div :class="[ 'encounter-timer', isExpanded ? 'expanded' : '' ]">
		<div class="digit-timer-display">{{ durationString }}</div>
		<div class="gauge-timer-display">
			<div class="multiples-markers-15">
				<div class="seconds-0"></div>
				<div class="seconds-15"></div>
				<div class="seconds-30"></div>
				<div class="seconds-45"></div>
				<div class="seconds-60"></div>
			</div>
			<div class="multiples-markers-20">
				<div class="seconds-0"></div>
				<div class="seconds-20"></div>
				<div class="seconds-40"></div>
				<div class="seconds-60"></div>
			</div>
			<div class="multiples-markers-5">
				<div class="seconds-0"></div>
				<div class="seconds-5"></div>
				<div class="seconds-10"></div>
				<div class="seconds-15"></div>
				<div class="seconds-20"></div>
				<div class="seconds-25"></div>
				<div class="seconds-30"></div>
				<div class="seconds-35"></div>
				<div class="seconds-40"></div>
				<div class="seconds-45"></div>
				<div class="seconds-50"></div>
				<div class="seconds-55"></div>
				<div class="seconds-60"></div>
			</div>

			<div class="gauge-timer-bar-wrapper">
				<div class="gauge-timer-bar" :style="{ width: `${encounter.duration.seconds / 60 * 100}%` }"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "pinia"
import { useDataStore } from "../../stores/data"

export default {
	name: "EncounterTimer",

	computed: {
		...mapState(useDataStore, [ "encounter", "durationString", "isExpanded" ]),
	},
}
</script>

<style lang="scss" scoped>
.encounter-timer {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	pointer-events: none;

	// Folded: clipped down to its left end. Unfolds towards the right by revealing it as is,
	// over both steps of the dps chart so that they unfold together. Clipped lower than the gauge, for its pointers
	clip-path: inset(0 100% -24px 0);
	transition: clip-path var(--fold-duration) var(--fold-easing);

	&.expanded {
		clip-path: inset(0 0 -24px 0);
	}

	.digit-timer-display {
		background-color: #000000;
		font-size: 16px;
		line-height: 24px;
		padding: 0 16px 0 10px;
		margin-right: -10px;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		z-index: 1;
		white-space: nowrap;
		text-align: center;
	}
	.gauge-timer-display {
		position: relative;
		background-color: #666666;
		// Fills the available width, along with its markers
		flex: 1;
		height: 24px;
		border-radius: 10px;
		z-index: 2;

		[class^="multiples-markers-"] {
			position: absolute;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: transparent;
			z-index: 1;
			border-radius: 10px;

			[class^="seconds-"] {
				width: 1px;
				height: 50%;
				background-color: #ffffff;
			}

			&.multiples-markers-15 {
				[class^="seconds-"] { height: 66%; }
			}
			&.multiples-markers-20 {
				top: 100%;
				bottom: -8px;
				[class^="seconds-"] {
					position: relative;
					height: 100%;
					background-color: #000000;
					width: 2px;

					&:after {
						content: " ";
						display: block;
						position: absolute;
						width: 12px;
						height: 12px;
						background-color: #000000;
						bottom: -12px;
						left: -5px;
						transform: rotate(45deg);
						border-top-right-radius: 2px;
						border-bottom-right-radius: 2px;
						border-bottom-left-radius: 2px;
						-webkit-backface-visibility: hidden;
					}
				}
			}
			&.multiples-markers-5 {
				z-index: 0;
				[class^="seconds-"] {
					height: 20%;
					background-color: #aaaaaa;
				}
			}

			.seconds-0, .seconds-60 { opacity: 0; }
		}

		&:after {
			content: " ";
			display: block;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: transparent;
			z-index: 2;
			border-radius: 10px;
			border: solid 2px #000000;
		}

		.gauge-timer-bar-wrapper {
			z-index: 0;
			height: 100%;
			width: 100%;
			border-radius: 16px;
			overflow: hidden;

			.gauge-timer-bar {
				height: 100%;
				width: 0;
				margin-right: auto;
				background-color: rgba(255, 255, 65, 0.3);
				transition: width 120ms linear;
				border-right: solid 1px rgba(223, 223, 0, 0.7);
			}
		}
	}
}
</style>
