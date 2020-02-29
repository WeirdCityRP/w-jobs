const Jobs = ['ems', 'pdm', 'sasp'];

RegisterCommand('setjob', (src, args) => {
	switch (true) {
		case !IsPlayerAceAllowed(src, 'admin'):
			emitNet('chat:addMessage', src, { args: ['SYSTEM', 'This command is only available for admins.'] });
			return;
		case args.length !== 2:
			emitNet('chat:addMessage', src, { args: ['SYSTEM', 'Invalid usage of command.'] });
			return;
		default:
			break;
	}

	const playerID = args[0];
	const Job = args[1].toLowerCase();

	for (let i = 0; i <= 32; i++) {
		if (GetPlayerFromIndex(i) == playerID) {
			break;
		} else if (i === 32 && GetPlayerFromIndex(i) != playerID) {
			emitNet('chat:addMessage', src, { args: ['SYSTEM', 'Invalid player ID.'] });
			return;
		}
	}

	switch (true) {
		case !Jobs.includes(Job):
			emitNet('chat:addMessage', src, { args: ['SYSTEM', 'Invalid job.'] });
			return;
		case IsPlayerAceAllowed(playerID, Job) == 1:
			emitNet('chat:addMessage', src, { args: ['SYSTEM', `Player ${GetPlayerName(playerID)} already has ${Job.toUpperCase()} job.`] });
			return;
		default:
			break;
	}

	const NumPlayerIdentifiers = GetNumPlayerIdentifiers(playerID);
	const playerName = GetPlayerName(playerID);

	for (let i = 0; i <= NumPlayerIdentifiers; i++) {
		const playerIdentifier = GetPlayerIdentifier(playerID, i);
		if (playerIdentifier.includes('steam')) {
			SteamHEX = playerIdentifier;
			break;
		} else if (i == NumPlayerIdentifiers && !playerIdentifier.includes('steam')) {
			emitNet('chat:addMessage', src, { args: ['SYSTEM', `Unable to set job for player ${playerName}.`] });
			return;
		}
	}

	// Remove previously owned job
	Jobs.forEach(Job => {
		if (IsPlayerAceAllowed(playerID, Job)) {
			ExecuteCommand(`remove_principal identifier.${SteamHEX} job.${Job}`);
		}
	});

	ExecuteCommand(`add_principal identifier.${SteamHEX} job.${Job}`);
	emitNet('chat:addMessage', src, { args: ['SYSTEM', `${Job.toUpperCase()} job given to player ${playerName}.`] });
}, false);