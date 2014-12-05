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

a_canvas = document.getElementById("a");
ctx = a_canvas.getContext("2d");
//----GLOBAL----
x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
userTurn = false;
blackCan = false;
round = 0;
selAudio = new Audio("SelectionSound.mp3");
myMedia = new Audio("Click.mp3");
errAudio = new Audio("WrongSound.mp3");
endAudio = new Audio("GameOver.mp3");
//--------------
que = [];
remain = 1;
currentremain = 1;
lives = 3;
ex = 0;
ey = 0;
counter = 0;

x_canvas = a_canvas.width;//310
y_canvas = a_canvas.height;//490
Xf = x/x_canvas; // X fraction
Yf = y/y_canvas; // Y fraction

function resize_canvas() {
    if (a_canvas.width < x) {
        a_canvas.width = x;
    }
    if (a_canvas.height < y) {
        a_canvas.height = y;
    } 
}
resize_canvas();
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
pixels = (20*Yf).toFixed(0)+ " px";
var xc = 90 * Xf, yc = 110 * Yf, xfin = 0, yall = 0, xk13 = 0;

var rects = [{x: 10*Xf, y: 10*Yf, w: xc, h: yc, color: 'Green'},  //Green
        {x: 110*Xf, y: 10*Yf, w: xc, h: yc, color: '#DC143C'},  //Red
        {x: 10*Xf, y: 130*Yf, w: xc, h: yc, color: "#1E90FF"},  //Blue
        {x: 10*Xf, y: 250*Yf, w: xc, h: yc, color: "Gold"},  //Gold
        {x: 110*Xf, y: 250*Yf, w: xc, h: yc, color: "#8B008B"},  //Purple
        {x: 210*Xf, y: 10*Yf, w: xc, h: yc, color: "#DDA0DD"},  //Pink
        {x: 210*Xf, y: 130*Yf, w: xc, h: yc, color: "#FF8C00"}, //Orange k6
        {x: 210*Xf, y: 250*Yf, w: xc, h: yc, color: "Lightseagreen"}, //Lightseagreen
        {x: 110*Xf, y: 130*Yf, w: xc, h: yc, color: "Brown"}];//Brown

var rects2 = [{x: 10, y: 10, w: xc, h: yc, color: 'Green'},  //Green
        {x: 110, y: 10, w: xc, h: yc, color: '#DC143C'},  //Red
        {x: 10, y: 130, w: xc, h: yc, color: "#1E90FF"},  //Blue
        {x: 10, y: 250, w: xc, h: yc, color: "Gold"},  //Gold
        {x: 110, y: 250, w: xc, h: yc, color: "#8B008B"},  //Purple
        {x: 210, y: 10, w: xc, h: yc, color: "#DDA0DD"},  //Pink
        {x: 210, y: 130, w: xc, h: yc, color: "#FF8C00"}, //Orange k6
        {x: 210, y: 250, w: xc, h: yc, color: "Lightseagreen"}, //Lightseagreen
        {x: 110, y: 130, w: xc, h: yc, color: "Brown"}];//Brown

var game_interface = function drawGame() {
    ctx.fillStyle = "Silver";
    ctx.fillRect(0, 0, x, y);
    var lengd = rects.length;
    for (var i = 0; i < lengd; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = rects[i].color;
        ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
        ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
        ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
        ctx.lineTo((rects2[i].x + 10)* Xf, (rects2[i].y + 110) * Yf);
        ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
        ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
        ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10)* Xf, rects[i].y);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    ctx.stroke();
    ctx.fillStyle = 'black';
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
    ctx.font = pixels +" Calibri";
    ctx.textAlign="center";
    ctx.fillText("3", 35*Xf, 460*Yf);// Number of lives to start with.

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
    ctx.fillText("Click to Start", 185*Xf, 460*Yf);
};

var black_canvas = function blackCanvas() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign="center";
    ctx.fillText("Round: " + round, 185*Xf, 460*Yf);
};

var continue_canvas = function continueBlack() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign="center";
    ctx.fillText("Proceed", 185*Xf, 460*Yf);
};

var remain_cavas = function newRemaining() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign="center";
    ctx.fillText("Remaining: " + remain, 185*Xf, 400*Yf);//k10
};

var currentremain_canvas = function newCurrentR() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80*Xf, 370*Yf, 210*Xf, 40*Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign="center";
    ctx.fillText("Remaining: " + currentremain, 185*Xf, 400*Yf);
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
    ctx.fillStyle = "Black";
    ctx.fillRect(80*Xf, 430*Yf, 210*Xf, 40*Yf);//k11
    ctx.fillRect(80*Xf, 370*Yf, 210*Xf, 40*Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign="center";
    ctx.fillText("0", 35*Xf, 460*Yf);//lives = 0
    ctx.fillText("Game over: " + round, 185*Xf, 460*Yf);
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", 185*Xf, 400*Yf);
};

var consoleRects = [{x: 10*Xf, y: 370*Yf, w: 50*Xf, h: 50*Yf}];//k12
var startRects = [{x: 70*Xf, y: 430*Yf, w: 230*Xf, h: 50*Yf}];//k11

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function collides(rects2, x, y) {
    var isCollision = false;
    var i = 0;
    var lengd = 0;
    var left = 0;
    var right = 0;
    var top = 0;
    var bottom = 0;
    var rects2lengd = rects2.length;
    for (i = 0, lengd = rects2lengd; i < lengd; i += 1) {
        left = rects2[i].x, right = rects2[i].x + rects2[i].w, top = rects2[i].y, bottom = rects2[i].y + rects2[i].h;
        if (right >= x && left <= x && bottom >= y && top <= y) { isCollision = rects2[i]; }
    }
    return isCollision;
}

function turnEvent(AnX, AnY) {
    var xw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var yw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    var lengd = rects.length;
    for (var i = 0; i < lengd; i += 1) {
        if (collides([rects[i]], AnX, AnY)) {
            var rightBox = rects2[i];
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
            ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
            ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
            ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
            ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
            ctx.lineTo((rects2[i].x + 10)* Xf, (rects2[i].y + 110) * Yf);
            ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
            ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
            ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10)* Xf, rects[i].y);
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    var one30 = 3;
    var one40 = 4;
    var thirty = 33;
    var forty = 43;
    var fifty = 50;
    var sixty = 58;
    var seventy = 70;
    var eigthy = 78;
    var one301 = 1;
    var one401 = 1;
    var temp_var = setInterval(function myAnimation() {
        ctx.beginPath();
        ctx.fillStyle = rightBox.color;
        ctx.moveTo((rightBox.x + forty - one40) * Xf, (rightBox.y + thirty - one30) * Yf);
        ctx.lineTo((rightBox.x + fifty + one40) * Xf, (rightBox.y + thirty - one30) * Yf);
        ctx.quadraticCurveTo((rightBox.x + sixty + one30) * Xf, (rightBox.y + thirty - one30) * Yf, (rightBox.x + sixty + one30) * Xf, (rightBox.y + forty - one40) * Yf);
        ctx.lineTo((rightBox.x + sixty + one30) * Xf, (rightBox.y + seventy + one40) * Yf);
        ctx.quadraticCurveTo((rightBox.x + sixty + one30) * Xf, (rightBox.y + eigthy + one30) * Yf, (rightBox.x + fifty + one40) * Xf, (rightBox.y + eigthy + one30) * Yf);
        ctx.lineTo((rightBox.x + forty - one40)* Xf, (rightBox.y + eigthy + one30) * Yf);
        ctx.quadraticCurveTo((rightBox.x + thirty - one30) * Xf, (rightBox.y + eigthy + one30) * Yf, (rightBox.x + thirty - one30) * Xf, (rightBox.y + seventy + one40) * Yf);
        ctx.lineTo((rightBox.x + thirty - one30) * Xf, (rightBox.y + forty - one40) * Yf);
        ctx.quadraticCurveTo((rightBox.x + thirty - one30) * Xf, (rightBox.y + thirty - one30) * Yf, (rightBox.x + forty - one40) * Xf, (rightBox.y + thirty - one30) * Yf);
        ctx.fill();
        if (one30 === 30) {
            one30 += 0;
            one301 = 0;
        } else {
            one30 += 3;
        }
        if (one40 === 40) {
            one40 += 0;
            one401 = 0;
        } else {
            one40 += 4;
        }
        if (one301 === 0 && one401 === 0) {
            var lengd = rects.length;
            for (var i = 0; i < lengd; i += 1) {
                if (collides([rects[i]], AnX, AnY)) {
                    ctx.beginPath();
                    ctx.fillStyle = rects2[i].color;
                    ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
                    ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
                    ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
                    ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
                    ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
                    ctx.lineTo((rects2[i].x + 10)* Xf, (rects2[i].y + 110) * Yf);
                    ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
                    ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
                    ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10)* Xf, rects[i].y);
                    ctx.fill();
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                }
            }
            clearInterval(temp_var);
        }
    },800/60);
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
    var j = 0;
    var i = setInterval(function () {
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
    X = randomInt(minXY, maxX);
    Y = randomInt(minXY, maxY);
    while (!collides(rects, X, Y)) {
        X = randomInt(minXY, maxX);
        Y = randomInt(minXY, maxY);
    }
    return { 'x': X, 'y': Y }; // OBJECT coordinates for box the computer hits next.
}

function startPlaying() {
    var boxX = collides(rects, ex, ey).x;
    var boxY = collides(rects, ex, ey).y;
    var lengd = rects.length;
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
        for (i = 0; i < lengd; i += 1) {
            if (collides([rects[i]], g.x, g.y)) {
                que.push(rects[i]);
                reverseQue = [];
                reverseQue = que.slice(0);
                blackCan = false;
                computer();
            }
        }
    } else if (userTurn) { // user's turn
        //If a box is clicked
        if (collides(rects, ex, ey)) {
            //if clicked n box is the same as n box from computer.
            if (collides(rects, ex, ey) === que[counter]) { //if tveir litir eru tvisvar í röð.
                turnEvent(ex, ey);//do animation
                reverseQue.shift();//pops the first object in array.
                counter += 1, currentremain -= 1;
                currentremain_canvas();//update number of remaining boxes for user.
            } else if (collides(rects, ex, ey) !== que[counter]) {
                a_canvas.removeEventListener('click', clickEvent, false);
                errAudio.play();
                //display red color banner.
                var lengd = rects.length;
                for (var i = 0; i < lengd; i += 1) {
                    if (collides([rects[i]], ex, ey)) {
                        ctx.beginPath();
                        ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
                        ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
                        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
                        ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
                        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
                        ctx.lineTo((rects2[i].x + 10)* Xf, (rects2[i].y + 110) * Yf);
                        ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
                        ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
                        ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10)* Xf, rects[i].y);
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = 'red';
                        ctx.stroke();
                    }
                }
                //display normal banner after 300ms.
                setTimeout(function(){
                    //var lengd = rects.length;
                    for (var i = 0; i < lengd; i += 1) {
                        if (collides([rects[i]], ex, ey)) {
                            ctx.beginPath();
                            ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
                            ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
                            ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
                            ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
                            ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
                            ctx.lineTo((rects2[i].x + 10)* Xf, (rects2[i].y + 110) * Yf);
                            ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
                            ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
                            ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10)* Xf, rects[i].y);
                            ctx.lineWidth = 4;
                            ctx.strokeStyle = 'black';
                            ctx.stroke();
                        }
                    }
                },300);
                //reset counter.
                counter = 0, lives -= 1;
                //reset the reverseQue.
                reverseQue = que.slice(0);
                k13Box();
                ctx.fillStyle = "White";
                ctx.font = pixels + " Arial";
                ctx.textAlign="center";
                ctx.fillText("" + lives, 35*Xf, 460*Yf);
                //if not game over.
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
                if (round > 0) {
                    round += 1;
                };
                remain += 1;
                continue_canvas();
                return;
            } 
            if (lives === 0) {
                setTimeout(function(){
                    endAudio.play();
                }, 800);
                gameover_interface();
                return;
            }
        }
    }
}
game_interface();
if (a_canvas && a_canvas.getContext) {
    a_canvas.addEventListener('click', clickEvent, false);
    new FastClick.attach(document.body);
}
