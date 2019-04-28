export function parseDpsString(dpsString) {
	const dps = parseFloat(dpsString)
	return isNaN(dps) ? null : dps
}

export function getRole(jobString) {
	const roles = Object.entries({
		tank: [ "pld", "war", "drk" ],
		healer: [ "whm", "sch", "ast" ],
		melee: [ "mnk", "drg", "nin", "sam" ],
		ranged: [ "brd", "mch" ],
		caster: [ "blm", "smn", "rdm" ],
	})
	for (const [ role, jobs ] of roles) {
		if (jobs.includes(jobString)) return role
	}
	return ""
}

export function retrieveCombatantData(combatantData) {
	const name = combatantData["name"].trim()
	const dps = parseDpsString(combatantData["dps"])
	const job = combatantData["Job"].toLowerCase().trim()
	const role = getRole(job)

	return ({
		name,
		dps,
		job,
		role,
	})
}

export function retrieveEncounterData(encounterData) {
	return ({
		title: encounterData["title"],
		duration: encounterData["duration"],
	})
}
