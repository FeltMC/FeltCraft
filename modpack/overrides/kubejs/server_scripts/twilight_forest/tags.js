onEvent('tags.items', event => {
    event.removeAll('twilightforest:portal/activator');
    event.add('twilightforest:portal/activator', 'botania:dragonstone');
});