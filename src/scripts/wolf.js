import {
    matchPos,
    getDistance,
} from './helpers/location';

import Creature from './creature';
import World from './world';

class Wolf extends Creature {
    constructor(startPos) {
        super(startPos);

        this.incrementHealthBy = 10;
    }

    reproduce() {
        this.resetHealth();
        const child = new Wolf({ x: this.pos.x, y: this.pos.y });
        child.stepToRand();
        return child;
    }

    update() {
        this.checkHealth();

        if (!this.isAlive) return;

        // Get closest
        const closest = World
            .getCreaturesOfType('Rabbit')
            .reduce((closestRabb, r) => {
                const dist = getDistance(this.pos, r.pos);
                if (!closestRabb.rabbit || dist < closestRabb.dist) {
                    return {
                        dist,
                        rabbit: r,
                    };
                }
                return closestRabb;
            }, {
                dist: null,
                rabbit: null,
            });

        if (closest.rabbit) {
            this.dest = closest.rabbit.pos;
            this.stepTo();
        } else {
            this.stepToRand();
        }

        if (closest.rabbit && closest.rabbit.isAlive && matchPos(this.pos, closest.rabbit.pos)) {
            closest.rabbit.dead();
            this.incrementHealth();
        } else {
            this.decrementHealth();
        }
    }
}

export default Wolf;
