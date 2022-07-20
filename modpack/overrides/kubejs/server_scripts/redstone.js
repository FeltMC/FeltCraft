onEvent('recipes', event => {
    event.remove({output: 'minecraft:repeater'});
    event.replaceInput('minecraft:repeater', 'wiredredstone:gate_repeater');
    event.remove({output: 'minecraft:comparator'});
    RedstoneAssembler(event, 'minecraft:comparator', 'ABA', 'CAC', 'DAD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'minecraft:quartz', 'wiredredstone:stone_plate')
    event.remove({output: 'redbits:two_way_repeater'});
    RedstoneAssembler(event, 'redbits:two_way_repeater', 'BCB', 'ACA', 'AAD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'wiredredstone:redstone_delay_line', 'wiredredstone:stone_plate')
    event.remove({output: 'redbits:t_flip_flop'});
    RedstoneAssembler(event, 'redbits:t_flip_flop', 'BDB', 'DCD', 'BAB', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'minecraft:quartz', 'wiredredstone:stone_plate')
    event.remove({output: 'redbits:latch'});
    RedstoneAssembler(event, 'redbits:latch', 'CBA', 'ADA', 'ABC', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'wiredredstone:redstone_anode', 'wiredredstone:stone_plate')
    event.remove({output: 'redbits:detector'});
    RedstoneAssembler(event, 'redbits:detector', 'DAD', 'BCB', 'DDD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'minecraft:quartz', 'wiredredstone:stone_plate')
    event.remove({output: 'redstonebits:adder'});
    RedstoneAssembler(event, 'redstonebits:adder', 'DBD', 'DAD', 'DCD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'minecraft:quartz', 'wiredredstone:stone_plate')
    event.remove({output: 'redstonebits:resistor'});
    RedstoneAssembler(event, 'redstonebits:resistor', 'DBD', 'BCB', 'DAD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'modern_industrialization:copper_plate', 'wiredredstone:stone_plate')
    event.remove({output: 'redstonebits:counter'});
    RedstoneAssembler(event, 'redstonebits:counter', 'DBD', 'DCD', 'DAD', 'wiredredstone:redstone_wire_plate', 'wiredredstone:redstone_inverting_cathode', 'minecraft:quartz', 'wiredredstone:stone_plate')
    event.remove({output: 'redbits:inverter'});
    event.remove({output: 'redstonebits:inverter'});

    function RedstoneAssembler(event, output, p1, p2, p3, a, b, c, d){
        event.custom({
            type: "wiredredstone:redstone_assembler_shaped",
            pattern: [
                p1,
                p2,
                p3
            ],
            key: {
                A: {
                  item: a
                },
                B: {
                  item: b
                },
                C: {
                  item: c
                },
                D: {
                  item: d
                }
              },
              result: {
                item: output,
                count: 1
              },
            cookingtime: 50,
            energypertick: 5
        })
    }
});