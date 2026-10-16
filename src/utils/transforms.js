import { JOB_TO_ROLE_MAP } from "../const/jobs"

export function parseDpsString(dpsString) {
	const dps = parseFloat(dpsString)
	return isNaN(dps) ? null : dps
}

export function roundDps(dps) {
	return Math.round(dps * 100) / 100
}

export function getRole(jobString) {
	return JOB_TO_ROLE_MAP[jobString] || ""
}

export function retrieveCombatantData(combatantData) {
	const jobString = combatantData["Job"].toLowerCase().trim()

	const name = combatantData["name"].trim()
	const dps = parseDpsString(combatantData["encdps"])
	const job = (jobString === "" && name === "Limit Break")
		? "lb"
		: jobString
	const role = getRole(job)

	return ({
		name,
		dps,
		job,
		role,
	})
}

export function retrieveMaxDps(combatants) {
	return Math.max(...combatants.map(c => c.dps))
}

export function calculateRelativeDps(maxDps) {
	return function(combatantData) {
		return ({
			...combatantData,
			relativeDps: (maxDps > 0) ? (combatantData.dps / maxDps) * 100 : 0,
		})
	}
}

export function rankByDps(combatant1, combatant2) {
	return (combatant1.dps < combatant2.dps)
		? -1
		: (combatant1.dps > combatant2.dps)
			? 1
			: 0
}

// "mm:ss", or "hh:mm:ss" once the encounter lasts an hour
export function parseDurationString(durationString) {
	const parts = `${durationString ?? ""}`.split(":").map((s) => {
		const n = Number(s)
		return isNaN(n) ? 0 : n
	})
	const seconds = parts.pop() ?? 0
	const minutes = parts.pop() ?? 0
	const hours = parts.pop() ?? 0
	return ({ minute: hours * 60 + minutes, seconds })
}

export function retrieveEncounterData(encounterData) {
	return ({
		title: encounterData["title"],
		duration: parseDurationString(encounterData["duration"]),
	})
}

export function padTimerDigitString(timerString) {
	return `${timerString || 0}`.padStart(2, "0")
}

export function formatDuration(duration) {
	return `${padTimerDigitString(duration.minute)} : ${padTimerDigitString(duration.seconds)}`
}
