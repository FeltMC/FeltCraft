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

	event.replaceInput({}, 'indrev:circuit_mk1', '#c:circuit_basic');
	event.replaceInput({}, 'techreborn:electronic_circuit', '#c:circuit_basic');
	event.replaceInput({}, 'indrev:circuit_mk2', '#c:circuit_advanced');
	event.replaceInput({}, 'techreborn:advanced_circuit', '#c:circuit_advanced');
	event.replaceInput({}, 'indrev:circuit_mk3', '#c:circuit_elite');
	event.replaceInput({}, 'techreborn:data_storage_chip', '#c:circuit_elite');
	event.replaceInput({}, 'indrev:circuit_mk4', '#c:circuit_master');
	event.replaceInput({}, 'techreborn:energy_flow_chip', '#c:circuit_master');
});

onEvent('tags.items', event => {	
	event.add('c:circuit_basic', 'techreborn:electronic_circuit');
	event.add('c:circuit_advanced', 'techreborn:advanced_circuit');
	event.add('c:circuit_elite', 'indrev:circuit_mk3');
	event.add('c:circuit_elite', 'techreborn:data_storage_chip');
	event.add('c:circuit_master', 'indrev:circuit_mk4');
	event.add('c:circuit_master', 'techreborn:energy_flow_chip');
});