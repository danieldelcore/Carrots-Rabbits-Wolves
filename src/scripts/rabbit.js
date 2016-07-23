import {
    matchPos,
    getDistance,
} from './helpers/location';

import Creature from './creature';
import World from './world';

class Rabbit extends Creature {
    constructor(startPos) {
        super(startPos);
    }

    reproduce() {
        this.resetHealth();
        const child = new Rabbit({ x: this.pos.x, y: this.pos.y });
        child.stepToRand();
        return child;
    }

    update() {
        this.checkHealth();

        if (!this.isAlive) return;

        // Get closest
        const closest = World
            .getCreaturesOfType('Carrot')
            .reduce((closestCarr, c) => {
                const dist = getDistance(this.pos, c.pos);
                if (!closestCarr.carrot || dist < closestCarr.dist) {
                    return {
                        dist,
                        carrot: c,
                    };
                }
                return closestCarr;
            }, {
                dist: null,
                carrot: null,
            });

        if (closest.carrot) {
            this.dest = closest.carrot.pos;
            this.stepTo();
        } else {
            this.stepToRand();
        }

        if (closest.carrot && closest.carrot.isAlive && matchPos(this.pos, closest.carrot.pos)) {
            closest.carrot.dead();
            this.incrementHealth();
        } else {
            this.decrementHealth();
        }
    }
}

export default Rabbit;
