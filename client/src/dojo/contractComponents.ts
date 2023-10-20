/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@latticexyz/recs";

export function defineContractComponents(world: World) {
  return {
    Chamber: (() => {
      const name = "Chamber";
      return defineComponent(
        world,
        {
          seed: RecsType.BigInt,
          minter: RecsType.BigInt,
          domain_id: RecsType.Number,
          token_id: RecsType.Number,
          yonder: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u256","ContractAddress","u16","u16","u16"],
          },
        }
      );
    })(),
    Map: (() => {
      const name = "Map";
      return defineComponent(
        world,
        {
          bitmap: RecsType.BigInt,
          generatorName: RecsType.BigInt,
          generatorValue: RecsType.Number,
          north: RecsType.Number,
          east: RecsType.Number,
          west: RecsType.Number,
          south: RecsType.Number,
          over: RecsType.Number,
          under: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u256","felt252","u32","u8","u8","u8","u8","u8","u8"],
          },
        }
      );
    })(),
    State: (() => {
      const name = "State";
      return defineComponent(
        world,
        {
          light: RecsType.Number,
          threat: RecsType.Number,
          wealth: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u8","u8","u8"],
          },
        }
      );
    })(),
    Tile: (() => {
      const name = "Tile";
      return defineComponent(
        world,
        {
          location_id: RecsType.BigInt,
          pos: RecsType.Number,
          tile_type: RecsType.Number,
        },
        {
          metadata: {
            name: name,
            types: ["u128","u8","u8"],
          },
        }
      );
    })(),
  };
}
