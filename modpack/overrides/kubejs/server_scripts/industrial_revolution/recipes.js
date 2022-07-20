onEvent('recipes', event => {
	//remove indrev hammer recipes
	['tin', 'gold', 'iron', 'copper',].forEach((p) => {
		event.remove({ id: 'indrev:shapeless/' + p + '_plate_from_hammer' });
	});

    //remove indrev tools/armors
	['indrev:tin', 'indrev:steel', 'indrev:silver', 'indrev:lead', 'indrev:copper', 'indrev:bronze'].forEach((p) => {
		event.remove({output: p+'_helmet'});
		event.remove({output: p+'_chestplate'});
		event.remove({output: p+'_leggings'});
		event.remove({output: p+'_boots'});
        event.remove({output: p+'_sword'});
		event.remove({output: p+'_shovel'});
		event.remove({output: p+'_pickaxe'});
		event.remove({output: p+'_axe'});
		event.remove({output: p+'_hoe'});
	});

    //remove indrev infusing recipes
    ['steel_dust', 'electrum_dust'].forEach((id) => { event.remove({ id: 'indrev:infusing/'+id }); });

    //remove indrev crafting recipes
    ['circuit_mk1', 'circuit_mk2', 'circuit_mk3', 'circuit_mk4', ].forEach((id) => { event.remove({ id: 'indrev:shaped/'+id }); });

	event.replaceInput('indrev:circuit_mk1', '#c:circuits/basic');
	event.replaceInput('indrev:circuit_mk2', '#c:circuits/advanced');
	event.replaceInput('indrev:circuit_mk3', '#c:circuits/elite');
	event.replaceInput('indrev:circuit_mk4', '#c:circuits/ultimate');

	event.remove({output: 'indrev:machine_block'});
	event.recipes.createMechanicalCrafting('indrev:machine_block', [ 'PGCON' ], {
		P: 'modern_industrialization:steel_large_plate',
		G: '#c:gears/copper',
		C: '#c:circuits/primative',
		O: '#c:dusts/obsidian',
		N: 'indrev:nikolite_dust'
	})
});