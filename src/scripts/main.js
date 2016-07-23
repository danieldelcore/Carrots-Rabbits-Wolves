/* eslint-disable no-loop-func, no-param-reassign */

import World from './world';

import {
    LOOP_INTERVAL,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    WORLD_RABBIT_START,
    WORLD_WOLF_START,
} from './constants';

import {
    matchPos,
} from './helpers/location';

let map;
let stats;

// Finds creatures at the given position
function getCreatureAtPos(creatures, pos) {
    return creatures.filter(c => matchPos(c.pos, pos));
}

function drawStats(creatures) {
    const cCount = creatures.reduce((sum, c) => {
        const { name } = c.constructor;

        if (name === 'Wolf') {
            sum.wLen++;
        } else if (name === 'Rabbit') {
            sum.rLen++;
        } else if (name === 'Carrot') {
            sum.cLen++;
        }

        return sum;
    }, { cLen: 0, rLen: 0, wLen: 0 });

    stats.innerHTML = `C: ${cCount.cLen} - R: ${cCount.rLen} - W: ${cCount.wLen}`;
}

function drawMap(creatures) {
    // Clear view
    let render = '';

    // Render creatures
    for (let y = 0; y < WORLD_HEIGHT; y++) {
        for (let x = 0; x < WORLD_WIDTH; x++) {
            const creature = getCreatureAtPos(creatures, { x, y });
            if (creature.length) {
                const { name } = creature[0].constructor;
                if (name === 'Carrot') {
                    render += '-C-';
                } else if (name === 'Rabbit') {
                    render += '-R-';
                } else if (name === 'Wolf') {
                    render += '-W-';
                }
            } else {
                render += '----';
            }
        }
        render += '<br />';
    }

    map.innerHTML = render;
}

// Draw loop responsible for rendering the UI
function draw(creatues) {
    drawMap(creatues);
    drawStats(creatues);
}

function update() {
    World.update();
    draw(World.creatures);
    // Limit game loop to the given fps
    setTimeout(() => requestAnimationFrame(update), 1000 / LOOP_INTERVAL);
}

// Check if the number of creatures exceeds
// the number of available places in the map
function validateUserInput() {
    if (WORLD_RABBIT_START + WORLD_WOLF_START > WORLD_WIDTH * WORLD_HEIGHT) {
        stats.innerHTML = `<strong>Number of creatures (Rabbits: ${WORLD_RABBIT_START}
            and Wolves: ${WORLD_WOLF_START}) cannot exceed the number of
            unique places in the map (${WORLD_WIDTH * WORLD_HEIGHT})</strong>`;
        return false;
    }

    return true;
}

(() => {
    map = document.getElementById('Map');
    stats = document.getElementById('Stats');

    if (!validateUserInput()) return;
    update();
})();
