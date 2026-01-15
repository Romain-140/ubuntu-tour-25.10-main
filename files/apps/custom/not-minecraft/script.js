let cubes;

const movementSize = 50;
const perspective = 800;

MMultiply = (a, b) => a.map(x => transpose(b).map(y => dotProduct(x, y)));
dotProduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
transpose = a => a[0].map((x, i) => a.map(y => y[i]));

const sumArrays = (a, b) => a.map((item, i) => [item[0] + b[i][0]]);
const difArrays = (a, b) => a.map((item, i) => [item[0] - b[i][0]]);

let rX = 0;
let rY = 0;

let tX = 0;
let tY = 0;
let tZ = 0;

let cosX;
let cosY;

let sinX;
let sinY;

let sensitivity = (sessionStorage.browser === "Firefox") ? 3 : 1;

function addStyle() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = './files/apps/custom/not-minecraft/main.css';
    document.head.append(style);
}

function setup() {

    rX = 0;
    rY = 0;

    tX = 0;
    tY = 0;
    tZ = 0;

    scene = document.querySelector(".scene");
    cubes = document.querySelectorAll('.cube');

    scene.addEventListener("click", () => {
        scene.requestPointerLock();
        scene.requestFullscreen();
        updateViewPoint();
    });

    document.addEventListener("mousemove", (e) => {
        if (document.pointerLockElement === scene) {
            rX -= e.movementY * sensitivity;
            rY += e.movementX * sensitivity;

            rX = Math.max(-90, Math.min(90, rX));

            let rrX = rX * Math.PI / 180;
            let rrY = rY * Math.PI / 180;

            cosX = Math.cos(rrX);
            sinX = Math.sin(rrX);

            cosY = Math.cos(rrY);
            sinY = Math.sin(rrY);

            updateViewPoint();
        }
    });

    document.addEventListener("keypress", (e) => {
        if (document.pointerLockElement === scene) {
            let moveR = (e.key === 'd') - (e.key === 'q');
            let moveU = (e.key === ' ') - (e.key === 'x');
            let moveF = (e.key === 'z') - (e.key === 's');

            tX -= sinY * moveF + cosY * moveR;
            tY -= moveU;
            tZ += cosY * moveF - sinY * moveR;

            updateViewPoint();
        }
    });
}

function loadScene(container) {
    container.innerHTML = '<div class="scene"></div>';
}

function addCube(x, y, z, type, scene) {
    type = type === "" ? 'noName' : type;
    let cube = document.createElement('div');
    cube.classList = 'cube';
    cube.type = type;
    cube.setAttribute('x', x);
    cube.setAttribute('y', y);
    cube.setAttribute('z', z);

    cube.innerHTML = `
        <div class="face top" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-top.webp)"></div>
        <div class="face bottom" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-bot.webp)"></div>
        <div class="face left" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-left.webp)"></div>
        <div class="face right" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-right.webp)"></div>
        <div class="face front" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-front.webp)"></div>
        <div class="face back" style="background-image: url(./files/apps/custom/not-minecraft/data/img/blocks/${type}/${type}-back.webp)"></div>`;
    scene.appendChild(cube);
}



// TODO edit with addlock function (x, y, z, type)
// TODO add block type
// TODO grab textures
// TODO add velocity (and not just move)
// TODO add colisions
// TODO add visual priority (raytracing)
// TODO add chunk loading only (optimisation)
// TODO add procedural generation (start)

function updateViewPoint() {
  for (let i = 0; i < cubes.length ; i++) {
    let cube = cubes[i];

    let cX = Number(cube.getAttribute('x')) * 100;
    let cY = Number(cube.getAttribute('y')) * 100;
    let cZ = Number(cube.getAttribute('z')) * 100;

    let coordinates = [[cX], [cY], [cZ]];
    let playerPosition = [[-tX * movementSize], [tY * movementSize], [-tZ * movementSize]];

    let rotationMatrixZ = [
      [1, 0, 0],
      [0, cosX, -sinX],
      [0, sinX, cosX]
    ];

    let rotationMatrixY = [
      [cosY, 0, sinY],
      [0, 1, 0],
      [-sinY, 0, cosY]
    ];

    coordinates = difArrays(coordinates, playerPosition);

    coordinates = MMultiply(rotationMatrixY, coordinates);

    coordinates = MMultiply(rotationMatrixZ, coordinates);

    // coordinates = sumArrays(coordinates, playerPosition);

    cX = coordinates[0][0];
    cY = coordinates[1][0];
    cZ = coordinates[2][0] + perspective;

    // cube.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg)`;
    // cube.style.transform = `translateX(${cX}px) translateY(${cY}px) translateZ(${cZ}px)`;
    cube.style.transform = `translateX(${cX}px) translateY(${cY}px) translateZ(${cZ}px) rotateX(${rX}deg) rotateY(${rY}deg)`; // "Correct" 
    // cube.style.transform = `translateX(${-tX * 50}px) translateY(${tY * 50}px) translateZ(${tZ * 50}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
  }
};

function loadWindowNotMinecraft() {
    let JSONData = document.getElementById('json-data');
    let window = document.createElement('div');
    window.innerHTML = JSON.parse(JSONData.innerHTML)["window template"];

    document.getElementById('window-space').appendChild(window);

    createWindow(window.firstChild);

    let content = document.createElement('div')
    content.classList = 'window-content';
    loadScene(content);
    window.firstChild.appendChild(content);

    addCube(1, 0, 0, "", content.firstChild);
    addCube(0, 1, 0, "", content.firstChild);
    addCube(0, 0, 1, "", content.firstChild);
    addCube(0, 0, 0, "grass_block", content.firstChild);

    setup();
}

function onStart() {
    addStyle();

    loadWindowNotMinecraft();
}