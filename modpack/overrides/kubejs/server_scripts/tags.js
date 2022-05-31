const TOOLS = [
	"sword",
	"pickaxe",
	"axe",
	"shovel",
	"hoe",
	"helmet",
	"chestplate",
	"leggings",
	"boots",
];

onEvent('recipes', event => {
	TOOLS.forEach(tool => {
		event.remove({output: 'indrev:bronze_'+tool});
	});
	
	event.replaceInput({mod: 'modern_industrialization'}, '#c:iridium_plates', '#c:plates/iridium_alloy')
});

onEvent('tags.items', event => {	
	event.add('c:grinding_head', 'techreborn:tungsten_grinding_head');
	event.add('c:grinding_head', 'techreborn:diamond_grinding_head');
	event.add('c:machine_hulls/cheap', 'techreborn:basic_machine_frame');
	event.add('c:machine_hulls/advanced', 'techreborn:advanced_machine_frame');
	event.add('c:machine_hulls/very_advanced', 'techreborn:industrial_machine_frame');
	
	event.add('c:circuits/basic', 'indrev:circuit_mk1');
	event.add('c:circuits/basic', 'techreborn:electronic_circuit');
	event.add('c:circuits/good', 'modern_industrialization:analog_circuit');
	event.add('c:circuits/advanced', 'indrev:circuit_mk2');
	event.add('c:circuits/advanced', 'techreborn:advanced_circuit');
	event.add('c:circuits/complex', 'techreborn:industrial_circuit');
	event.add('c:circuits/electronic', 'modern_industrialization:electronic_circuit');
	event.add('c:circuits/data', 'techreborn:data_storage_core');
	event.add('c:circuits/elite', 'indrev:circuit_mk3');
	event.add('c:circuits/elite', 'techreborn:data_storage_chip');
	event.add('c:circuits/digital', 'modern_industrialization:digital_circuit');
	event.add('c:circuits/master', 'indrev:circuit_mk4');
	event.add('c:circuits/master', 'techreborn:energy_flow_chip');
	event.add('c:circuits/processing', 'modern_industrialization:processing_unit');
	event.add('c:circuits/quantum', 'modern_industrialization:quantum_circuit');
	
	event.removeAllTagsFrom('modern_industrialization:iridium_plate');
 	event.add('c:plates/iridium_alloy', 'modern_industrialization:iridium_plate');
	
	["aluminum", "bronze", "copper", "gold", "invar", "iron", "stainless_steel", "steel", "tin", "titanium", "tungsten"].forEach(m => {
		event.add('c:rods/'+m, 'modern_industrialization:'+m+'_rod')
	});
	["aluminum", "bronze", "copper", "gold", "invar", "iron", "stainless_steel", "steel", "tin", "titanium"].forEach(m => {
		event.add('c:bolts/'+m, 'modern_industrialization:'+m+'_bolt')
	});
	["bronze"].forEach(m => {
		event.add('c:rotors/'+m, 'modern_industrialization:'+m+'_rotor')
		event.add('c:turbine_blades/'+m, 'modern_industrialization:'+m+'_blade')
	});
	["copper"].forEach(m => {event.add('c:wires/'+m, 'modern_industrialization:'+m+'_wire')});
	["steel"].forEach(m => {event.add('c:rings/'+m, 'modern_industrialization:'+m+'_ring')});
	event.add('c:rods/magnetic_steel', 'modern_industrialization:steel_rod_magnetic')
	event.add('c:dusts/coal_coke', 'modern_industrialization:coke_dust')
	event.add('c:gems/coal_coke', 'modern_industrialization:coke')
	event.add('c:blocks/coal_coke', 'modern_industrialization:coke_block')
});
