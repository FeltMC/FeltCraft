onEvent('recipes', event => {
	//Alloy Fix
	['electrum_ingot', 'invar_ingot'].forEach((id) => { event.remove({ id: 'createplus:techreborn/mixing/'+id }); });

	event.remove({ id: 'createplus:modern_industrialization/macerator/asurine' });
	//replace Create/C:CA items with MI variants
	event.replaceInput('createaddition:capacitor', 'modern_industrialization:capacitor');
	event.replaceInput('createaddition:copper_spool', 'modern_industrialization:inductor');
	event.replaceInput({mod: 'create'}, 'minecraft:dried_kelp', 'modern_industrialization:rubber_sheet');
	event.replaceInput({mod: 'create'}, 'minecraft:iron_nugget', 'modern_industrialization:steel_nugget');
});