export function parseDpsString(dpsString) {
	const dps = parseFloat(dpsString)
	return isNaN(dps) ? null : dps
}

export function retrieveCombatantData(combatantData) {
	return ({
		name: combatantData["name"],
		dps: parseDpsString(combatantData["dps"]),
		job: combatantData["Job"].toLowerCase(),
	})
}

export function retrieveEncounterData(encounterData) {
	return ({
		title: encounterData["title"],
		duration: encounterData["duration"],
	})
}
