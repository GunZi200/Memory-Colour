// computer picks x and y coordinates and stores that box in que.
// computer uses turnEvent animation on all boxex in que array
// user's turn, user hits all the boxes in the right order in que
// If not, its game over.
// user hits black button when done, and next round begins.
// computer and ANOTHER box in to que.
// computer uses turnEvent on BOTH boxex in que, in the right order.
// user follows...
window.onload = function () {
    console.log("Game is loaded...");
}

var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");

var que = [], reverseQue = [];//que reversed, this pops each element correct by the user.
var userTurn = false, blackCan = false, roundEvent = false, doNothing = false;
var round = 0, remain = 1, currentremain = 1, lives = 3;
var ex = 0, ey = 0, counter = 0;
var ratio = window.devicePixelRatio || 1;
var x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var x_canvas1 = a_canvas.width;//310
var y_canvas1 = a_canvas.height;//490
var Xf = x/x_canvas1; // X fraction
var Yf = y/y_canvas1; // Y fraction

function resize_canvas() {
    if (a_canvas.width < x) {
        a_canvas.width = x;
    }
    if (a_canvas.height < y) {
        a_canvas.height = y;
    } 
}
resize_canvas();
var selAudio = new Audio("SelectionSound.mp3"), myMedia = new Audio("Click.mp3"), errAudio = new Audio("WrongSound.mp3"), endAudio = new Audio("GameOver.mp3");
var k13Box = function drawK13(){
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(20*Xf, 430*Yf);
    ctx.lineTo(50*Xf, 430*Yf);
    ctx.quadraticCurveTo(60*Xf, 430*Yf, 60*Xf, 440*Yf);
    ctx.lineTo(60*Xf, 470*Yf);
    ctx.quadraticCurveTo(60*Xf, 480*Yf, 50*Xf, 480*Yf);
    ctx.lineTo(20*Xf, 480*Yf);
    ctx.quadraticCurveTo(10*Xf, 480*Yf, 10*Xf, 470*Yf);
    ctx.lineTo(10*Xf, 440*Yf);
    ctx.quadraticCurveTo(10*Xf, 430*Yf, 20*Xf, 430*Yf);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
}

var xc = 90 * Xf, yc = 110 * Yf, xfin = 0, yall = 0, xk13 = 0;
//Finnur út hvar staðsetning textans á að vera á stóru svörtu.
var blackCanvasthing = function(ys, text) {//x -staðsetning og x-canvas
    var ycc = (50 / y_canvas1), xcc = (230 / x_canvas1), midblack = (xcc/2), fastiX_black = (70/x_canvas1), fastiY_black = (30/y_canvas1), lengd = (((ctx.measureText(text).width)/x)), midtext = lengd / 2;
    xk13 = ((35/x_canvas1)-midtext)*x;//k13
    //k11 og k10
    xfin = (fastiX_black + midblack - midtext)*x;
    yall = (ys + fastiY_black)*y;
    return {
        X: xfin,
        Y: yall,
        X13: xk13
    }
}
var rects = [{x: 10*Xf, y: 10*Yf, w: xc, h: yc, color: "Green"},  //Green
        {x: 110*Xf, y: 10*Yf, w: xc, h: yc, color: "#DC143C"},  //Red
        {x: 10*Xf, y: 130*Yf, w: xc, h: yc, color: "#1E90FF"},  //Blue
        {x: 10*Xf, y: 250*Yf, w: xc, h: yc, color: "Gold"},  //Gold
        {x: 110*Xf, y: 250*Yf, w: xc, h: yc, color: "#8B008B"},  //Purple
        {x: 210*Xf, y: 10*Yf, w: xc, h: yc, color: "#DDA0DD"},  //Pink
        {x: 210*Xf, y: 130*Yf, w: xc, h: yc, color: "#FF8C00"}, //Orange k6
        {x: 210*Xf, y: 250*Yf, w: xc, h: yc, color: "Lightseagreen"}, //Lightseagreen
        {x: 110*Xf, y: 130*Yf, w: xc, h: yc, color: "Brown"}];//Brown

var game_interface = function drawGame() {
    console.log("drawing...");
    ctx.fillStyle = "Silver";
    ctx.fillRect(0, 0, x, y);
    for (var i = 0; i < rects.length; i += 1) {
        ctx.fillStyle = rects[i].color;
        ctx.fillRect(rects[i].x, rects[i].y, xc, yc);
        ctx.beginPath();
        ctx.rect(rects[i].x, rects[i].y, xc, yc);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        console.log("hi");
    }
    ctx.fillStyle = "Black";
    //------------------K10-----------------
    ctx.beginPath();
    ctx.moveTo(80*Xf,370*Yf);
    ctx.lineTo(290*Xf, 370*Yf);
    ctx.quadraticCurveTo(300*Xf, 370*Yf, 300*Xf, 380*Yf);
    ctx.lineTo(300*Xf, 410*Yf);
    ctx.quadraticCurveTo(300*Xf, 420*Yf, 290*Xf, 420*Yf);
    ctx.lineTo(80*Xf, 420*Yf);
    ctx.quadraticCurveTo(70*Xf, 420*Yf, 70*Xf, 410*Yf);
    ctx.lineTo(70*Xf, 380*Yf);
    ctx.quadraticCurveTo(70*Xf, 370*Yf, 80*Xf, 370*Yf);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
    //--------------------------------------
    //------------------K11-----------------
    ctx.beginPath();
    ctx.moveTo(80*Xf, 430*Yf);
    ctx.lineTo(290*Xf, 430*Yf);
    ctx.quadraticCurveTo(300*Xf, 430*Yf, 300*Xf, 440*Yf);
    ctx.lineTo(300*Xf, 470*Yf);
    ctx.quadraticCurveTo(300*Xf, 480*Yf, 290*Xf, 480*Yf);
    ctx.lineTo(80*Xf, 480*Yf);
    ctx.quadraticCurveTo(70*Xf, 480*Yf, 70*Xf, 470*Yf);
    ctx.lineTo(70*Xf, 440*Yf);
    ctx.quadraticCurveTo(70*Xf, 430*Yf, 80*Xf, 430*Yf);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
    //--------------------------------------
    //----------------K12-------------------
    ctx.beginPath();
    ctx.moveTo(20 * Xf, 370 * Yf);
    ctx.lineTo(50 * Xf, 370 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 370 * Yf, 60 * Xf, 380 * Yf);
    ctx.lineTo(60 * Xf, 410 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 420 * Yf, 50 * Xf, 420 * Yf);
    ctx.lineTo(20 * Xf, 420 * Yf);
    ctx.quadraticCurveTo(10*Xf, 420 * Yf, 10*Xf, 410 * Yf);
    ctx.lineTo(10*Xf, 380 * Yf);
    ctx.quadraticCurveTo(10 * Xf, 370 * Yf, 20 * Xf, 370 * Yf);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
    //--------------------------------------
    k13Box();
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord8 = blackCanvasthing(430/y_canvas1, "3"), Xhnit = getCoord8.X13, Yhnit = getCoord8.Y;
    ctx.fillText("3", Xhnit, Yhnit);// Number of lives to start with.
    ctx.beginPath();
    ctx.arc(35 * Xf, 395 * Yf, 20*Xf, (5*Math.PI)/4, (Math.PI), false);
    ctx.lineWidth = 3*Xf;
    ctx.strokeStyle = "White";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(15*Xf, 385*Yf);
    ctx.lineTo(11*Xf, 395*Yf);
    ctx.lineTo(20*Xf, 395*Yf);
    ctx.fill();
    ctx.font = "25px Arial";
    var getCoord1 = blackCanvasthing(430/y_canvas1, "Click to Start");
    var Xhnit = getCoord1.X, Yhnit = getCoord1.Y;
    ctx.fillText("Click to Start", Xhnit, Yhnit);
};

var black_canvas = function blackCanvas() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord7 = blackCanvasthing(430/y_canvas1, "Round: x"), Xhnit = getCoord7.X, Yhnit = getCoord7.Y;
    ctx.fillText("Round: " + round, Xhnit, Yhnit);
};

var continue_canvas = function continueBlack() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord2 = blackCanvasthing(430/y_canvas1, "Proceed"), Xhnit = getCoord2.X, Yhnit = getCoord2.Y;
    ctx.fillText("Proceed", Xhnit, Yhnit);
};

var remain_cavas = function newRemaining() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord3 = blackCanvasthing(370/y_canvas1, "Remaining: x"), Xhnit = getCoord3.X, Yhnit = getCoord3.Y;
    ctx.fillText("Remaining: " + remain, Xhnit, Yhnit);//k10
};

var currentremain_canvas = function newCurrentR() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80*Xf, 370*Yf, 210*Xf, 40*Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord4 = blackCanvasthing(370/y_canvas1, "Remaining: x"), Xhnit = getCoord4.X, Yhnit = getCoord4.Y;
    ctx.fillText("Remaining: " + currentremain, Xhnit, Yhnit);
};

function gameover(e){
    ex = e.offsetX, ey = e.offsetY;
    if (collides(consoleRects, ex, ey)) {
        selAudio.play();
        setTimeout(function(){
            location.reload();
        },100);
    }
}

var gameover_interface = function game_over() {
    k13Box();
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord10 = blackCanvasthing(430/y_canvas1, "0"), Xhnit = getCoord10.X13, Yhnit = getCoord10.Y;
    ctx.fillText("0", Xhnit, Yhnit);//lives = 0
    ctx.fillStyle = "Black";
    ctx.fillRect(80*Xf, 430*Yf, 210*Xf, 40*Yf);//k11
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord5 = blackCanvasthing(430/y_canvas1, "Game over: "), Xhnit = getCoord5.X, Yhnit = getCoord5.Y;
    ctx.fillText("Game over: " + round, Xhnit, Yhnit);
    ctx.fillStyle = "Black";
    ctx.fillRect(80*Xf, 370*Yf, 210*Xf, 40*Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord6 = blackCanvasthing(370/y_canvas1, "<-- Try again?"), Xhnit = getCoord6.X, Yhnit = getCoord6.Y;
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", Xhnit, Yhnit);
};

var consoleRects = [{x: 10*Xf, y: 370*Yf, w: 50*Xf, h: 50*Yf}];//k12
var startRects = [{x: 70*Xf, y: 430*Yf, w: 230*Xf, h: 50*Yf}];//k11

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function collides(rects2, x, y) {
    var isCollision = false, i = 0, lengd = 0, left = 0, right = 0, top = 0, bottom = 0;
    for (i = 0, lengd = rects2.length; i < lengd; i += 1) {
        left = rects2[i].x, right = rects2[i].x + rects2[i].w, top = rects2[i].y, bottom = rects2[i].y + rects2[i].h;
        if (right >= x && left <= x && bottom >= y && top <= y) { isCollision = rects2[i]; }
    }
    return isCollision;
}

function turnEvent(x, y) {
    var xw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var yw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var kassi = collides(rects, x, y);
    var Xfw = xw/x_canvas1;
    var Yfw = yw/y_canvas1;
    var newXsf = 3 * Xfw, newYsf = 3 * Yfw, newXlf = 6 * Xfw, newYlf = 6 * Yfw, newXs = 0, newYs = 0, newXl = 0, newYl = 0;
    var boxesSizes = [{x: kassi.x + ((1/3)*xc), y: kassi.y + ((1/3)*yc), h: ((1/3)*xc), w:  ((4/11)*yc)}];
    ctx.fillStyle = "black";
    ctx.fillRect(kassi.x, kassi.y, xc, yc);
    var temp_var = setInterval(function myAnimation() {
        ctx.fillStyle = kassi.color;
        ctx.fillRect(boxesSizes[0].x - newXs, boxesSizes[0].y - newYs, boxesSizes[0].h + newXl, boxesSizes[0].w + newYl);
        if (newXs.toFixed(2) > ((1/3)*xc)-newXsf+(xw)/x_canvas1) { newXsf = 0; }
        else { newXs +=  newXsf; }
        if (newYs.toFixed(2) > ((1/3)*yc)-newYsf) { newYsf = 0; }
        else { newYs += newYsf; }
        if (newXl.toFixed(2) > ((2/3)*xc-newXlf+(xw)/x_canvas1)) { newXlf = 0; } 
        else { newXl += newXlf; }
        if (newYl.toFixed(2) > (7/11)*yc-newYlf) { newYlf = 0;} 
        else { newYl += newYlf; }
        if (newXsf === 0 && newYsf === 0 && newXlf === 0 && newYlf === 0) {
            ctx.beginPath();
            ctx.rect(kassi.x, kassi.y, xc, yc);
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            clearInterval(temp_var);
        }
    },10);
}

function clickEvent(e){
    new FastClick.attach(document.body);
    ex = e.offsetX, ey = e.offsetY;
    startPlaying();
    if (collides(consoleRects, ex, ey)) {
        selAudio.play();
        setTimeout(function(){
            location.reload();
        },50);
    }
}

function computer() {
    a_canvas.removeEventListener('click', clickEvent, false);
    remain_cavas();
    currentremain = remain;
    var j = 0, i = setInterval(function () {
        turnEvent(que[j].x, que[j].y);
        myMedia.play();
        j += 1; // stops when counter equals the length of que.
        if (j === que.length) {
            clearInterval(i);
            a_canvas.addEventListener('click', clickEvent, false);
            userTurn = true;
        }
    }, 450);
}

function computerRe() {
    remain_cavas();
    currentremain = remain;
    var j = 0, i = setInterval(function () {
        turnEvent(que[j].x, que[j].y);
        myMedia.play();
        j += 1; // stops when counter equals the length of que.
        if (j === que.length) {
            clearInterval(i);
            a_canvas.addEventListener('click', clickEvent, false);
            userTurn = true;
        }
    }, 400);//faster version
}

function randomXY() {
    //chooses random coordinates for the computer.
    var minXY = 10*Xf, maxX = 300*Xf, maxY = 360*Yf;
    X = randomInt(minXY, maxX), Y = randomInt(minXY, maxY);
    while (!collides(rects, X, Y)) { X = randomInt(minXY, maxX), Y = randomInt(minXY, maxY); }
    return { 'x': X, 'y': Y }; // OBJECT coordinates for box the computer hits next.
}

function startPlaying() {
    var g = { 'x': 0, 'y': 0 }, i;
    if (collides(startRects, ex, ey)) {
        if (round < 1) {
            selAudio.play();//start game
            round += 1;
        }
        black_canvas();
        blackCan = true;
        g = randomXY();
    }
    if (blackCan && !userTurn) {
        for (i = 0; i < rects.length; i += 1) {
            if (collides([rects[i]], g.x, g.y)) {
                que.push(rects[i]);
                reverseQue = [];
                reverseQue = que.slice(0);
                blackCan = false;
                computer();
            }
        }
    } else if (userTurn) { // user's turn
        if (collides(rects, ex, ey)) {
            if (collides(rects, ex, ey) === que[counter]) { //if tveir litir eru tvisvar í röð.
                turnEvent(ex, ey);
                reverseQue.shift();//pops the first object in array.
                counter += 1, currentremain -= 1;
                currentremain_canvas();
            } else if (collides(rects, ex, ey) !== que[counter]) {
                a_canvas.removeEventListener('click', clickEvent, false);
                errAudio.play();
                ctx.beginPath();
                ctx.rect(collides(rects, ex, ey).x, collides(rects, ex, ey).y, xc, yc);
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'red';
                ctx.stroke();
                setTimeout(function(){
                    ctx.beginPath();
                    ctx.rect(collides(rects, ex, ey).x, collides(rects, ex, ey).y, xc, yc);
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                },300);
                counter = 0, lives -= 1;
                reverseQue = que.slice(0);
                k13Box();
                ctx.fillStyle = "White";
                ctx.font = "25px Arial";
                var getCoord9 = blackCanvasthing(430/y_canvas1, "" + lives), Xhnit = getCoord9.X13, Yhnit = getCoord9.Y;
                ctx.fillText("" + lives, Xhnit, Yhnit);
                if (lives !== 0) {
                    setTimeout(function(){
                        userTurn = false; //blackCan should be false too.
                        computerRe();
                    },1000);
                }
            }
            if (reverseQue.length === 0) {
                counter = 0;
                blackCan = false, userTurn = false;
                if (round > 0) {round += 1;};
                remain += 1;
                continue_canvas();
                return;
            } 
            if (lives === 0) {
                setTimeout(function(){ endAudio.play(); }, 800);
                gameover_interface();
                return;
            }
        }
    }
}
game_interface();
if (!doNothing) {
    if (a_canvas && a_canvas.getContext) {
        a_canvas.addEventListener('click', clickEvent, false);
        new FastClick.attach(document.body);
    }
}
