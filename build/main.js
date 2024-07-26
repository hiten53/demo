var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.style.border = "dashed red";
canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var outerRectOrigin = [0, 0];
var outerRectSize = [canvas.width - 5, canvas.height - 5]; // Adjusted size to fit within the canvas
var innerRectOrigin = [0, outerRectSize[1] / 2];
var innerRectSize = [10, 10];
var wallOrigin = [300, 100];
var wallSize = [5, 200];
ctx.shadowBlur = 10;
ctx.shadowColor = "pink";
ctx.fillStyle = "black";
ctx.fillRect.apply(ctx, __spreadArray(__spreadArray([], outerRectOrigin, false), outerRectSize, false));
ctx.shadowBlur = 10;
ctx.shadowColor = "pink";
ctx.fillStyle = "white";
ctx.fillRect(0, outerRectSize[1] / 2, outerRectSize[0], 3);
ctx.shadowBlur = 0;
var currColor = 0;
var colors = [
    "Violet",
    "Indigo",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Red"
];
var FPS = 125;
var offset = 0; // Starting offset value for x
var draw = function () {
    var currX = offset;
    var currY = innerRectOrigin[1] - Math.sin(currX * Math.PI / 180) * 100; // Calculate y based on sin trajectory
    ctx.translate(outerRectOrigin[0], outerRectOrigin[1]); // Translate to the origin of the outer rectangle
    ctx.fillStyle = colors[currColor];
    currColor = (currColor + 1) % colors.length;
    ctx.fillRect.apply(ctx, __spreadArray([currX, currY], innerRectSize, false));
    offset += 10; // Increment x position
    setTimeout(function () {
        if (offset <= 720)
            window.requestAnimationFrame(draw);
    }, 1000 / FPS);
};
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (!document.fullscreenElement)
            document.documentElement.requestFullscreen();
    }
}, false);
var startGame = function () {
    window.requestAnimationFrame(draw);
};
startGame();
