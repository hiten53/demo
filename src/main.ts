const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;

const outerRectOrigin: [number, number] = [0, 0];
const outerRectSize: [number, number] = [canvas.width - 5, canvas.height - 5]; // Adjusted size to fit within the canvas
const innerRectOrigin: [number, number] = [0, outerRectSize[1] / 2];
const innerRectSize: [number, number] = [10, 10];

const wallOrigin: [number, number] = [300, 100];
const wallSize: [number, number] = [5, 200]

ctx.shadowBlur = 10;
ctx.shadowColor = "pink";
ctx.fillStyle = "black";
ctx.fillRect(...outerRectOrigin, ...outerRectSize);

ctx.shadowBlur = 10;
ctx.shadowColor = "pink";
ctx.fillStyle = "white";
ctx.fillRect(0, outerRectSize[1] / 2, outerRectSize[0], 3)

ctx.shadowBlur = 0;
let currColor = 0;
const colors = [
    "Violet",
    "Indigo",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Red"
];

const FPS = 125;
let offset = 0; // Starting offset value for x
const draw = () => {
    let currX = offset;
    let currY = innerRectOrigin[1] - Math.sin(currX * Math.PI / 180) * 100; // Calculate y based on sin trajectory
    ctx.translate(outerRectOrigin[0], outerRectOrigin[1]); // Translate to the origin of the outer rectangle

    ctx.fillStyle = colors[currColor];
    currColor = (currColor + 1) % colors.length;
    
    ctx.fillRect(currX, currY, ...innerRectSize);

    offset += 10; // Increment x position

    setTimeout(() => {
        if (offset <= 720)
            window.requestAnimationFrame(draw);
    }, 1000 / FPS);
};

document.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "Enter") {
            if (!document.fullscreenElement)
                document.documentElement.requestFullscreen();
        }
    },
    false,
)

const startGame = () => {
    window.requestAnimationFrame(draw);
};

startGame();
