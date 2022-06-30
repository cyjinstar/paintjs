const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave")

const INITIAL_COLOR = "##2c2c2c"
const CANVAS_W = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_H = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
ctx.fillStyle = "#fdfbf8";
ctx.fillRect(0,0,CANVAS_W,CANVAS_W);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let isDown = false;
let ismouseIn = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (isDown && ismouseIn){
        painting = true;
    }
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function stopPainting(event) {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseDown(event) {
    isDown = true;
}

function onMouseUp(event) {
    isDown = false;
    painting = false;
}

function mouseIn(event) {
    ismouseIn = true;
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    console.log(size);
}

function handleModeClick() {
    if(filling == true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCavasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "painting";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mousedown", onMouseDown);
    addEventListener("mouseup", stopPainting);
    addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseenter", mouseIn);
    canvas.addEventListener("click", handleCavasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

range.style.WebkitSliderRunnableTrack = "##2c2c2c";

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveClick);
}
