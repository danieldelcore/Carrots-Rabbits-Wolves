import World from './world';

let map;
let stats;

function draw() {
    // Render world.creatures
}

function update() {
    World.update();
    draw();
    requestAnimationFrame(update);
}

(() => {
    map = document.getElementById('Map');
    stats = document.getElementById('Stats');
    update();
})();
