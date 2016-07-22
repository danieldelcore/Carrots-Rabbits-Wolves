import {
    WORLD_WIDTH,
    WORLD_HEIGHT,
    WORLD_RABBIT_START,
    WORLD_WOLF_START,
} from './constants';

import Carrot from './carrot';
import Rabbit from './rabbit';
import Wolf from './wolf';

class World {
    constructor() {
        this.creatures = [];
    }

    update() {
        console.log('here');

    }
}

export default new World();
