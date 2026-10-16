import snapshots from "./combat-data.json"

// Replays the recorded CombatData events in a loop, one every 2 seconds
export function playMockCombatData(onCombatData) {
	let index = 0
	const playNext = () => {
		onCombatData(snapshots[index % snapshots.length])
		index++
	}

	playNext()
	return setInterval(playNext, 2000)
}
