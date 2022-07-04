////////////////////////
/// Made by Team AOF ///
////////////////////////

//////////////////////////////////////////////////
// AOF Unification Script - MIT licensed.       //
//////////////////////////////////////////////////

const PARTS = [ // List of part tags to unify.
	"c:circuits/",
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
	"c:circuits/",
	"c:raw_materials/",
	"c:storage_blocks/raw_"
];

const MATERIALS = [ // List of materials to unify.
	"aluminum",
	"antimony",
	"battery_alloy",
	"bauxite",
	"beryllium",
	"brass",
	"brick",
	"bronze",
	"cadmium",
	"carbon",
	"chrome",
	"chromium",
	"coal",
	"coal_coke",
	"copper",
	"cupronickel",
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
	"zinc",
	"basic",
	"advanced",
	"data",
	"elite",
	"master",
	"ultimate"
];

const UNIFICATION_ORDER = [ // Order of mods to unify
	"minecraft",
	"mineralization",
	"modern_industrialization",
	"create",
	"createplus",
	"createdeco",
	"createaddition",
	"ic2",
	"techreborn",
	"indrev",
	"gt4r",
	"gregtech",
	"antimatter",
	"croptopia",
	"dwarfcoal",
	"ae2"
];

const UNIFICATION_BLACKLIST = [ // List of tags NOT to unify
	"c:blocks/quartz",
    "c:gold_ores",
	"c:coal_ores",
	"c:iron_ores",
	"c:diamond_ores",
	"c:lapis_ores",
	"c:redstone_ores",
	"c:emerald_ores",
	"c:copper_ores"
];

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
				console.log(`Missing namespace ${namespace} in the unification order: ${UNIFICATION_ORDER}. Required by item ${id} in tag ${tagName}.`);
				throw new Error(`Missing namespace ${namespace} in the unification order: ${UNIFICATION_ORDER}. Required by item ${id} in tag ${tagName}.`);
			}

			if (namespace === unificationNamespace) { // Otherwise pick the best in the list
				if (unifyTargetId === undefined) unifyTargetId = id;
			}
		});
	});

	if (unifyTargetId === undefined) return undefined;
	else return "" + unifyTargetId; // Convert to string
}

onEvent('tags.items', event => { // Unify common tags
	MATERIALS.forEach(material => { // Regular parts
		PARTS.forEach(partTagTemplate => {
			const tagName = partTagTemplate+material;

			if (partTagTemplate === "c:raw_materials/") { //Fabric Tags
				event.get('c:raw_'+material+'_ores').getObjectIds().forEach(item => {
					event.add(tagName, item)
				});
			} else if (partTagTemplate === "c:storage_blocks/raw_") {
				event.get('c:raw_'+material+'_blocks').getObjectIds().forEach(item => {
					event.add(tagName, item)
				});
			} else {
				event.get('c:'+material+'_'+partTagTemplate.replace("c:", "").replace("/", "")).getObjectIds().forEach(item => {
					event.add(tagName, item)
				});
			}

			let unifyTargetId = findTagUnification(event, tagName); // Pick unification target
			if (unifyTargetId === undefined) return;
			unifiedTagList.push(tagName);

			event.get(tagName).getObjectIds().forEach(id => { // Collect other items for item unification.
				id = "" + id; // convert ResLoc to native JS string
				if (id in itemIdToUnified) {
					throw new Error("Item id " + tagStack.id + " already has a unification mapping! " + itemIdToUnified[id]);
				} else if (id !== unifyTargetId) {
					itemIdToUnified[id] = unifyTargetId;
					event.remove(tagName, id); // Remove from tag.
				}
			});
		});

		// Ore parts
		const oreTagName = `c:${material}_ores`;
		const oreItemId = findTagUnification(event, oreTagName);

		if (oreItemId === undefined) return; // No ore found!
		unifiedTagList.push(oreTagName);

		const oreItemIdParts = oreItemId.split(":");
		const deepslateOreItemId = oreItemIdParts[0] + ":deepslate_" + oreItemIdParts[1]; // Convert ore to deepslate variant.

		event.get(oreTagName).getObjectIds().forEach(id => {// Collect ores, unify deepslate to deepslate and regular to regular.
			id = "" + id; // convert ResLoc to native JS string
			if (id in itemIdToUnified) {
				throw new Error("Item id " + id + " already has a unification mapping! " + itemIdToUnified[id]);
			} else if (id !== oreItemId && id !== deepslateOreItemId) {
				if (id.includes("deepslate")) {
					itemIdToUnified[id] = deepslateOreItemId;
				} else {
					itemIdToUnified[id] = oreItemId;
				}
				event.remove(oreTagName, id); // Remove from tag.
			}
		});
	});
})

onEvent('recipes', event => {
	for (let id in itemIdToUnified) { // Replace inputs and outputs with unified items.
		let unified = itemIdToUnified[id];
		event.replaceInput({}, id, unified);
		event.replaceOutput({}, id, unified);
	}

	unifiedTagList.forEach(tag => { // Force inputs to use the tag.
		event.replaceInput({}, tag, tag);
	});

	for (let id in itemIdToUnified) { // Add fallback recipes (output is hidden from REI by KJS Extras)
		let unified = itemIdToUnified[id];
		event.recipes.minecraft.crafting_shapeless(unified, id).id("kjsextras_output_hidden:" + id.replace(":", "_"));
	}

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

	autoremove("techreborn:{}_storage_block", "techreborn:crafting_table/storage_block/{}_storage_block");
	autoremove("techreborn:{}_storage_block", "techreborn:crafting_table/storage_block/raw_{}_storage_block");
	autoremove("techreborn:{}_block", "techreborn:crafting_table/ingot/{}_ingot_from_block");
	autoremove("techreborn:{}_block", "techreborn:crafting_table/ingot/{}_ingot_from_storage_block");
	autoremove("techreborn:{}_ingot", "techreborn:crafting_table/ingot/{}_ingot_from_block");
	autoremove("techreborn:{}_ingot", "techreborn:crafting_table/ingot/{}_ingot_from_nugget");
	autoremove("techreborn:{}_ingot", "techreborn:crafting_table/ingot/{}_nugget_from_nugget");
	autoremove("techreborn:{}_nugget", "techreborn:crafting_table/nugget/{}_nugget");
	autoremove("techreborn:{}_ore", "techreborn:smelting/{}_ingot_from_c_{}_ores");
	autoremove("techreborn:{}_ingot", "techreborn:smelting/{}_ingot_from_c_raw_{}_ores");
	autoremove("techreborn:{}_ingot", "techreborn:smelting/{}_ingot_from_raw_exported_mi_furnace");
	autoremove("techreborn:{}_ingot", "techreborn:smelting/{}_ingot_from_c_{}_dusts");
	autoremove("techreborn:{}_ingot", "techreborn:smelting/{}_ingot_from_{}_dust");
	autoremove("techreborn:{}_ingot", "techreborn:smelting/{}_block_from_raw");
	autoremove("techreborn:{}_ore", "techreborn:blasting/{}_ingot_from_c_{}_ores");
	autoremove("techreborn:{}_ingot", "techreborn:blasting/{}_ingot_from_c_{}_dusts");
	autoremove("techreborn:{}_ingot", "techreborn:blasting/{}_ingot_from_{}_dust");
	autoremove("techreborn:{}_ingot", "techreborn:blasting/{}_ingot_from_c_raw_{}_ores");
	event.replaceOutput({id: "techreborn:industrial_grinder/sheldonite_ore_with_water"}, '#c:platinum_dusts', 'modern_industrialization:raw_platinum');
	event.replaceOutput({id: "techreborn:industrial_grinder/sheldonite_ore_with_mercury"}, '#c:platinum_dusts', 'modern_industrialization:raw_platinum');
	event.replaceOutput({id: "techreborn:industrial_grinder/iridium_ore_with_sodiumpersulfate"}, '#c:platinum_dusts', 'modern_industrialization:raw_platinum');
	event.replaceOutput({id: "techreborn:industrial_grinder/heart_of_the_sea_with_mercury"}, '#c:platinum_dusts', 'modern_industrialization:raw_platinum');
	autoremove("techreborn:raw_{}", "techreborn:industrial_grinder/{}_ingot_with_mercury"); // ingot -> raw ore recipes with mercury... -_-
	autoremove("modern_industrialization:generated/materials/{}/smelting/ore_deepslate_to_ingot_smelting");
	autoremove("modern_industrialization:generated/materials/{}/smelting/ore_deepslate_to_ingot_blasting");
	autoremove("modern_industrialization:compat/techreborn/macerator/_c_silver_ores_to_techreborn_raw_silver");
	autoremove("indrev:{}_block", "indrev:shaped/{}_block");
	autoremove("indrev:{}_block", "indrev:shapeless/{}_ingot_from_block");
	autoremove("indrev:{}_block", "indrev:shaped/{}_ingot_from_nugget");
	autoremove("indrev:{}_block", "indrev:shapeless/{}_nugget");
	autoremove("indrev:{}_block", "indrev:shaped/raw_{}_block");
	autoremove("indrev:{}_block", "indrev:shapeless/raw_{}");
	autoremove("indrev:{}_ingot", "indrev:shapeless/{}_ingot_from_block");
	autoremove("indrev:{}_ingot", "indrev:shapeless/{}_ingot_from_nugget");
	autoremove("indrev:{}_ingot", "indrev:smelting/{}_ingot");
	autoremove("indrev:{}_ingot", "indrev:smelting/{}_ingot_from_raw_ore");
	autoremove("indrev:{}_ingot", "indrev:smelting/{}_ingot_from_ores");
	autoremove("indrev:{}_ingot", "indrev:smelting/{}_ingot_from_ore");
	autoremove("indrev:{}_ingot", "indrev:smelting/{}_ingot_from_smelting");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot_from_raw_ores");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot_from_raw_ore");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot_from_ores");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot_from_ore");
	autoremove("indrev:{}_ingot", "indrev:blasting/{}_ingot_from_smelting");

	generateReiScript(itemIdToUnified);
});

function generateReiScript(itemIdToUnified) {
	script = `
//////////////////////////////////////////////////////////////////////////
//  REI Unification Script.											 //
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
	["rolling"].forEach(id => event.ignoreSpecialFlag("createaddition:" + id));
});