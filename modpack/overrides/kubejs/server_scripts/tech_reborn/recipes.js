onEvent('recipes', event => {
	[
		'solar_panel/ultimate_solar_panel_alt',
		'solar_panel/industrial_solar_panel_alt',
		'solar_panel/advanced_solar_panel_alt',
		'solar_panel/advanced_solar_panel_alt',
		'machine_block/basic_machine_frame_alt',
		'machine/iron_furnace',
		'machine/iron_alloy_furnace'
	].forEach((id) => { event.remove({ id: 'techreborn:crafting_table/'+id }); });

	[
		'techreborn:smelting/platinum_ingot_from_c_sheldonite_ores',
		'techreborn:blasting/platinum_ingot_from_c_sheldonite_ores',
		'techreborn:smelting/platinum_ingot_from_c_sheldonite_ores_exported_mi_furnace'
	].forEach((id) => { event.remove({ id: id }); });


    //remove iron alloy smelter and gate electrum behind advanced circuits
	event.replaceInput({id: "techreborn:crafting_table/machine/alloy_smelter"}, 'techreborn:iron_alloy_furnace', 'techreborn:iron_furnace');
	event.replaceInput({id: "techreborn:crafting_table/machine/alloy_smelter"}, 'techreborn:electronic_circuit', 'techreborn:advanced_circuit');

    //techreborn
	event.remove({output: 'techreborn:advanced_circuit'});
	event.remove({output: 'techreborn:industrial_circuit'});
	event.remove({output: 'techreborn:data_storage_core'});
	event.shaped('techreborn:data_storage_core', [ 'RGR', 'NCN', 'EPE' ], {
		R: '#c:dusts/redstone',
		G: '#c:dusts/glowstone',
		N: 'indrev:enriched_nikolite_ingot',
		C: '#c:circuits/basic',
		E: '#c:plates/electrum',
		P: '#c:peridot_plates'
	})
	event.remove({input: 'techreborn:iridium_alloy_ingot'});
	event.remove({output: 'techreborn:data_storage_chip'});
	event.remove({output: 'techreborn:energy_flow_chip'});
});