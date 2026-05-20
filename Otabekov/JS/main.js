let myWolrd = document.getElementById("world");
let container = document.getElementById("container");
let hint = document.getElementById("hint");
let door = document.getElementById("door");

let lvl_one_map = [
    { id: "floor", w: 2500, h: 3000, color: "grey", x: 0, y: 0, z: -250, rx: 0, ry: 90, rz: 0 },
    { id: "roof-right", w: 580, h: 1000, color: "grey", x: 0, y: 250, z: 395, rx: 0, ry: 90, rz: -150 },
    { id: "roof-left", w: 580, h: 1000, color: "grey", x: 0, y: -250, z: 395, rx: 0, ry: 90, rz: 150 },
    { id: "roof-back-left", w: 570, h: 300, color: "red", x: 500, y: -175, z: 265, rx: -30, ry: 0, rz: 0 },
    { id: "roof-back-right", w: 570, h: 300, color: "red", x: 500, y: 175, z: 265, rx: 30, ry: 0, rz: 0 },
    { id: "roof-front-left", w: 570, h: 300, color: "red", x: -500, y: -175, z: 265, rx: -30, ry: 0, rz: 0 },
    { id: "roof-front-right", w: 570, h: 300, color: "red", x: -500, y: 175, z: 265, rx: 30, ry: 0, rz: 0 },
    { id: "front wall", w: 1000, h: 500, color: "aquamarine", x: -500, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
    { id: "back wall", w: 1000, h: 150, color: "#00ff0d", x: 500, y: 0, z: 175, rx: 0, ry: 0, rz: 0 },
    { id: "back wall", w: 400, h: 500, color: "#00ff0d", x: 500, y: -300, z: 0, rx: 0, ry: 0, rz: 0 },
    { id: "back wall", w: 400, h: 500, color: "#00ff0d", x: 500, y: 300, z: 0, rx: 0, ry: 0, rz: 0 },
    { id: "door", w: 200, h: 350, color: "#0496cf", x: 500, y: 0, z: -75, rx: 0, ry: 0, rz: 0 },
    // { id: "door", w: 200, h: 350, color: "#0496cf", x: 600, y: -83, z: -75, rx: 0, ry: 0, rz: -80 },
    { id: "right wall", w: 1000, h: 500, color: "#ff0086", x: 0, y: 500, z: 0, rx: 0, ry: 0, rz: 90 },
    { id: "left wall", w: 1000, h: 500, color: "#17c97d", x: 0, y: -500, z: 0, rx: 0, ry: 0, rz: 90 }
];

function drawSquares(map) {
    for (let i = 0; i < map.length; i++) {
        let el = document.createElement("div");
        el.id = map[i].id;
        el.style.position = "absolute";
        el.style.width = `${map[i].w}px`;
        el.style.height = `${map[i].h}px`;
        el.style.backgroundColor = map[i].color;

        el.style.transform =
            `translate3d(
                ${myWolrd.clientWidth / 2 - map[i].w / 2 + map[i].y}px, 
                ${myWolrd.clientHeight / 2 - map[i].h / 2 - map[i].z}px, 
                ${map[i].x}px
            )
            rotateX(${map[i].ry}deg)
            rotateY(${map[i].rz}deg)
            rotateZ(${map[i].rx}deg)`;

        myWolrd.appendChild(el);
    }
}

drawSquares(lvl_one_map);

let dispVector = { x: -1000, y: 0, z: 0 };
let velX = 0;
let velY = 0;

// pointer lock
container.addEventListener("click", () => {
    container.requestPointerLock();
});

let cameraYaw = 0;
let cameraPitch = 0;

document.addEventListener("mousemove", (e) => {
    if (document.pointerLockElement === container) {
        cameraYaw += e.movementX * 0.1;
        cameraPitch -= e.movementY * 0.1;

        if (cameraPitch > 25) cameraPitch = 25;
        if (cameraPitch < -50) cameraPitch = -50;
    }
});

let doorOpen = false;

function isNearDoor() {
    let dx = dispVector.x - -600;
    let dy = dispVector.y - 0;
    let dz = dispVector.z - (-75);

    let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    return dist < 200;
}

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyF" && isNearDoor()) {
        doorOpen = !doorOpen;

        let door = document.getElementById("door");
        door.style.transition = "transform 0.5s ease";

        if (doorOpen) {
            door.style.transform =
                `translate3d(
                ${217}px,
                ${myWolrd.clientHeight / 2 - 350 / 2 + 75}px,
                600px
                ) rotateY(-70deg)`;
        } else {
            door.style.transform =
                `translate3d(
                    ${myWolrd.clientWidth / 2 - 100 + 0}px,
                    ${myWolrd.clientHeight / 2 - 350 / 2 + 75}px,
                    500px
                ) rotateY(0deg)`;
        }
    }

    // movement
    if (e.code == "KeyW") velX = 30;
    if (e.code == "KeyS") velX = -30;
    if (e.code == "KeyD") velY = -30;
    if (e.code == "KeyA") velY = 30;
});

document.addEventListener("keyup", () => {
    velX = 0;
    velY = 0;
});

let bounds = {
    minX: -1200,
    maxX: 1700,
    minY: -1000,
    maxY: 1000
};

function update() {
    dispVector.x += velX;
    dispVector.y += velY;

    // 🔒 COLLISION (devordan o'tmaslik)
    if (dispVector.x > bounds.maxX) dispVector.x = bounds.maxX;
    if (dispVector.x < bounds.minX) dispVector.x = bounds.minX;

    if (dispVector.y > bounds.maxY) dispVector.y = bounds.maxY;
    if (dispVector.y < bounds.minY) dispVector.y = bounds.minY;

    // world render
    myWolrd.style.transform =
        `translate3d(${dispVector.y}px, ${dispVector.z}px, ${dispVector.x}px)`;

    camera.style.transform =
        `rotateX(${cameraPitch}deg)
         rotateY(${cameraYaw}deg)`;
    // hint
    hint.style.display = isNearDoor() ? "block" : "none";
}

setInterval(update, 16);