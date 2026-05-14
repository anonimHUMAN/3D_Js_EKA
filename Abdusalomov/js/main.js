var myWorld = document.getElementById("world");

var lvl_one_map = [
    { name: "floor",      height: 2000, width: 2000, posX: 0,     posY: 100,  posZ: 0,    rotX: 90, rotY: 0,  rotZ: 0, color: "#2a2a2a", texture: "floor", opacity: 0.95 },
    { name: "ceiling",    height: 2000, width: 2000, posX: 0,     posY: -100, posZ: 0,    rotX: 90, rotY: 0,  rotZ: 0, color: "#17202a", texture: "ceiling", opacity: 0.95 },
    { name: "right wall", height: 200,  width: 2000, posX: 1000,  posY: 0,    posZ: 0,    rotX: 0,  rotY: 90, rotZ: 0, color: "#704214", texture: "brick", opacity: 0.9 },
    { name: "left wall",  height: 200,  width: 2000, posX: -1000, posY: 0,    posZ: 0,    rotX: 0,  rotY: 90, rotZ: 0, color: "#704214", texture: "brick", opacity: 0.9 },
    { name: "front wall", height: 200,  width: 2000, posX: 0,     posY: 0,    posZ: 1000, rotX: 0,  rotY: 0,  rotZ: 0, color: "#793b1f", texture: "brick", opacity: 0.9 },
    { name: "back wall",  height: 200,  width: 2000, posX: 0,     posY: 0,    posZ: -1000,rotX: 0,  rotY: 0,  rotZ: 0, color: "#793b1f", texture: "brick", opacity: 0.9 },
    { name: "maze wall 1", height: 200, width: 800,  posX: 0,    posY: 0, posZ: -400, rotX: 0, rotY: 0, rotZ: 0, color: "#8a4b2b", texture: "stone", opacity: 0.95 },
    { name: "maze wall 2", height: 200, width: 800,  posX: 0,    posY: 0, posZ: 400,  rotX: 0, rotY: 0, rotZ: 0, color: "#8a4b2b", texture: "stone", opacity: 0.95 },
    { name: "maze wall 3", height: 200, width: 800,  posX: -400, posY: 0, posZ: 0,   rotX: 0, rotY: 90,rotZ: 0, color: "#8a4b2b", texture: "stone", opacity: 0.95 },
    { name: "maze wall 4", height: 200, width: 800,  posX: 400,  posY: 0, posZ: 0,   rotX: 0, rotY: 90,rotZ: 0, color: "#8a4b2b", texture: "stone", opacity: 0.95 },
    { name: "maze wall 5", height: 200, width: 400,  posX: -300, posY: 0, posZ: -150,rotX: 0, rotY: 0, rotZ: 0, color: "#a06045", texture: "brick", opacity: 0.95 },
    { name: "maze wall 6", height: 200, width: 400,  posX: 300,  posY: 0, posZ: 150, rotX: 0, rotY: 0, rotZ: 0, color: "#a06045", texture: "brick", opacity: 0.95 }
];

function applyTexture(element, texture) {
    if (!texture) return;
    if (texture === "brick") {
        element.style.backgroundImage = "linear-gradient(90deg, rgba(210,120,90,0.95) 15%, rgba(180,80,60,0.95) 15%, rgba(180,80,60,0.95) 35%, rgba(210,120,90,0.95) 35%, rgba(210,120,90,0.95) 50%, rgba(180,80,60,0.95) 50%, rgba(180,80,60,0.95) 65%, rgba(210,120,90,0.95) 65%, rgba(210,120,90,0.95) 80%, rgba(180,80,60,0.95) 80%)";
        element.style.backgroundSize = "80px 40px";
    }
    if (texture === "stone") {
        element.style.backgroundImage = "linear-gradient(135deg, rgba(145,145,145,0.95) 15%, rgba(120,120,120,0.95) 15%, rgba(120,120,120,0.95) 25%, rgba(160,160,160,0.95) 25%, rgba(160,160,160,0.95) 55%, rgba(130,130,130,0.95) 55%, rgba(130,130,130,0.95) 75%, rgba(145,145,145,0.95) 75%)";
        element.style.backgroundSize = "50px 50px";
    }
    if (texture === "floor") {
        element.style.backgroundImage = "linear-gradient(90deg, rgba(40,40,40,0.95) 10%, rgba(30,30,30,0.95) 10%, rgba(30,30,30,0.95) 20%, rgba(50,50,50,0.95) 20%, rgba(50,50,50,0.95) 30%, rgba(30,30,30,0.95) 30%, rgba(30,30,30,0.95) 40%, rgba(40,40,40,0.95) 40%)";
        element.style.backgroundSize = "80px 80px";
    }
    if (texture === "ceiling") {
        element.style.backgroundImage = "radial-gradient(circle at center, rgba(80,80,100,0.95) 0%, rgba(30,30,40,0.95) 100%)";
        element.style.backgroundSize = "200px 200px";
    }
}

function createWorld(map) {
    for (let i = 0; i < map.length; i++) {
        var mySquare = document.createElement("div");
        mySquare.id = map[i].name;
        mySquare.style.position = "absolute";
        mySquare.style.height = `${map[i].height}px`;
        mySquare.style.width = `${map[i].width}px`;
        mySquare.style.backgroundColor = map[i].color;
        mySquare.style.opacity = map[i].opacity;
        applyTexture(mySquare, map[i].texture);
        mySquare.style.transform = `
            translate3d(
                ${map[i].posX + myWorld.clientWidth / 2 - map[i].width / 2}px,
                ${map[i].posY + myWorld.clientHeight / 2 - map[i].height / 2}px,
                ${map[i].posZ}px
            )
            rotateX(${map[i].rotX}deg)
            rotateY(${map[i].rotY}deg)
            rotateZ(${map[i].rotZ}deg)
        `;
        mySquare.style.boxShadow = "inset 0 0 30px rgba(0,0,0,0.4)";
        myWorld.appendChild(mySquare);
    }
}

createWorld(lvl_one_map);

var hud = document.createElement("div");
hud.style.cssText = "position:fixed;top:10px;left:10px;color:white;font:14px monospace;text-shadow:1px 1px 2px black;pointer-events:none;";
hud.textContent = "Click to play, then use WASD + mouse. Press SPACE to jump.";
document.body.appendChild(hud);

let yaw = 0;

myWorld.addEventListener("click", () => {
    document.body.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === document.body) {
        yaw += e.movementX * 0.25;
    }
});

let pressUp = 0, pressDown = 0, pressLeft = 0, pressRight = 0;

function player(x, y, z, vx, vy, vz) {
    this.x = x; this.y = y; this.z = z;
    this.vx = vx; this.vy = vy; this.vz = vz;
}

let pawn = new player(0, 0, 0, 8, 0, 8);

const GRAVITY = 0.9;
const MAX_SPEED = 8;

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

const WALL = 950;

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") pressUp    = 1;
    if (e.code === "KeyS") pressDown  = 1;
    if (e.code === "KeyD") pressRight = 1;
    if (e.code === "KeyA") pressLeft  = 1;
    if (e.code === "Space" && pawn.y === 0) {
        pawn.vy = 16;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "KeyW") pressUp    = 0;
    if (e.code === "KeyS") pressDown  = 0;
    if (e.code === "KeyD") pressRight = 0;
    if (e.code === "KeyA") pressLeft  = 0;
});

function update() {
    const rad = yaw * Math.PI / 180;

    if (pressUp) {
        pawn.x += Math.sin(rad) * MAX_SPEED;
        pawn.z -= Math.cos(rad) * MAX_SPEED;
    }
    if (pressDown) {
        pawn.x -= Math.sin(rad) * MAX_SPEED;
        pawn.z += Math.cos(rad) * MAX_SPEED;
    }
    if (pressRight) {
        pawn.x += Math.cos(rad) * MAX_SPEED;
        pawn.z += Math.sin(rad) * MAX_SPEED;
    }
    if (pressLeft) {
        pawn.x -= Math.cos(rad) * MAX_SPEED;
        pawn.z -= Math.sin(rad) * MAX_SPEED;
    }

    pawn.vy -= GRAVITY;
    pawn.y += pawn.vy;
    if (pawn.y < 0) {
        pawn.y = 0;
        pawn.vy = 0;
    }

    pawn.x = clamp(pawn.x, -WALL, WALL);
    pawn.z = clamp(pawn.z, -WALL, WALL);

    myWorld.style.transform = `translate3d(${-pawn.x}px, ${pawn.y}px, ${600 + pawn.z}px) rotateY(${-yaw}deg)`;
    hud.textContent = `WASD move · SPACE jump · X:${Math.round(pawn.x)} Z:${Math.round(pawn.z)} Y:${Math.round(pawn.y)} Yaw:${Math.round(yaw)}°`;
}

var game = setInterval(update, 10);