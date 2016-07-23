/* eslint-disable no-param-reassign */

import {
    randomInt,
    randomShuffle,
    gernerateArrayPositions,
} from './helpers/random';

import {
    matchPos,
} from './helpers/location';

import Carrot from './carrot';
import Rabbit from './rabbit';
import Wolf from './wolf';

import {
    WORLD_WIDTH,
    WORLD_HEIGHT,
    WORLD_RABBIT_START,
    WORLD_WOLF_START,
    WORLD_CARROT_SPAWN_CHANCE,
} from './constants';

class World {
    constructor() {
        this.creatures = [];

        const possiblePos = gernerateArrayPositions(WORLD_WIDTH, WORLD_HEIGHT);
        const posRand = randomShuffle(possiblePos);
        const map = this.getMap();
        this.spawnCarrots(map);
        this.spawnRabbits(
            posRand.slice(0, WORLD_RABBIT_START)
        );

        this.spawnWolves(
            posRand.slice(WORLD_RABBIT_START, WORLD_RABBIT_START + WORLD_WOLF_START)
        );
    }

    // Initialises rabbits
    spawnRabbits(pos) {
        for (let i = 0; i < WORLD_RABBIT_START; i++) {
            this.creatures.push(new Rabbit(pos[i]));
        }
    }

    // Initialises wolfs
    spawnWolves(pos) {
        for (let i = 0; i < WORLD_WOLF_START; i++) {
            this.creatures.push(new Wolf(pos[i]));
        }
    }

    // Finds creatures at the given position
    getCreatureAtPos(pos) {
        return this.creatures.filter(c => matchPos(c.pos, pos));
    }

    getCreaturesOfType(type) {
        return this.creatures.filter(c => {
            const { name } = c.constructor;
            return (name === type);
        });
    }

    // Iterate every tile in loop
    // For each tile there is a 1 in n chance a carrot will spawn
    spawnCarrots(map) {
        for (let x = 0; x < WORLD_WIDTH; x++) {
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                if (!map[x][y].length) {
                    const chance = randomInt(0, WORLD_CARROT_SPAWN_CHANCE);
                    if (chance === WORLD_CARROT_SPAWN_CHANCE) {
                        this.creatures.push(new Carrot({ x, y }));
                    }
                }
            }
        }
    }

    getMap() {
        const map = [];
        for (let x = 0; x < WORLD_WIDTH; x++) {
            map[x] = [];
            for (let y = 0; y < WORLD_HEIGHT; y++) {
                map[x][y] = [];
            }
        }

        this.creatures.forEach(c => {
            map[c.pos.x][c.pos.y].push(c);
        });

        return map;
    }

    update() {
        // Find creatures that are ready to reproduce
        const canReproduce = this.creatures
            .filter(c => c.canReproduce());

        // Update creatures array with new creatures
        for (let i = 0; i < canReproduce.length; i++) {
            const child = canReproduce[i].reproduce();
            this.creatures.push(child);
        }

        // Iterate creatures
        this.creatures = this.creatures.map(c => {
            c.update();
            return c;
        })
        .filter(c => c.isAlive); // filter dead creatures

        const map = this.getMap();
        this.spawnCarrots(map);
    }
}

export default new World();
