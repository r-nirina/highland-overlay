<template>
	<div class="encounter-data">
		<img
			class="encounter-icon"
			:src="encounterIcon"
			alt="Encounter"
			@mousedown="onIconPress"
			@click="onIconClick"
		>
		<div class="encounter-info">
			<span class="duration">{{ durationString }}</span>
			<h1 class="title">{{ encounter.title }}</h1>
		</div>
		<button
			type="button"
			class="reload-button"
			title="Recharger l'affichage"
			aria-label="Recharger l'affichage"
			@mousedown="onReloadPress"
			@click="onReloadClick"
		>
			<svg
				class="reload-icon"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
			>
				<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
			</svg>
		</button>
	</div>
</template>

<script>
import { mapActions, mapState } from "pinia"
import { useDataStore } from "../../stores/data"
import { isDragRelease } from "../../utils/drag"
import EncounterIcon from "../../assets/images/encounter.png"

export default {
	name: "EncounterData",

	data: () => ({
		// Where the icon was last pressed, on screen
		iconPress: null,
		reloadPress: null,
	}),

	computed: {
		...mapState(useDataStore, [ "encounter", "durationString" ]),

		encounterIcon: function() { return EncounterIcon },
	},

	methods: {
		...mapActions(useDataStore, [ "toggleExpanded" ]),

		onIconPress(event) {
			this.iconPress = { screenX: event.screenX, screenY: event.screenY }
		},

		// Dragging the folded overlay by its icon must not unfold it
		onIconClick(event) {
			if (!isDragRelease(this.iconPress, event)) {
				this.toggleExpanded()
			}
		},

		onReloadPress(event) {
			this.reloadPress = { screenX: event.screenX, screenY: event.screenY }
		},

		// Dragging the overlay from the reload button must not trigger a reload
		onReloadClick(event) {
			if (!isDragRelease(this.reloadPress, event)) {
				window.location.reload()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.encounter-data {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	border-bottom: solid 1px rgba(223, 223, 0, 0.7);
	padding-right: 9px;
	gap: 4px;

	.encounter-icon {
		// Set by RaidDps, which folds down to this icon
		width: var(--icon-size);
		height: var(--icon-size);
		padding: 8px;
		// Folds / unfolds the overlay
		cursor: pointer;
	}

	.encounter-info {
		flex: 1;
		display: flex;
		gap: 4px;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: flex-start;

		.duration, .title {
			line-height: 1;
			font-size: 14px;
		}

		.duration {
			font-weight: 700;
		}

		.title {
			font-weight: 300;
		}
	}

	.reload-button {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
		height: 28px;
		padding: 0;
		border: none;
		border-radius: 4px;
		background-color: transparent;
		color: #ffffff;
		opacity: 0.6;
		cursor: pointer;
		transition:
			opacity 150ms ease,
			background-color 150ms ease;

		&:hover {
			opacity: 1;
			background-color: rgba(255, 255, 255, 0.12);
		}

		&:active .reload-icon {
			transform: rotate(180deg);
		}

		.reload-icon {
			width: 16px;
			height: 16px;
			display: block;
			transform-origin: center;
			transition: transform 200ms ease;
		}
	}
}
</style>
