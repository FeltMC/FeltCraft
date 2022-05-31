onEvent('recipes', event => {
	event.replaceInput({id: "techreborn:crafting_table/parts/advanced_circuit"}, 'minecraft:lapis_lazuli', 'modern_industrialization:analog_circuit');
	event.replaceInput({id: "techreborn:crafting_table/parts/advanced_circuit"}, 'minecraft:glowstone_dust', 'indrev:nikolite_ingot');
	event.replaceInput({id: "modern_industrialization:electric_age/circuit/craft/electronic_circuit_asbl"}, 'modern_industrialization:analog_circuit', 'techreborn:advanced_circuit');
	event.replaceInput({id: "modern_industrialization:electric_age/machine/assembler_asbl"}, 'modern_industrialization:analog_circuit', '#c:circuits/complex');
	//event.replaceInput({id: "indrev:shaped/machine_block"}, '', '#c:circuit_t1');
	
	event.remove({input: 'techreborn:iridium_alloy_ingot'});
	event.remove({id: 'indrev:shaped/circuit_mk1'})
	event.remove({id: 'indrev:shaped/circuit_mk2'})
	event.remove({output: 'techreborn:industrial_circuit'});
	event.shaped('techreborn:industrial_circuit', [ 'RPR', 'ECE', 'RPR' ], {
		R: 'techreborn:synthetic_redstone_crystal',
		C: '#c:circuits/electronic',
		E: '#c:small_dusts/emerald',
		P: '#c:plates/carbon'
	})
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
	event.shaped('techreborn:data_storage_chip', [ 'IDI', 'DCD', 'IDI' ], {
		C: '#c:circuits/digital',
		D: '#c:circuits/data',
		I: '#c:plates/titanium'
	})
	event.remove({output: 'modern_industrialization:digital_circuit'});
	event.shaped('modern_industrialization:digital_circuit', [ 'COC', 'NBN', 'CAC' ], {
		C: '#c:circuits/complex',
		O: 'modern_industrialization:or_gate',
		N: 'modern_industrialization:not_gate',
		B: 'modern_industrialization:digital_circuit_board',
		A: 'modern_industrialization:and_gate'
	})
	event.remove({output: 'techreborn:energy_flow_chip'});
	event.shaped('techreborn:energy_flow_chip', [ 'CTC', 'LPL', 'CTC' ], {
		C: '#c:circuits/processing',
		T: '#c:ingots/tungsten',
		L: 'techreborn:lapotron_crystal',
		P: '#c:plates/iridium_alloy'
	})
	event.remove({output: 'modern_industrialization:processing_unit'});
	event.shaped('modern_industrialization:processing_unit', [ 'CMC', 'RBR', 'CAC' ], {
		C: '#c:circuits/elite',
		M: 'modern_industrialization:memory_management_unit',
		R: 'modern_industrialization:random_access_memory',
		B: 'modern_industrialization:processing_unit_board',
		A: 'modern_industrialization:arithmetic_logic_unit'
	})
	event.remove({output: 'modern_industrialization:quantum_circuit'});
	event.shaped('modern_industrialization:quantum_circuit', [ 'ECE', 'QBQ', 'ECE' ], {
		E: '#c:circuits/master',
		C: 'modern_industrialization:cooling_cell',
		Q: 'modern_industrialization:qbit',
		B: 'modern_industrialization:quantum_circuit_board'
	})
	
	TwoAssemblerRecipe(event, 'modern_industrialization:analog_circuit', '2x modern_industrialization:copper_plate', 'modern_industrialization:op_amp', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:advanced_circuit', 'modern_industrialization:silicon_plate', '4x indrev:nikolite_ingot', 20, 200);
	TwoAssemblerRecipe(event, 'modern_industrialization:electronic_circuit', '3x #c:circuits/advanced', 'modern_industrialization:op_amp', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:industrial_circuit', 'modern_industrialization:emerald_plate', '#c:circuits/electronic', 20, 200);
	TwoAssemblerRecipe(event, 'techreborn:data_storage_core', '#c:peridot_plates', '2x indrev:enriched_nikolite_ingot', 20, 200);
	TwoAssemblerRecipe(event, 'modern_industrialization:op_amp', '4x modern_industrialization:resistor', '2x modern_industrialization:transistor', 20, 200);
	FourAssemblerRecipe(event, 'modern_industrialization:digital_circuit', '2x modern_industrialization:not_gate', 'modern_industrialization:and_gate', 'modern_industrialization:or_gate', 'modern_industrialization:digital_circuit_board', 20, 200);
	ThreeAssemblerRecipe(event, 'techreborn:data_storage_chip', '#c:circuits/digital', 'modern_industrialization:titanium_plate', '2x techreborn:data_storage_core', 20, 200);
	//assembler recipes
	
	
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
