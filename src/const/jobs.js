export const JOBS = {
	pld: "pld",
	war: "war",
	drk: "drk",
	gnb: "gnb",
	whm: "whm",
	sch: "sch",
	ast: "ast",
	mnk: "mnk",
	drg: "drg",
	nin: "nin",
	sam: "sam",
	brd: "brd",
	mch: "mch",
	dnc: "dnc",
	blm: "blm",
	smn: "smn",
	rdm: "rdm",
	blu: "blu",
}

export const ROLES = {
	tank: "tank",
	healer: "healer",
	melee: "melee",
	ranged: "ranged",
	caster: "caster",
}

export const ROLE_TO_JOBS_MAP = {
	[ROLES.tank]: [ JOBS.pld, JOBS.war, JOBS.drk, JOBS.gnb ],
	[ROLES.healer]: [ JOBS.whm, JOBS.sch, JOBS.ast ],
	[ROLES.melee]: [ JOBS.mnk, JOBS.drg, JOBS.nin, JOBS.sam ],
	[ROLES.ranged]: [ JOBS.brd, JOBS.mch, JOBS.dnc ],
	[ROLES.caster]: [ JOBS.blm, JOBS.smn, JOBS.rdm, JOBS.blu ],
}

export const JOB_TO_ROLE_MAP = {
	[JOBS.pld]: ROLES.tank,
	[JOBS.war]: ROLES.tank,
	[JOBS.drk]: ROLES.tank,
	[JOBS.gnb]: ROLES.tank,

	[JOBS.whm]: ROLES.healer,
	[JOBS.sch]: ROLES.healer,
	[JOBS.ast]: ROLES.healer,

	[JOBS.mnk]: ROLES.melee,
	[JOBS.drg]: ROLES.melee,
	[JOBS.nin]: ROLES.melee,
	[JOBS.sam]: ROLES.melee,

	[JOBS.brd]: ROLES.ranged,
	[JOBS.mch]: ROLES.ranged,
	[JOBS.dnc]: ROLES.ranged,

	[JOBS.blm]: ROLES.caster,
	[JOBS.smn]: ROLES.caster,
	[JOBS.rdm]: ROLES.caster,
	[JOBS.blu]: ROLES.caster,
}
