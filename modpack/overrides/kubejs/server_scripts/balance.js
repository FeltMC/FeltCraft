onEvent('recipes', event => {
	event.replaceInput({id: "techreborn:crafting_table/parts/advanced_circuit"}, 'minecraft:lapis_lazuli', 'modern_industrialization:analog_circuit');
	event.replaceInput({id: "techreborn:crafting_table/parts/advanced_circuit"}, 'minecraft:glowstone_dust', 'indrev:nikolite_ingot');
	event.replaceInput({id: "modern_industrialization:electric_age/circuit/craft/electronic_circuit_asbl"}, 'modern_industrialization:analog_circuit', 'techreborn:advanced_circuit');
	event.replaceInput({id: "indrev:shaped/machine_block"}, '', '#c:circuit_t1');
});
