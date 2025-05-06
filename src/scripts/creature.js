/* eslint-disable no-fallthrough */

import { randomInt } from './helpers/random';
import {
    WORLD_WIDTH,
    WORLD_HEIGHT,
    CREATURE_HEALTH,
    CREATURE_HEALTH_MAX,
    CREATURE_HEALTH_INC,
} from './constants';

class Creature {
    constructor(pos = { x: 0, y: 0 }) {
        this.isAlive = true;
        this.pos = pos;
        this.dest = { x: 0, y: 0 };
        this.startHealth = CREATURE_HEALTH;
        this.maxHealth = CREATURE_HEALTH_MAX;
        this.health = CREATURE_HEALTH;
        this.incrementHealthBy = CREATURE_HEALTH_INC;
    }

    dead() {
        this.isAlive = false;
    }

    checkHealth() {
        if (this.health >= this.maxHealth) {
            this.health = this.startHealth;
        } else if (this.health <= 0) {
            this.dead();
        }
    }

    resetHealth() {
        this.health = this.startHealth;
    }

    incrementHealth() {
        this.health += this.incrementHealthBy;
    }

    decrementHealth() {
        --this.health;
    }

    canReproduce() {
        return (this.health >= this.maxHealth);
    }

    // Will step towards the destination
    // An element of randomness needs to be applied so that the
    // creature wont walk in the same direction first everytime
    stepTo() {
        let newPosX = this.pos.x;
        let newPosY = this.pos.y;

        if (this.dest.x > newPosX) {
            newPosX++;
        } else if (this.dest.x < newPosX) {
            newPosX--;
        }

        if (this.dest.y > newPosY) {
            newPosY++;
        } else if (this.dest.y < newPosY) {
            newPosY--;
        }

        // Check if a move on both axis is required.
        // If so randomly choose one and update the pos
        // else only update the change
        if (this.pos.x !== newPosX && this.pos.y !== newPosY) {
            const rand = randomInt(0, 1);
            if (rand === 0) {
                this.pos.x = newPosX;
            } else {
                this.pos.y = newPosY;
            }
        } else {
            this.pos.x = newPosX;
            this.pos.y = newPosY;
        }
    }

    // Randomly step in a direction
    stepToRand() {
        const newPos = this.pos;
        // Generate a random number between 0-3
        // which represents the directions available to the creature
        let dir = randomInt(0, 3);
        
        // Try each direction in sequence until a valid move is found
        for (let attempts = 0; attempts < 4; attempts++) {
            // Calculate current direction to try (0-3)
            const currentDir = (dir + attempts) % 4;
            
            // Try to move in the current direction
            switch (currentDir) {
                case 0: // Try moving right
                    if (this.checkBounds(newPos, { x: newPos.x + 1 })) {
                        newPos.x++;
                        this.pos = newPos;
                        return true;
                    }
                    break;
                case 1: // Try moving left
                    if (this.checkBounds(newPos, { x: newPos.x - 1 })) {
                        newPos.x--;
                        this.pos = newPos;
                        return true;
                    }
                    break;
                case 2: // Try moving down
                    if (this.checkBounds(newPos, { y: newPos.y + 1 })) {
                        newPos.y++;
                        this.pos = newPos;
                        return true;
                    }
                    break;
                case 3: // Try moving up
                    if (this.checkBounds(newPos, { y: newPos.y - 1 })) {
                        newPos.y--;
                        this.pos = newPos;
                        return true;
                    }
                    break;
            }
        }
        
        // No valid moves found in any direction
        return false;
    }

    // Checks if the given position is in bounds
    checkBounds(pos, alter) {
        const newPos = Object.assign({}, pos, alter);
        if (newPos.x < 0 || newPos.x >= WORLD_WIDTH) return false;
        if (newPos.y < 0 || newPos.y >= WORLD_HEIGHT) return false;
        return true;
    }

    reproduce() {
        // To be implemented by the derived class
    }

    update() {
        // To be implemented by the derived class
    }

}

export default Creature;
