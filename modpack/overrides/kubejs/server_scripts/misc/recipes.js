onEvent('recipes', event => {
    event.remove({output: 'greater_eye:greater_eye'});
    event.shapeless('greater_eye:greater_eye', [ '#c:ender_pearls', 'minecraft:blaze_powder' ]);
	event.replaceInput({mod: 'kibe'}, 'minecraft:ender_eye', 'botania:mana_pearl');
    event.replaceInput('minecraft:ender_eye', 'greater_eye:greater_eye');
	event.replaceInput({output: 'dark-enchanting:dark_enchanter'}, 'minecraft:emerald', 'botania:dragonstone');
	event.replaceInput({output: 'kibe:chunk_loader'}, 'minecraft:gold_block', 'modern_industrialization:electrum_block');

    //remove simple armors
	['byg:ametrine'].forEach((p) => {
		event.remove({output: p+'_helmet'});
		event.remove({output: p+'_chestplate'});
		event.remove({output: p+'_leggings'});
		event.remove({output: p+'_boots'});
	});

	//remove simple tools
	['byg:pendorite'].forEach((p) => {
		event.remove({output: p+'_sword'});
		event.remove({output: p+'_shovel'});
		event.remove({output: p+'_pickaxe'});
		event.remove({output: p+'_axe'});
		event.remove({output: p+'_hoe'});
	});

	event.remove({output: 'travelersbackpack:standard'});
	event.shaped('travelersbackpack:standard', [ 'LEL', 'TCT', 'LBL' ], {
		L: '#c:leather',
		E: '#c:ingots/electrum',
		T: '#c:tank',
		C: '#c:chests/wooden',
		B: 'kibe:red_sleeping_bag'
	})

	event.replaceInput({output: 'coxinhautilities:portable_tank_mk1'}, 'minecraft:iron_ingot', '#c:ingots/silver');
	event.replaceInput({output: 'coxinhautilities:portable_tank_mk2'}, 'minecraft:gold_ingot', '#c:ingots/electrum');
	event.replaceInput({output: 'coxinhautilities:portable_tank_mk3'}, 'minecraft:diamond', '#c:ingots/aluminum');
	event.replaceInput({output: 'coxinhautilities:portable_tank_mk4'}, 'minecraft:emerald', '#c:ingots/beryllium');
	event.replaceInput({output: 'coxinhautilities:portable_tank_mk5'}, 'minecraft:netherite_ingot', '#c:ingots/tungsten');
	event.replaceInput({output: 'kibe:fluid_hopper'}, 'minecraft:iron_ingot', '#c:plates/iron');
	[
		'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray',
		'light_gray', 'cyan', 'blue', 'purple', 'green', 'brown', 'red', 'black'
	].forEach((id) => { event.replaceInput({output: 'kibe:'+id+'_glider'}, 'minecraft:iron_ingot', '#c:rods/steel'); });
	[
		'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray',
		'light_gray', 'cyan', 'blue', 'purple', 'green', 'brown', 'red', 'black'
	].forEach((id) => { event.replaceInput({output: 'kibe:'+id+'_elevator'}, 'minecraft:ender_pearl', 'botania:mana_pearl'); })
	event.replaceInput({output: 'kibe:magnet'}, 'minecraft:red_dye', 'modern_industrialization:cupronickel_wire_magnetic');

	event.remove({output: 'kibe:big_torch'});
	event.recipes.botania.runic_altar('kibe:big_torch', 
	[
		'spectrum:bedrock_dust', 'spectrum:bedrock_dust', Item.of('minecraft:potion', '{Potion:"minecraft:strong_regeneration"}'),
		Item.of('minecraft:potion', '{Potion:"minecraft:strong_healing"}'), 'botania:mana_diamond', '#c:ingots/electrum'
	], 10000);

	event.remove({output: 'kibe:angel_ring'});
	event.recipes.botania.runic_altar('kibe:angel_ring', 
	[
		'modern_industrialization:gravichestplate', 'iron-jetpacks:tungstensteel_jetpack', 'iron-jetpacks:tungstensteel_jetpack', 'iron-jetpacks:tungstensteel_thruster',
		'iron-jetpacks:tungstensteel_thruster', 'iron-jetpacks:tungstensteel_thruster', 'iron-jetpacks:tungstensteel_thruster', 'modern_industrialization:iridium_plate',
		'modern_industrialization:iridium_plate', 'modern_industrialization:iridium_plate', 'modern_industrialization:iridium_plate'
	], 100000);

	event.shaped('sync:sync_core', [ 'OLO', 'QMQ', 'ERE' ], {
		O: '#c:dusts/obsidian',
		L: '#c:dusts/lapis',
		Q: '#c:dusts/quartz',
		M: 'botania:mana_pearl',
		E: '#c:dusts/emerald',
		R: '#c:dusts/redstone'
	})
});