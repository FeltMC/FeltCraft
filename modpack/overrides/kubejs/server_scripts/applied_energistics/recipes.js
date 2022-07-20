onEvent('recipes', event => {
	event.replaceInput({output: 'ae2:controller'}, 'ae2:smooth_sky_stone_block','modern_industrialization:tungsten_ingot');
    event.replaceInput({output: 'ae2:energy_acceptor'}, 'minecraft:iron_ingot','modern_industrialization:tungsten_ingot');

    ['cell_housing', 'storage_cell_1k', 'storage_cell_4k', 'storage_cell_16k', 'storage_cell_64k', 'storage_cell_256k'].forEach((p) => {
		event.replaceInput({output: 'ae2:item_'+p}, 'minecraft:iron_ingot','modern_industrialization:iridium_plate');
	});

    ['cell_housing', 'storage_cell_1k', 'storage_cell_4k', 'storage_cell_16k', 'storage_cell_64k', 'storage_cell_256k'].forEach((p) => {
		event.replaceInput({output: 'ae2:fluid_'+p}, 'minecraft:copper_ingot','modern_industrialization:bronze_plate');
	});
});