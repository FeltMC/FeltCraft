onEvent('recipes', event => {
    //remove simple armors
	['minecraft:leather', 'minecraft:chainmail', 'minecraft:iron', 'minecraft:diamond', 'minecraft:golden', 'minecraft:netherite'].forEach((p) => {
		event.remove({output: p+'_helmet'});
		event.remove({output: p+'_chestplate'});
		event.remove({output: p+'_leggings'});
		event.remove({output: p+'_boots'});
	});

	//remove simple tools
	['minecraft:iron', 'minecraft:diamond', 'minecraft:golden', 'minecraft:netherite'].forEach((p) => {
		event.remove({output: p+'_sword'});
		event.remove({output: p+'_shovel'});
		event.remove({output: p+'_pickaxe'});
		event.remove({output: p+'_axe'});
		event.remove({output: p+'_hoe'});
	});

    event.replaceInput({output: 'minecraft:enchanting_table'}, 'minecraft:diamond', 'botania:mana_diamond');
    event.remove({output: 'minecraft:ender_eye'});
    event.shapeless('minecraft:ender_eye', [
		'the_aether:swet_ball',
		'#c:ender_pearls',
		'minecraft:blaze_powder',
		'#twilightforest:fiery_vial'
	]);
    event.replaceInput({output: 'minecraft:bucket'}, 'minecraft:iron_ingot','modern_industrialization:iron_plate');
    event.replaceInput({output: 'minecraft:hopper'}, 'minecraft:iron_ingot','modern_industrialization:iron_plate');
    event.replaceInput({output: 'minecraft:cauldron'}, 'minecraft:iron_ingot','modern_industrialization:iron_plate');
	event.replaceInput({output: 'minecraft:blast_furnace'}, 'minecraft:iron_ingot','modern_industrialization:iron_plate');
    event.replaceInput({output: 'minecraft:stonecutter'}, 'minecraft:iron_ingot','modern_industrialization:iron_plate');
    event.replaceInput({output: 'minecraft:grindstone'}, 'minecraft:stone_slab','modern_industrialization:iron_plate');
    event.remove({output: 'minecraft:smithing_table'});
    event.shapeless('minecraft:smithing_table', [ '#c:workbenches','modern_industrialization:iron_plate' ]);
    event.remove({output: 'minecraft:fletching_table'});
    event.shapeless('minecraft:fletching_table', [ '#c:workbenches', 'minecraft:flint' ]);
    event.remove({output: 'minecraft:cartography_table'});
    event.shapeless('minecraft:cartography_table', [ '#c:workbenches', '#c:paper' ]);
    event.remove({output: 'minecraft:brewing_stand'});
    event.shapeless('minecraft:brewing_stand', [ '#c:rods/blaze','modern_industrialization:iron_plate']);
	event.replaceInput({output: 'minecraft:flint_and_steel'}, 'minecraft:iron_ingot','#c:nuggets/steel');
});