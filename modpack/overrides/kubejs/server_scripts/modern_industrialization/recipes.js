onEvent('recipes', event => {
	//remove alloys from mixing
	['electrum/dust', 'electrum/tiny_dust', 'invar/dust', 'tiny_dust'].forEach((id) => { event.remove({ id: 'modern_industrialization:alloy/mixer/'+id }); });
	
    //tech reborn fix
	event.replaceInput({mod: 'modern_industrialization'}, '#c:iridium_plates', '#c:plates/iridium_alloy')

    //Replace analog circuits with complex
	event.replaceInput({id: "modern_industrialization:electric_age/machine/assembler_asbl"}, 'modern_industrialization:analog_circuit', '#c:circuits/complex');

    //remove MI vanilla circuit recipes
	event.remove({output: 'modern_industrialization:electronic_circuit'});
	event.remove({output: 'modern_industrialization:digital_circuit'});
	event.remove({output: 'modern_industrialization:processing_unit'});
	event.remove({output: 'modern_industrialization:quantum_circuit'});

    //remove steel wiremill to force create
    event.remove({output: 'modern_industrialization:steel_wiremill'});
});