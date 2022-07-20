onEvent('tags.items', event => {
	event.add('c:circuits/primative', 'modern_industrialization:analog_circuit');
    event.add('c:circuits/electronic', 'modern_industrialization:electronic_circuit');
    event.add('c:circuits/master', 'modern_industrialization:digital_circuit');
    event.add('c:circuits/processing', 'modern_industrialization:processing_unit');
	event.add('c:circuits/quantum', 'modern_industrialization:quantum_circuit');
	//event.get('c:tools/hammer').getObjectIds().forEach(id => {event.add('modern_industrialization:forge_hammer_tools', id);}); //incase antimatter/gt4r needs it later
	event.removeAllTagsFrom('modern_industrialization:iridium_plate');
 	event.add('c:plates/iridium_alloy', 'modern_industrialization:iridium_plate');
	["aluminum", "bronze", "copper", "gold", "invar", "iron", "stainless_steel", "steel", "tin", "titanium", "tungsten", "uranium"].forEach(m => {
		event.add('c:rods/'+m, 'modern_industrialization:'+m+'_rod');
	});
	["aluminum", "bronze", "copper", "gold", "invar", "iron", "stainless_steel", "steel", "tin", "titanium"].forEach(m => {
		event.add('c:bolts/'+m, 'modern_industrialization:'+m+'_bolt');
	});
	event.add('c:rotors/bronze', 'modern_industrialization:bronze_rotor');
	event.add('c:turbine_blades/bronze', 'modern_industrialization:bronze_blade');
	["aluminum", "copper", "electrum", "platinum", "silver", "tin"].forEach(m => {
		event.add('c:wires/'+m, 'modern_industrialization:'+m+'_wire');
	});
	event.add('c:rings/steel', 'modern_industrialization:steel_ring');
	event.add('c:rods/magnetic_steel', 'modern_industrialization:steel_rod_magnetic');
	event.add('c:dusts/coal_coke', 'modern_industrialization:coke_dust');
	event.add('c:gems/coal_coke', 'modern_industrialization:coke');
	event.add('c:blocks/coal_coke', 'modern_industrialization:coke_block');
});