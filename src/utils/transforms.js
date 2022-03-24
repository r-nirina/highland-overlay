import { JOB_TO_ROLE_MAP } from "../const/jobs"

export function parseDpsString(dpsString) {
	const dps = parseFloat(dpsString)
	return isNaN(dps) ? null : dps
}

export function getRole(jobString) {
	return JOB_TO_ROLE_MAP[jobString] || ""
}

export function retrieveCombatantData(combatantData) {
	const jobString = combatantData["Job"].toLowerCase().trim()

	const name = combatantData["name"].trim()
	const dps = parseDpsString(combatantData["dps"])
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
			relativeDps: (combatantData.dps / maxDps) * 100,
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

export function parseDurationString(durationString) {
	try {
		const [ minute, seconds ] = durationString.split(":").map(s => {
			const n = Number(s)
			return isNaN(n) ? 0 : n
		})
		return ({ minute, seconds })
	} catch (e) { return ({ minute: 0, seconds: 0 }) }
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
