const MATS = [
	"aluminum",
	"bauxite",
	"bronze",
	"chrome",
	"coal",
	"copper",
	"diamond",
	"electrum",
	"emerald",
	"gold",
	"invar",
	"iridium",
	"iron",
	"lapis",
	"lead",
	"manganese",
	"nickel",
	"platinum",
	"quartz",
	"ruby",
	"silicon",
	"silver",
	"steel",
	"sulfur",
	"tin",
	"titanium",
	"tungsten",
	"salt",
	"carbon",
];

const PARTS = [
	"ingot",
	"dust",
	"plate",
	"nugget",
	"block",
];

const TOOLS = [
	"sword",
	"pickaxe",
	"axe",
	"shovel",
	"hoe",
	"helmet",
	"chestplate",
	"leggings",
	"boots",
];

onEvent('recipes', event => {
	PARTS.forEach(part => {
		MATS.forEach(mat => {
			event.replaceOutput('techreborn:'+mat+'_'+part, 'modern_industrialization:'+mat+'_'+part);
			event.replaceOutput('indrev:'+mat+'_'+part, 'modern_industrialization:'+mat+'_'+part);
			event.replaceInput('techreborn:'+mat+'_'+part, '#c:'+mat+'_'+part+'s');
			event.replaceInput('indrev:'+mat+'_'+part, '#c:'+mat+'_'+part+'s');
		});
	});
	
	MATS.forEach(mat => {
		event.replaceOutput('modern_industrialization:raw_'+mat, 'techreborn:raw_'+mat);
		event.replaceOutput('indrev:raw_'+mat, 'techreborn:raw_'+mat);
	});
	
	TOOLS.forEach(tool => {
		event.remove({output: 'indrev:bronze_'+tool});
	});
});

onEvent('tags.items', event => {	
	PARTS.forEach(part => {
		MATS.forEach(mat => {
			event.removeAllTagsFrom('techreborn:'+mat+'_'+part);
			event.removeAllTagsFrom('indrev:'+mat+'_'+part);
		});
	});
	
	MATS.forEach(mat => {
		//event.removeAllTagsFrom('modern_industrialization:raw_'+mat);
		//event.removeAllTagsFrom('indrev:raw_'+mat);
	});
});

onEvent("recipes.serializer.special.flag", event => {
	["compress", "pulverize", "infuse"].forEach(id => event.ignoreSpecialFlag("indrev:"+id));
});