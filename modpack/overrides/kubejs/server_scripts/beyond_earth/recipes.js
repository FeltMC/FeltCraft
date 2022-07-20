onEvent('recipes', event => {
    //removing plates from hammering
	['iron_plate', 'desh_plate'].forEach((id) => { event.remove({ id: 'beyond_earth:hammering/'+id }); });

    //remove OP recipes
    ['iron_stick', 'steel_ingot_from_blasting_iron_ingot', 'steel_ingot_from_smelting_iron_ingot', 'hammer'].forEach((id) => { event.remove({ id: 'beyond_earth:recipes/'+id }); });

    //make wheels use rubber
	event.replaceInput({id: 'beyond_earth:recipes/wheel'}, 'minecraft:black_dye', 'modern_industrialization:rubber_sheet');

    //desh plate recipe
    event.recipes.createCompacting(['beyond_earth:desh_plate'], 'beyond_earth:desh_ingot').heated();
});