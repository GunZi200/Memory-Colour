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
};

var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");
//----GLOBAL----
var x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var userTurn = false;
var blackCan = false;
var round = 0;
var selAudio = new Audio("SelectionSound.mp3");
var myMedia = new Audio("Click.mp3");
var errAudio = new Audio("WrongSound.mp3");
var endAudio = new Audio("GameOver.mp3");
//--------------
var que = [];
var reverseQue = [];
var remain = 1;
var currentremain = 1;
var lives = 3;
var ex = 0;
var ey = 0;
var counter = 0;

var x_canvas = a_canvas.width;//310
var y_canvas = a_canvas.height;//490
var Xf = x / x_canvas; // X fraction
var Yf = y / y_canvas; // Y fraction

function resize_canvas() {
    if (a_canvas.width < x) {
        a_canvas.width = x;
    }
    if (a_canvas.height < y) {
        a_canvas.height = y;
    }
}
resize_canvas();
var k13Box = function drawK13() {
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(20 * Xf, 430 * Yf);
    ctx.lineTo(50 * Xf, 430 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 430 * Yf, 60 * Xf, 440 * Yf);
    ctx.lineTo(60 * Xf, 470 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 480 * Yf, 50 * Xf, 480 * Yf);
    ctx.lineTo(20 * Xf, 480 * Yf);
    ctx.quadraticCurveTo(10 * Xf, 480 * Yf, 10 * Xf, 470 * Yf);
    ctx.lineTo(10 * Xf, 440 * Yf);
    ctx.quadraticCurveTo(10 * Xf, 430 * Yf, 20 * Xf, 430 * Yf);
    ctx.fill();
};
var pixels = (20 * Yf).toFixed(0) + " px";
var xc = 90 * Xf, yc = 110 * Yf;

var rects = [{x: 10 * Xf, y: 10 * Yf, w: xc, h: yc, color: 'Green'},        //Green
        {x: 110 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#DC143C'},          //Red
        {x: 10 * Xf, y: 130 * Yf, w: xc, h: yc, color: "#1E90FF"},          //Blue
        {x: 10 * Xf, y: 250 * Yf, w: xc, h: yc, color: "Gold"},             //Gold
        {x: 110 * Xf, y: 250 * Yf, w: xc, h: yc, color: "#8B008B"},         //Purple
        {x: 210 * Xf, y: 10 * Yf, w: xc, h: yc, color: "#DDA0DD"},          //Pink
        {x: 210 * Xf, y: 130 * Yf, w: xc, h: yc, color: "#FF8C00"},         //Orange k6
        {x: 210 * Xf, y: 250 * Yf, w: xc, h: yc, color: "Lightseagreen"},   //Lightseagreen
        {x: 110 * Xf, y: 130 * Yf, w: xc, h: yc, color: "Brown"}];          //Brown

var rects2 = [{x: 10, y: 10},   //Green
        {x: 110, y: 10},        //Red
        {x: 10, y: 130},        //Blue
        {x: 10, y: 250},        //Gold
        {x: 110, y: 250},       //Purple
        {x: 210, y: 10},        //Pink
        {x: 210, y: 130},       //Orange k6
        {x: 210, y: 250},       //Lightseagreen
        {x: 110, y: 130}];      //Brown

var consoleRects = [{x: 10 * Xf, y: 370 * Yf, w: 50 * Xf, h: 50 * Yf}];//k12
var startRects = [{x: 70 * Xf, y: 430 * Yf, w: 230 * Xf, h: 50 * Yf}];//k11

function collides(rect, x, y) {
    var isCollision = false, i = 0, left = 0, right = 0, top = 0, bottom = 0, lengd = rect.length;
    for (i = 0; i < lengd; i += 1) {
        left = rect[i].x;
        right = rect[i].x + rect[i].w;
        top = rect[i].y;
        bottom = rect[i].y + rect[i].h;
        if (right >= x && left <= x && bottom >= y && top <= y) {
            isCollision = rect[i];
        }
    }
    return isCollision;
}

var game_interface = function drawGame() {
    var lengd = rects.length, i;
    ctx.fillStyle = "Silver";
    ctx.fillRect(0, 0, x, y);
    for (i = 0; i < lengd; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = rects[i].color;
        ctx.moveTo((rects2[i].x + 10) * Xf, rects[i].y);
        ctx.lineTo((rects2[i].x + 80) * Xf, rects[i].y);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects[i].y, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
        ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 100) * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 80) * Xf, (rects2[i].y + 110) * Yf);
        ctx.lineTo((rects2[i].x + 10) * Xf, (rects2[i].y + 110) * Yf);
        ctx.quadraticCurveTo(rects[i].x, (rects2[i].y + 110) * Yf, rects[i].x, (rects2[i].y + 100) * Yf);
        ctx.lineTo(rects[i].x, (rects2[i].y + 10) * Yf);
        ctx.quadraticCurveTo(rects[i].x, rects[i].y, (rects2[i].x + 10) * Xf, rects[i].y);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    ctx.fillStyle = 'black';
    //------------------K10-----------------
    ctx.beginPath();
    ctx.moveTo(80 * Xf, 370 * Yf);
    ctx.lineTo(290 * Xf, 370 * Yf);
    ctx.quadraticCurveTo(300 * Xf, 370 * Yf, 300 * Xf, 380 * Yf);
    ctx.lineTo(300 * Xf, 410 * Yf);
    ctx.quadraticCurveTo(300 * Xf, 420 * Yf, 290 * Xf, 420 * Yf);
    ctx.lineTo(80 * Xf, 420 * Yf);
    ctx.quadraticCurveTo(70 * Xf, 420 * Yf, 70 * Xf, 410 * Yf);
    ctx.lineTo(70 * Xf, 380 * Yf);
    ctx.quadraticCurveTo(70 * Xf, 370 * Yf, 80 * Xf, 370 * Yf);
    ctx.fill();
    //--------------------------------------
    //------------------K11-----------------
    ctx.beginPath();
    ctx.moveTo(80 * Xf, 430 * Yf);
    ctx.lineTo(290 * Xf, 430 * Yf);
    ctx.quadraticCurveTo(300 * Xf, 430 * Yf, 300 * Xf, 440 * Yf);
    ctx.lineTo(300 * Xf, 470 * Yf);
    ctx.quadraticCurveTo(300 * Xf, 480 * Yf, 290 * Xf, 480 * Yf);
    ctx.lineTo(80 * Xf, 480 * Yf);
    ctx.quadraticCurveTo(70 * Xf, 480 * Yf, 70 * Xf, 470 * Yf);
    ctx.lineTo(70 * Xf, 440 * Yf);
    ctx.quadraticCurveTo(70 * Xf, 430 * Yf, 80 * Xf, 430 * Yf);
    ctx.fill();
    //--------------------------------------
    //----------------K12-------------------
    ctx.beginPath();
    ctx.moveTo(20 * Xf, 370 * Yf);
    ctx.lineTo(50 * Xf, 370 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 370 * Yf, 60 * Xf, 380 * Yf);
    ctx.lineTo(60 * Xf, 410 * Yf);
    ctx.quadraticCurveTo(60 * Xf, 420 * Yf, 50 * Xf, 420 * Yf);
    ctx.lineTo(20 * Xf, 420 * Yf);
    ctx.quadraticCurveTo(10 * Xf, 420 * Yf, 10 * Xf, 410 * Yf);
    ctx.lineTo(10 * Xf, 380 * Yf);
    ctx.quadraticCurveTo(10 * Xf, 370 * Yf, 20 * Xf, 370 * Yf);
    ctx.fill();
    //--------------------------------------
    k13Box();

    ctx.fillStyle = "White";
    ctx.font = pixels + " Arial";
    ctx.textAlign = "center";
    ctx.fillText("3", 35 * Xf, 460 * Yf);// Number of lives to start with.

    ctx.beginPath();
    ctx.arc(35 * Xf, 395 * Yf, 20 * Xf, (5 * Math.PI) / 4, (Math.PI), false);
    ctx.lineWidth = 3 * Xf;
    ctx.strokeStyle = "White";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15 * Xf, 385 * Yf);
    ctx.lineTo(11 * Xf, 395 * Yf);
    ctx.lineTo(20 * Xf, 395 * Yf);
    ctx.fill();
    ctx.fillText("Click to Start", 185 * Xf, 460 * Yf);
};

var black_canvas = function blackBox() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Remaining: " + currentremain, 185 * Xf, 400 * Yf);
};

black_canvas2 = function blackBox2() {
        ctx.fillStyle = "Black";
        ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
        ctx.fillStyle = "White";
        ctx.font = pixels + " px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Round: " + round, 185 * Xf, 460 * Yf);
};

var black_canvas2Proceed = function proCeed() {
    remain += 1;
    counter = 0;
    blackCan = false;
    userTurn = false;
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Proceed", 185 * Xf, 460 * Yf);
};

function gameover(e) {
    ex = e.offsetX;
    ey = e.offsetY;
    if (collides(consoleRects, ex, ey)) {
        selAudio.play();
        setTimeout(function () {
            location.reload();
        }, 100);
    }
}

var gameover_interface = function game_over() {
    k13Box();
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign = "center";
    ctx.fillText("0", 35 * Xf, 460 * Yf);//lives = 0
    ctx.fillText("Game over: " + round, 185 * Xf, 460 * Yf);
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", 185 * Xf, 400 * Yf);
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function loopALoop() {
    var lengd = rects.length, i;
    for (i = 0; i < lengd; i += 1) {
        if (collides([rects[i]], ex, ey)) {
            var rightBox = rects[i];
            var rectangle = rects2[i];
        }
    }
    ctx.beginPath();
    ctx.moveTo((rectangle.x + 10) * Xf, rightBox.y);
    ctx.lineTo((rectangle.x + 80) * Xf, rightBox.y);
    ctx.quadraticCurveTo((rectangle.x + 90) * Xf, rightBox.y, (rectangle.x + 90) * Xf, (rectangle.y + 10) * Yf);
    ctx.lineTo((rectangle.x + 90) * Xf, (rectangle.y + 100) * Yf);
    ctx.quadraticCurveTo((rectangle.x + 90) * Xf, (rectangle.y + 110) * Yf, (rectangle.x + 80) * Xf, (rectangle.y + 110) * Yf);
    ctx.lineTo((rectangle.x + 10) * Xf, (rectangle.y + 110) * Yf);
    ctx.quadraticCurveTo(rightBox.x, (rectangle.y + 110) * Yf, rightBox.x, (rectangle.y + 100) * Yf);
    ctx.lineTo(rightBox.x, (rectangle.y + 10) * Yf);
    ctx.quadraticCurveTo(rightBox.x, rightBox.y, (rectangle.x + 10) * Xf, rightBox.y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
function turnEvent(AnX, AnY) {
    var lengd = rects.length, i, one30 = 3, one40 = 4, thirty = 33, forty = 43, fifty = 50, sixty = 58, seventy = 70, eigthy = 78, one301 = 1, one401 = 1, temp = setInterval(myAnimation, 800 / 60);
    for (var i = 0; i < lengd; i += 1) {
        if (collides([rects[i]], AnX, AnY)) {
            var rightBox = rects[i];
            var rectangle = rects2[i];
        }
    }
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo((rectangle.x + 10) * Xf, rightBox.y);
    ctx.lineTo((rectangle.x + 80) * Xf, rightBox.y);
    ctx.quadraticCurveTo((rectangle.x + 90) * Xf, rightBox.y, (rectangle.x + 90) * Xf, (rectangle.y + 10) * Yf);
    ctx.lineTo((rectangle.x + 90) * Xf, (rectangle.y + 100) * Yf);
    ctx.quadraticCurveTo((rectangle.x + 90) * Xf, (rectangle.y + 110) * Yf, (rectangle.x + 80) * Xf, (rectangle.y + 110) * Yf);
    ctx.lineTo((rectangle.x + 10) * Xf, (rectangle.y + 110) * Yf);
    ctx.quadraticCurveTo(rightBox.x, (rectangle.y + 110) * Yf, rightBox.x, (rectangle.y + 100) * Yf);
    ctx.lineTo(rightBox.x, (rectangle.y + 10) * Yf);
    ctx.quadraticCurveTo(rightBox.x, rightBox.y, (rectangle.x + 10) * Xf, rightBox.y);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    function myAnimation() {
        ctx.beginPath();
        ctx.fillStyle = rightBox.color;
        ctx.moveTo((rectangle.x + forty - one40) * Xf, (rectangle.y + thirty - one30) * Yf);
        ctx.lineTo((rectangle.x + fifty + one40) * Xf, (rectangle.y + thirty - one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + sixty + one30) * Xf, (rectangle.y + thirty - one30) * Yf, (rectangle.x + sixty + one30) * Xf, (rectangle.y + forty - one40) * Yf);
        ctx.lineTo((rectangle.x + sixty + one30) * Xf, (rectangle.y + seventy + one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + sixty + one30) * Xf, (rectangle.y + eigthy + one30) * Yf, (rectangle.x + fifty + one40) * Xf, (rectangle.y + eigthy + one30) * Yf);
        ctx.lineTo((rectangle.x + forty - one40) * Xf, (rectangle.y + eigthy + one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + thirty - one30) * Xf, (rectangle.y + eigthy + one30) * Yf, (rectangle.x + thirty - one30) * Xf, (rectangle.y + seventy + one40) * Yf);
        ctx.lineTo((rectangle.x + thirty - one30) * Xf, (rectangle.y + forty - one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + thirty - one30) * Xf, (rectangle.y + thirty - one30) * Yf, (rectangle.x + forty - one40) * Xf, (rectangle.y + thirty - one30) * Yf);
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
            ctx.beginPath();
            ctx.fillStyle = rightBox.color;
            ctx.moveTo((rectangle.x + 10) * Xf, rightBox.y);
            ctx.lineTo((rectangle.x + 80) * Xf, rightBox.y);
            ctx.quadraticCurveTo((rectangle.x + 90) * Xf, rightBox.y, (rectangle.x + 90) * Xf, (rectangle.y + 10) * Yf);
            ctx.lineTo((rectangle.x + 90) * Xf, (rectangle.y + 100) * Yf);
            ctx.quadraticCurveTo((rectangle.x + 90) * Xf, (rectangle.y + 110) * Yf, (rectangle.x + 80) * Xf, (rectangle.y + 110) * Yf);
            ctx.lineTo((rectangle.x + 10) * Xf, (rectangle.y + 110) * Yf);
            ctx.quadraticCurveTo(rightBox.x, (rectangle.y + 110) * Yf, rightBox.x, (rectangle.y + 100) * Yf);
            ctx.lineTo(rightBox.x, (rectangle.y + 10) * Yf);
            ctx.quadraticCurveTo(rightBox.x, rightBox.y, (rectangle.x + 10) * Xf, rightBox.y);
            ctx.fill();
            ctx.lineWidth = 4;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            clearInterval(temp);
        }
    }
}

function computer() {
    a_canvas.removeEventListener('click', clickEvent, false);
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Remaining: " + remain, 185 * Xf, 400 * Yf);//k10
    currentremain = remain; // reset values...
    var j = 0, i = setInterval(function () {
        //do animation for the first object in Object, and then the next, and the next.
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
    //same as computer function, but is timed faster.
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + " px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Remaining: " + remain, 185 * Xf, 400 * Yf);//k10
    currentremain = remain;
    var j = 0, i = setInterval(function () {
        turnEvent(que[j].x, que[j].y);
        myMedia.play();
        j += 1;
        if (j === que.length) {
            clearInterval(i);
            a_canvas.addEventListener('click', clickEvent, false);
            userTurn = true;
        }
    }, 400);//faster version
}
function randomXY() {
    //chooses random coordinates for the computer.
    var minXY = 10 * Xf, maxX = 300 * Xf, maxY = 360 * Yf, X = randomInt(minXY, maxX), Y = randomInt(minXY, maxY);
    while (!collides(rects, X, Y)) {
        // new coordinates if the other ones do not match.
        X = randomInt(minXY, maxX);
        Y = randomInt(minXY, maxY);
    }
    return { 'x': X, 'y': Y }; // OBJECT coordinates for box the computer hits next.
}

function startPlaying() {
    var lengd = rects.length, g = { 'x': 0, 'y': 0 }, i;
    if (collides(startRects, ex, ey)) {
        if (round < 1) {
            selAudio.play();//start game
            round += 1;
        }
        black_canvas2();
        blackCan = true;
        g = randomXY();
    }
    if (blackCan && !userTurn) {
        for (i = 0; i < lengd; i += 1) {
            if (collides([rects[i]], g.x, g.y)) {
                var boxy = rects[i];
                que.push(boxy);
                reverseQue = [];
                reverseQue = que.slice(0);
                blackCan = false;
                computer();
            }
        }
    } else if (userTurn) {
        //If a box is clicked
        if (collides(rects, ex, ey)) {
            //if clicked n box is the same as n box from computer.
            if (collides(rects, ex, ey) === que[counter]) {
                //turnEvent(ex, ey);      //do animation
                console.time('turnEvent');
                turnEvent(ex, ey); // run whatever needs to be timed in between the statements
                console.timeEnd('turnEvent');
                //turnEvent1(ex, ey);
                reverseQue.shift();     //pops the first object in array.
                counter += 1; 
                currentremain -= 1;     //update number of remaining boxes for user.
                black_canvas(); 
            } else {
                a_canvas.removeEventListener('click', clickEvent, false);
                errAudio.play();
                for (i = 0; i < lengd; i += 1) {
                    if (collides([rects[i]], ex, ey)) {
                        var rightBox = rects[i];
                        var rectangle = rects2[i];
                    }
                }
                ctx.beginPath();
                ctx.moveTo((rectangle.x + 10) * Xf, rightBox.y);
                ctx.lineTo((rectangle.x + 80) * Xf, rightBox.y);
                ctx.quadraticCurveTo((rectangle.x + 90) * Xf, rightBox.y, (rectangle.x + 90) * Xf, (rectangle.y + 10) * Yf);
                ctx.lineTo((rectangle.x + 90) * Xf, (rectangle.y + 100) * Yf);
                ctx.quadraticCurveTo((rectangle.x + 90) * Xf, (rectangle.y + 110) * Yf, (rectangle.x + 80) * Xf, (rectangle.y + 110) * Yf);
                ctx.lineTo((rectangle.x + 10) * Xf, (rectangle.y + 110) * Yf);
                ctx.quadraticCurveTo(rightBox.x, (rectangle.y + 110) * Yf, rightBox.x, (rectangle.y + 100) * Yf);
                ctx.lineTo(rightBox.x, (rectangle.y + 10) * Yf);
                ctx.quadraticCurveTo(rightBox.x, rightBox.y, (rectangle.x + 10) * Xf, rightBox.y);
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'red';
                ctx.stroke();
                //display normal banner after 300ms.
                setTimeout(loopALoop, 300);
                counter = 0;    //reset counter.
                lives -= 1;
                reverseQue = que.slice(0);  //reset the reverseQue.
                k13Box();
                ctx.fillStyle = "White";
                ctx.font = pixels + " Arial";
                ctx.textAlign = "center";
                ctx.fillText(lives + "", 35 * Xf, 460 * Yf);
                if (lives !== 0) {  //if not game over.
                    setTimeout(function () {
                        userTurn = false;   //blackCan should be false too.
                        computerRe();
                    }, 1000);
                }
            }
            if (reverseQue.length === 0) {
                if (round > 0) {
                    round += 1;
                }
                black_canvas2Proceed();
                return;
            }
            if (lives === 0) {
                setTimeout(function () {
                    endAudio.play();
                }, 800);
                gameover_interface();
                return;
            }
        }
    }
}

var clickEvent = function clickEvent(e) {
    new FastClick.attach(document.body);
    ex = e.offsetX;
    ey = e.offsetY;
    startPlaying();
    if (collides(consoleRects, ex, ey)) {
        selAudio.play();
        setTimeout(function(){
            location.reload();
        }, 50);
    }
}

game_interface();
if (a_canvas && a_canvas.getContext) {
    a_canvas.addEventListener('click', clickEvent, false);
    FastClick.attach(document.body);
}
