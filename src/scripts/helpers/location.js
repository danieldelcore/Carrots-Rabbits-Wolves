
// Checks if two positions match
export function matchPos(pos1, pos2) {
    return (pos1.x === pos2.x && pos1.y === pos2.y);
}

// Returns the distance between two points
export function getDistance(pos1, pos2) {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}
