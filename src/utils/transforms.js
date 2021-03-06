export function parseDpsString(dpsString) {
	const dps = parseFloat(dpsString)
	return isNaN(dps) ? null : dps
}

export function getRole(jobString) {
	const roles = Object.entries({
		tank: [ "pld", "war", "drk", "gnb" ],
		healer: [ "whm", "sch", "ast" ],
		melee: [ "mnk", "drg", "nin", "sam" ],
		ranged: [ "brd", "mch", "dnc" ],
		caster: [ "blm", "smn", "rdm", "blu" ],
	})
	for (const [ role, jobs ] of roles) {
		if (jobs.includes(jobString)) return role
	}
	return ""
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

export function retrieveEncounterData(encounterData) {
	return ({
		title: encounterData["title"],
		duration: encounterData["duration"],
	})
}
