for (const key in Blips) {
	const Blip = Blips[key];

	const thisBlip = AddBlipForCoord(Blip.coordinates[0], Blip.coordinates[1], Blip.coordinates[2]);
	SetBlipDisplay(thisBlip, 2);
	SetBlipSprite(thisBlip, Blip.blip);
	SetBlipColour(thisBlip, Blip.color);
	SetBlipAsShortRange(thisBlip, true);
	BeginTextCommandSetBlipName("STRING");
	AddTextComponentString(Blip.name);
	EndTextCommandSetBlipName(thisBlip);
}