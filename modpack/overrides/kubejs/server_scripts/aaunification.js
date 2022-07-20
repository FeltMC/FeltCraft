// priority: 0

// settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logErroringRecipes = true

////////////////////////
/// Made by Team AOF ///
////////////////////////

//////////////////////////////////////////////////
// AOF Unification Script - MIT licensed.       //
//////////////////////////////////////////////////

const PARTS = [ // List of part tags to unify.
	"c:blocks/",
	"c:dusts/",
	"c:ingots/",
	"c:nuggets/",
	"c:plates/",
	"c:rods/",
	"c:bolts/",
	"c:wires/",
	"c:gears/",
	"c:tiny_dusts/",
	"c:small_dusts/",
	"c:raw_materials/",
	"c:storage_blocks/raw_"
];

const MATERIALS = [ // List of materials to unify.
	"aluminum",
	"aluminium",
	"antimony",
	"battery_alloy",
	"bauxite",
	"beryllium",
	"brass",
	"brick",
	"bronze",
	"cadmium",
	"calorite",
	"carbon",
	"cast_iron",
	"chrome",
	"chromium",
	"coal",
	"coal_coke",
	"copper",
	"cupronickel",
	"desh",
	"diamond",
	"electrum",
	"emerald",
	"fire_clay",
	"gold",
	"invar",
	"iridium",
	"iridium_alloy",
	"iron",
	"kanthal",
	"lapis",
	"lead",
	"manganese",
	"netherite",
	"nickel",
	"obsidian",
	"ostrum",
	"platinum",
	"quartz",
	"redstone",
	"ruby",
	"salt",
	"silicon",
	"silver",
	"sodium",
	"soldering_alloy",
	"stainless_steel",
	"steel",
	"sulfur",
	"tin",
	"titanium",
	"tungsten",
	"tungstensteel",
	"uranium_235",
	"uranium_238",
	"uranium",
	"zinc"
];

const UNIFICATION_ORDER = [ // Order of mods to unify
	"minecraft",
	"mineralization",
	"modern_industrialization",
	"create",
	"thermal",
	"createplus",
	"createdeco",
	"createaddition",
	"alloyed",
	"immersiveengineering",
	"tconstruct",
	"ic2",
	"techreborn",
	"ftbic",
	"beyond_earth",
	"indrev",
	"antimatter"
];

const UNIFICATION_BLACKLIST = [ "c:blocks/quartz" ]; // List of tags NOT to unify
const itemIdToUnified = {}; // Map of removed item -> unified variant.
const unifiedTagList = []; // List of all unification tags.

function findTagUnification(event, tagName) {
	if (UNIFICATION_BLACKLIST.includes(tagName)) return;
	const tagItems = event.get(tagName).getObjectIds();
	let unifyTargetId = undefined;
	UNIFICATION_ORDER.forEach(unificationNamespace => {
		tagItems.forEach(id => { // Do tag unification
			id = "" + id; // convert ResLoc to native JS string
			if (id.includes("deepslate")) return; // Skip deepslate!

			const namespace = id.split(":")[0];
			if (!UNIFICATION_ORDER.includes(namespace)) { // If a namespace is not in the order list, crash
				console.log(`Missing unification order namespace: ${namespace}, item: ${id}`);
				UNIFICATION_ORDER.push(namespace);
			}

			if ((namespace === unificationNamespace) && (unifyTargetId === undefined)) unifyTargetId = id; // Otherwise pick the best in the list
		});
	});

	if (unifyTargetId === undefined) return undefined;
	return "" + unifyTargetId; // Convert to string
}

onEvent('tags.items', event => { // Unify common tags
	MATERIALS.forEach(material => { // Regular parts
		PARTS.forEach(partTagTemplate => {
			const tagName = partTagTemplate+material;

			//Fabric Tags
			if (partTagTemplate === "c:raw_materials/") event.get('c:raw_'+material+'_ores').getObjectIds().forEach(item => { event.add(tagName, item) });
			else if (partTagTemplate === "c:storage_blocks/raw_") event.get('c:raw_'+material+'_blocks').getObjectIds().forEach(item => { event.add(tagName, item) });
			else event.get('c:'+material+'_'+partTagTemplate.replace("c:", "").replace("/", "")).getObjectIds().forEach(item => { event.add(tagName, item) });
			//Forge Tags
			event.get(tagName.replace("c:", "forge:")).getObjectIds().forEach(item => { event.add(tagName, item);});

			let unifyTargetId = findTagUnification(event, tagName); // Pick unification target
			if (unifyTargetId === undefined) return;
			unifiedTagList.push(tagName);

			event.get(tagName).getObjectIds().forEach(id => { // Collect other items for item unification.
				id = "" + id; // convert ResLoc to native JS string
				if (id in itemIdToUnified) throw new Error("Item id " + tagStack.id + " already has a unification mapping! " + itemIdToUnified[id]);
				else if (id !== unifyTargetId) {
					itemIdToUnified[id] = unifyTargetId;
					event.remove(tagName, id); // Remove from tag.
					event.remove('c:'+material+'_'+partTagTemplate.replace("c:", "").replace("/", ""), id); // Remove from tag.
				}
			});
		});
	});
})

onEvent('recipes', event => {
	for (let id in itemIdToUnified) { // Replace inputs and outputs with unified items.
		let unified = itemIdToUnified[id];
		event.replaceInput({}, id, unified);
		event.replaceOutput({}, id, unified);
		event.recipes.minecraft.crafting_shapeless(unified, id).id("kjsextras_output_hidden:" + id.replace(":", "_"));
	}

	unifiedTagList.forEach(tag => { event.replaceInput({}, tag, tag); }); // Force inputs to use the tag.

	function autoremove(itemPattern, recipePattern) { // Remove duplicate recipes
		MATERIALS.forEach(material => {
			let ok = true;
			if (recipePattern === undefined) {
				recipePattern = itemPattern;
			} else {
				ok = itemPattern.replace("{}", material) in itemIdToUnified;
			}
			if (ok) {
				event.remove({ id: recipePattern.replace("{}", material).replace("{}", material) });
			}
		});
	}

	function removeTr(item, recipe){ autoremove("techreborn:{}_"+item, "techreborn:"+recipe); }
	function removeIr(item, recipe){ autoremove("indrev:{}_"+item, "indrev:"+recipe); }

	['{}_storage_block', 'raw_{}_storage_block'].forEach((id) => { removeTr("storage_block",'crafting_table/storage_block/'+id) });
	['ingot_from_block', 'ingot_from_storage_block'].forEach((id) => { removeTr("block",'crafting_table/ingot/{}_'+id) });
	['ingot_from_block', 'ingot_from_nugget', 'nugget_from_nugget'].forEach((id) => { removeTr("ingot",'crafting_table/ingot/{}_'+id) });
	autoremove("techreborn:{}_nugget", "techreborn:crafting_table/nugget/{}_nugget");
	autoremove("techreborn:raw_{}", "techreborn:industrial_grinder/{}_ingot_with_mercury"); // ingot -> raw ore recipes with mercury... -_-
	['smelting', 'blasting'].forEach((id) => { removeTr("ingot",id+'/{}_ingot_from_c_{}_ores') });
	['ingot_from_c_raw_{}_ores', 'ingot_from_raw_exported_mi_furnace', 'ingot_from_c_{}_dusts', 'ingot_from_{}_dust', 'block_from_raw'].forEach((id) => { removeTr("ingot",'smelting/{}_'+id) });
	['ingot_from_c_raw_{}_ores', 'ingot_from_c_{}_dusts', 'ingot_from_{}_dust'].forEach((id) => { removeTr("ingot",'blasting/{}_'+id) });
	['sheldonite_ore_with_water', 'sheldonite_ore_with_mercury', 'iridium_ore_with_sodiumpersulfate', 'heart_of_the_sea_with_mercury']
	.forEach((id) => { event.replaceOutput({id: "techreborn:industrial_grinder/"+id}, '#c:dusts/platinum', 'modern_industrialization:raw_platinum'); });
	['smelting', 'blasting'].forEach((id) => { autoremove("modern_industrialization:generated/materials/{}/smelting/ore_deepslate_to_ingot_"+id); });
	autoremove("modern_industrialization:compat/techreborn/macerator/_c_silver_ores_to_techreborn_raw_silver");
	['{}_block', '{}_ingot_from_nugget', 'raw_{}_block'].forEach((id) => { removeIr("block",'shaped/'+id) });
	['{}_ingot_from_block', '{}_nugget', 'raw_{}'].forEach((id) => { removeIr("block",'shapeless/'+id) });
	['ingot_from_block', 'ingot_from_nugget'].forEach((id) => { removeIr("ingot",'shapeless/{}_'+id) });
	['ingot', 'ingot_from_raw_ores', 'ingot_from_raw_ore', 'ingot_from_ores', 'ingot_from_ore', 'ingot_from_smelting'].forEach((id) => { 
		removeIr("ingot",'smelting/{}_'+id);
		removeIr("ingot",'blasting/{}_'+id);
	});

	generateReiScript(itemIdToUnified);
});

function generateReiScript(itemIdToUnified) {
	script = `
//////////////////////////////////////////////////////////////////////////
//  REI Unification Script.                                             //
//////////////////////////////////////////////////////////////////////////
const DELETED_ITEMS = ["${Object.keys(itemIdToUnified).join('", "')}"];
onEvent("rei.hide.items", event => {
	DELETED_ITEMS.forEach(id => event.hide(id));
});
	`;
	console.log(script);
};

onEvent("recipes.serializer.special.flag", event => { // Fix indrev/createaddition recipe types
	["compress", "pulverize", "infuse"].forEach(id => event.ignoreSpecialFlag("indrev:" + id));
	event.ignoreSpecialFlag("createaddition:rolling");
	event.ignoreSpecialFlag("tconstruct:casting");
});