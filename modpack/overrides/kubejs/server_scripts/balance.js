onEvent('recipes', event => {
	[
		'techreborn:crafting_table/solar_panel/ultimate_solar_panel_alt',
		'techreborn:crafting_table/solar_panel/industrial_solar_panel_alt',
		'techreborn:crafting_table/solar_panel/advanced_solar_panel_alt',
		'techreborn:crafting_table/solar_panel/advanced_solar_panel_alt',
		'techreborn:crafting_table/machine_block/basic_machine_frame_alt',
		'techreborn:crafting_table/machine/iron_furnace',
		'techreborn:crafting_table/machine/iron_alloy_furnace',
		'techreborn:smelting/platinum_ingot_from_c_sheldonite_ores',
		'techreborn:blasting/platinum_ingot_from_c_sheldonite_ores',
		'techreborn:smelting/platinum_ingot_from_c_sheldonite_ores_exported_mi_furnace',
		'indrev:infusing/steel_dust',
		'indrev:infusing/electrum_dust',
		'modern_industrialization:alloy/mixer/electrum/dust',
		'modern_industrialization:alloy/mixer/electrum/tiny_dust',
		'createplus:techreborn/mixing/electrum_ingot',
		'modern_industrialization:alloy/mixer/invar/dust',
		'modern_industrialization:alloy/mixer/invar/tiny_dust',
		'createplus:techreborn/mixing/invar_ingot',
		'createplus:modern_industrialization/macerator/asurine',
		'indrev:shaped/circuit_mk1',
		'indrev:shaped/circuit_mk2',
		'indrev:shaped/circuit_mk3',
		'indrev:shaped/circuit_mk4'
	].forEach((id) => { event.remove({ id: id }); });
	event.replaceInput({id: "modern_industrialization:electric_age/machine/assembler_asbl"}, 'modern_industrialization:analog_circuit', '#c:circuits/complex');
	event.replaceInput({id: "techreborn:crafting_table/machine/alloy_smelter"}, 'techreborn:iron_alloy_furnace', 'techreborn:iron_furnace');
	event.replaceInput({id: "techreborn:crafting_table/machine/alloy_smelter"}, 'techreborn:electronic_circuit', 'techreborn:advanced_circuit');
	event.replaceInput('createaddition:capacitor', 'modern_industrialization:capacitor');
	event.replaceInput('createaddition:copper_spool', 'modern_industrialization:inductor');
	event.replaceInput({mod: 'create'}, 'minecraft:dried_kelp', 'modern_industrialization:rubber_sheet');
	event.replaceInput({mod: 'create'}, 'minecraft:iron_ingot', 'modern_industrialization:steel_ingot');
	event.replaceInput({mod: 'create'}, 'minecraft:iron_nugget', 'modern_industrialization:steel_nugget');
	event.replaceInput({mod: 'create'}, '#c:plates/iron', 'modern_industrialization:steel_plate');
	event.replaceInput({mod: 'createaddition'}, 'minecraft:iron_ingot', 'modern_industrialization:steel_ingot');
	event.replaceInput({mod: 'create'}, 'minecraft:iron_nugget', 'modern_industrialization:steel_nugget');
	event.replaceInput({mod: 'createaddition'}, '#c:plates/iron', 'modern_industrialization:steel_plate');
	event.remove({input: 'techreborn:iridium_alloy_ingot'});
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
	event.remove({output: 'techreborn:data_storage_chip'});
	event.remove({output: 'modern_industrialization:electronic_circuit'});
	event.remove({output: 'modern_industrialization:digital_circuit'});
	event.remove({output: 'techreborn:energy_flow_chip'});
	event.remove({output: 'modern_industrialization:processing_unit'});
	event.remove({output: 'modern_industrialization:quantum_circuit'});

	TwoAssemblerRecipe(event, 'modern_industrialization:analog_circuit', '2x modern_industrialization:copper_plate', 'modern_industrialization:op_amp', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:advanced_circuit', 'modern_industrialization:silicon_plate', '4x indrev:nikolite_ingot', 20, 200);
	TwoAssemblerRecipe(event, 'modern_industrialization:electronic_circuit', '3x #c:circuits/advanced', 'modern_industrialization:op_amp', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:industrial_circuit', 'modern_industrialization:emerald_plate', '#c:circuits/electronic', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:data_storage_core', '#c:peridot_plates', '2x indrev:enriched_nikolite_ingot', 20, 200);
	TwoAssemblerRecipe(event, 'modern_industrialization:op_amp', '4x modern_industrialization:resistor', '2x modern_industrialization:transistor', 20, 200);
	FourAssemblerRecipe(event, 'modern_industrialization:digital_circuit', '2x modern_industrialization:not_gate', 'modern_industrialization:and_gate', 'modern_industrialization:or_gate', 'modern_industrialization:digital_circuit_board', 20, 200);
	FiveAssemblerRecipe(event, 'modern_industrialization:processing_unit', '4x #c:circuits/elite', '2x modern_industrialization:random_access_memory', 'modern_industrialization:memory_management_unit', 'modern_industrialization:arithmetic_logic_unit', 'modern_industrialization:processing_unit_board', 20, 200);
	FourAssemblerRecipe(event, 'modern_industrialization:quantum_circuit', '4x #c:circuits/ultimate', '2x modern_industrialization:cooling_cell', '2x modern_industrialization:qbit', 'modern_industrialization:quantum_circuit_board', 20, 200);
	ThreeAssemblerRecipe(event, 'techreborn:data_storage_chip', '#c:circuits/master', 'modern_industrialization:titanium_plate', '2x techreborn:data_storage_core', 20, 200);
	createAssembly(event, 'modern_industrialization:analog_circuit', 'modern_industrialization:analog_circuit_board', 'modern_industrialization:inductor', 'modern_industrialization:capacitor', 'modern_industrialization:resistor', 2);
	createAssembly(event, 'techreborn:advanced_circuit', 'techreborn:electronic_circuit', 'modern_industrialization:analog_circuit', 'indrev:nikolite_ingot', 'minecraft:redstone', 2);
	createAssembly(event, 'modern_industrialization:electronic_circuit', 'modern_industrialization:electronic_circuit_board', 'techreborn:advanced_circuit', 'modern_industrialization:transistor', 'modern_industrialization:diode', 4);
	createAssembly(event, 'techreborn:industrial_circuit', 'modern_industrialization:electronic_circuit', 'techreborn:synthetic_redstone_crystal', 'modern_industrialization:carbon_plate', 'techreborn:emerald_small_dust', 2);
	createAssembly(event, 'techreborn:data_storage_chip', 'modern_industrialization:digital_circuit', 'techreborn:data_storage_core', 'techreborn:data_storage_core', 'modern_industrialization:titanium_plate', 2);
	createAssembly(event, 'techreborn:energy_flow_chip', 'modern_industrialization:processing_unit', 'techreborn:lapotron_crystal', 'modern_industrialization:tungsten_ingot', 'modern_industrialization:iridium_plate', 2);

	event.remove({output: 'modern_industrialization:steel_wiremill'});
});

function TwoAssemblerRecipe(event, output, input1, input2, power, time){
	event.custom({
		type: "techreborn:assembling_machine",
		power: power,
		time: time,
		ingredients: [
			Ingredient.of(input1).toJson(),
			Ingredient.of(input2).toJson()
		],
		results: [Item.of(output).toResultJson()]
	})

	event.custom({
		type: "modern_industrialization:assembler",
		eu: power,
		duration: time,
		item_inputs: [
			Ingredient.of(input1).toJson(),
			Ingredient.of(input2).toJson()
		],
		item_outputs: [Item.of(output).toResultJson()]
	})
}

function ThreeAssemblerRecipe(event, output, input1, input2, input3, power, time){
	event.custom({
		type: "modern_industrialization:assembler",
		eu: power,
		duration: time,
		item_inputs: [
		Ingredient.of(input1).toJson(),
		Ingredient.of(input2).toJson(),
		Ingredient.of(input3).toJson()
		],
		item_outputs: [Item.of(output).toResultJson()]
	})
}

function FourAssemblerRecipe(event, output, input1, input2, input3, input4, power, time){
	event.custom({
		type: "modern_industrialization:assembler",
		eu: power,
		duration: time,
		item_inputs: [
		Ingredient.of(input1).toJson(),
		Ingredient.of(input2).toJson(),
		Ingredient.of(input3).toJson(),
		Ingredient.of(input4).toJson()
		],
		item_outputs: [Item.of(output).toResultJson()]
	})
}

function FiveAssemblerRecipe(event, output, input1, input2, input3, input4, input5, power, time){
	event.custom({
		type: "modern_industrialization:assembler",
		eu: power,
		duration: time,
		item_inputs: [
		Ingredient.of(input1).toJson(),
		Ingredient.of(input2).toJson(),
		Ingredient.of(input3).toJson(),
		Ingredient.of(input4).toJson(),
		Ingredient.of(input5).toJson()
		],
		item_outputs: [Item.of(output).toResultJson()]
	})
}

function createAssembly(event, output, item1, item2, item3, item4, loops){
	event.recipes.createSequencedAssembly([
		Item.of(output).withChance(80),
		Item.of(item2).withChance(5),
		Item.of(item3).withChance(10),
		Item.of(item4).withChance(5)
	],
	item1,
	[
		event.recipes.createDeploying(item1, [item1, item2]),
		event.recipes.createDeploying(item1, [item1, item3]),
		event.recipes.createDeploying(item1, [item1, item4])
	])
	.transitionalItem(item1)
	.loops(loops)
}