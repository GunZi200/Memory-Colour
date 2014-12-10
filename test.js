// computer picks x and y coordinates and stores that box in que.
// computer uses turnEvent animation on all boxex in que array
// user's turn, user hits all the boxes in the right order in que
// If not, its game over.
// user hits black button when done, and next round begins.
// computer and ANOTHER box in to que.
// computer uses turnEvent on BOTH boxex in que, in the right order.
// user follows...
//window.onload = function () {


//--------------AUTHENTICATE GAME CENTER LOGIN-------------->
document.addEventListener("deviceready", authUser, false);
var failureCallback = "Error!";
var successCallback = function (user) {
    alert(user.alias);
    var onSuccess = true;
    // user.alias, user.playerID, user.displayName
};

function authUser(){
    gamecenter.auth(successCallback, failureCallback);
    var data = {
    leaderboardId: "board1"
    };
}
//--------------------------------------------------------->
//--------------------CANVAS---------------------->
var a_canvas = document.getElementById("a");
var b_canvas = document.getElementById("b");
var ctx = a_canvas.getContext("2d");
var context = b_canvas.getContext("2d");
//------------------------------------------------>
//--------------------GLOBAL---------------------->
var x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var userTurn = false;
var blackCan = false;
var second = false;
var round = 1;
var que = [];
var reverseQue = [];
var remain = 1;
var currentremain = 1;
var lives = 3;
var ex = undefined;
var ey = undefined;
var counter = 0;
var dpr = 1;
var myMedia = new Audio("Click.mp3");
var endAudio = new Audio("GameOver.mp3");
//------------------------------------------------>
if(window.devicePixelRatio !== undefined) dpr = window.devicePixelRatio;
var scoreData = { 
        score: round = round, 
        leaderboardId: "board1"
    };
var x_canvas = a_canvas.width;//310
var y_canvas = a_canvas.height;//490
var Xf = x / x_canvas; // X fraction
var Yf = y / y_canvas; // Y fraction
function resize_canvas() {
    if (a_canvas.width < x) {
        a_canvas.width = b_canvas.width = x;
    }
    if (a_canvas.height < y) {
        a_canvas.height = b_canvas.height = y;
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
var pixels = (20 * Yf).toFixed(0);
var xc = 90 * Xf, yc = 110 * Yf;

var rects = [{x: 10 * Xf, y: 10 * Yf, w: xc, h: yc, color: 'Green'},        //Green
        {x: 110 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#DC143C'},          //Red
        {x: 10 * Xf, y: 130 * Yf, w: xc, h: yc, color: '#1E90FF'},          //Blue
        {x: 10 * Xf, y: 250 * Yf, w: xc, h: yc, color: 'Gold'},             //Gold
        {x: 110 * Xf, y: 250 * Yf, w: xc, h: yc, color: '#8B008B'},         //Purple
        {x: 210 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#DDA0DD'},          //Pink
        {x: 210 * Xf, y: 130 * Yf, w: xc, h: yc, color: '#FF8C00'},         //Orange k6
        {x: 210 * Xf, y: 250 * Yf, w: xc, h: yc, color: 'Lightseagreen'},   //Lightseagreen
        {x: 110 * Xf, y: 130 * Yf, w: xc, h: yc, color: 'Brown'}];          //Brown

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
var secondCanvas = [{x: 0, y: 0, w: x, h: y}];

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

function calculateXY(rectangle, integer, state){
    if (state) {
        var rectangleX = (rectangle.x + integer) * Xf;
        return rectangleX;
    } else {
        var rectangleY = (rectangle.y + integer) * Yf;
        return rectangleY;
    }
}

function rounded_rect(x, y, w, h, r, fillstyle, strokestyle){
    ctx.beginPath();
    ctx.fillStyle = fillstyle;
    ctx.moveTo((x + r) * Xf, y * Yf);
    ctx.lineTo((x + w - r) * Xf, y * Yf);
    ctx.quadraticCurveTo((x + w) * Xf, y * Yf, (x + w) * Xf, (y + r) * Yf);
    ctx.lineTo((x + w) * Xf, (y + h - r) * Yf);
    ctx.quadraticCurveTo((x + w) * Xf, (y + h) * Yf, (x + w - r) * Xf, (y + h) * Yf);
    ctx.lineTo((x + r) * Xf, (y + h) * Yf);
    ctx.quadraticCurveTo(x * Xf, (y + h) * Yf, x * Xf, (y + h - r) * Yf);
    ctx.lineTo(x * Xf, (y + r) * Yf);
    ctx.quadraticCurveTo(x * Xf, y * Yf, (x + r) * Xf, y * Yf);
    ctx.fill();
    ctx.lineWidth = 4*Xf;
    ctx.strokeStyle = strokestyle;
    ctx.stroke();
    ctx.closePath();
}

function heart(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(55*Xf, 455*Yf);
        ctx.lineTo(45*Xf, 465*Yf);
        ctx.lineTo(35*Xf, 455*Yf);
        ctx.lineTo(45*Xf, 445*Yf);
        ctx.fill()
        ctx.beginPath();
        ctx.arc(40*Xf, 450*Yf, 7*Xf, 2*Math.PI, 0, true);
        ctx.arc(50*Xf, 450*Yf, 7*Xf, 2*Math.PI, 0, true);
        ctx.fill();
    }

var game_interface = function drawGame() {
    var lengd = rects.length, i;
    //--------------DRAW ALL MAIN COLOURED RECTANGLES---------------------->

    for (i = 0; i < lengd; i += 1) {
        rounded_rect(rects2[i].x, rects2[i].y, 90, 110, 10, rects[i].color, 'black');
    }
    //--------------------------------------------------------------------->
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
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("3", 25 * Xf, 460 * Yf);// Number of lives to start with.
    heart();

    ctx.fillStyle = "White";
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
    ctx.fillText("Start", 185 * Xf, 460 * Yf);
};

var black_canvas = function blackBox() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Remaining: " + currentremain, 185 * Xf, 400 * Yf);
};

black_canvas2 = function blackBox2() {
        ctx.fillStyle = "Black";
        ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
        ctx.fillStyle = "White";
        ctx.font = pixels + "px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Score: " + round, 185 * Xf, 460 * Yf);
};

var black_canvas2Proceed = function proCeed() {
    remain += 1;
    counter = 0;
    blackCan = false;
    userTurn = false;
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Next round", 185 * Xf, 460 * Yf);
};

 var remainUpdate = function remainUpdate() {
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Remaining: " + remain, 185 * Xf, 400 * Yf);//k10
};

function gameover(e) {
    ex = e.offsetX;
    ey = e.offsetY;
    if (collides(consoleRects, ex, ey)) {
        setTimeout(function () {
            location.reload();
        }, 100);
    }
}

var gameover_interface = function game_over() {
    //------------SUBMIT HIGHSCORE-------------------->
    function authUser(){
        gamecenter.submitScore(successCallback, failureCallback, scoreData);
    }
    document.addEventListener("deviceready", authUser, false);
    //------------------------------------------------>
    ctx.fillStyle = "Black";
    ctx.fillRect(80 * Xf, 430 * Yf, 210 * Xf, 40 * Yf);//k11
    ctx.fillRect(80 * Xf, 370 * Yf, 210 * Xf, 40 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("0", 25 * Xf, 460 * Yf);//lives = 0
    ctx.fillText("Game over: " + round, 185 * Xf, 460 * Yf);
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", 185 * Xf, 400 * Yf);
    heart();
};

function randomInt(min, max) {
    //Calculates a random number between a 'min' and 'max' number.
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var turnEvent = function turnEvent(AnX, AnY) {
    console.time('Infunction');
    var lengd = rects.length, i,
    one30 = 10,
    one40 = 10,  
    one301 = false, 
    one401 = false,
    temp = setInterval(myAnimation, 10);
    for (i = 0; i < lengd; i += 1) {
        if (collides([rects[i]], AnX, AnY)) {
            var rightBox = rects[i];
            var rectangle = rects2[i];
        }
    }
    rounded_rect(rectangle.x, rectangle.y, 90, 110, 10, 'black', 'black');
    function myAnimation() {
        ctx.beginPath();
        ctx.fillStyle = rightBox.color;
        ctx.moveTo((rectangle.x + 43 - one40) * Xf, (rectangle.y + 33 - one30) * Yf);
        ctx.lineTo((rectangle.x + 50 + one40) * Xf, (rectangle.y + 33 - one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 33 - one30) * Yf, (rectangle.x + 58 + one30) * Xf, (rectangle.y + 43 - one40) * Yf);
        ctx.lineTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 70 + one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 78 + one30) * Yf, (rectangle.x + 50 + one40) * Xf, (rectangle.y + 78 + one30) * Yf);
        ctx.lineTo((rectangle.x + 43 - one40) * Xf, (rectangle.y + 78 + one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 33 - one30) * Xf, (rectangle.y + 78 + one30) * Yf, (rectangle.x + 33 - one30) * Xf, (rectangle.y + 70 + one40) * Yf);
        ctx.lineTo((rectangle.x + 33 - one30) * Xf, (rectangle.y + 43 - one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 33 - one30) * Xf, (rectangle.y + 33 - one30) * Yf, (rectangle.x + 43 - one40) * Xf, (rectangle.y + 33 - one30) * Yf);
        ctx.fill();
        ctx.closePath();
        if (one30 === 30) {
            one301 = true;
        } else {
            one30 += 2;
        }
        if (one40 === 40) {
            one401 = true;
        } else {
            one40 += 2;
        }
        if (one301 && one401) {
            rounded_rect(rectangle.x, rectangle.y, 90, 110, 10, null, 'black');
            console.timeEnd('Infunction');
            clearInterval(temp);
        }
    }
}

function computer() {
    a_canvas.removeEventListener('click', clickEvent, false);
    currentremain = remain; // reset values...
    var j = 0, i = setInterval(function () {
        turnEvent(que[j].x, que[j].y);  // do animation for the first object in Object, and then the next, and the next.
        myMedia.play(); //play click sound
        j += 1; // stops when counter equals the length of que.
        if (j === que.length) {
            clearInterval(i);
            userTurn = true;
            a_canvas.addEventListener('click', clickEvent, false);
        }
    }, 450);
}

function computerRe() {
    //same as computer function, but is timed faster.
    currentremain = remain;
    var j = 0, i = setInterval(function () {
        turnEvent(que[j].x, que[j].y);  // do animation for the first object in Object, and then the next, and the next.
        myMedia.play(); // play click sound
        j += 1;
        if (j === que.length) {
            clearInterval(i);
            userTurn = true;
            a_canvas.addEventListener('click', clickEvent, false);
        }
    }, 400);//faster version
}
function randomXY() {
    //chooses random coordinates for the computer.
    var minXY = 10 * Xf,// minimum coordinates in which X and Y meet first.
    maxX = 300 * Xf,    // maximum length computer reaches on the X plane.
    maxY = 360 * Yf,    // maximum length computer reaches on the Y plane.
    X = randomInt(minXY, maxX),
    Y = randomInt(minXY, maxY);
    while (!collides(rects, X, Y)) {
        // new coordinates if the other ones do not match.
        X = randomInt(minXY, maxX);
        Y = randomInt(minXY, maxY);
    }
    return { 'x': X, 'y': Y }; // OBJECT coordinates for box the computer hits next.
}

function startPlaying() {
    console.log("game started...");
    var lengd = rects.length,
    g = { 'x': 0, 'y': 0 }, i;
    if (collides(startRects, ex, ey)) { // if start button...
        black_canvas2();
        blackCan = true;
        g = randomXY(); // generate coordinates for computer.
    }
    if (blackCan && !userTurn) {
        for (i = 0; i < lengd; i += 1) {
            if (collides([rects[i]], g.x, g.y)) {
                remainUpdate();
                var boxy = rects[i];
                que.push(boxy);
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
                turnEvent(ex, ey);      //do animation
                reverseQue.shift();     //pops the first object in array.
                counter += 1; 
                currentremain -= 1;     //update number of remaining boxes for user.
                black_canvas(); 
            } else {
                a_canvas.removeEventListener('click', clickEvent, false);
                for (i = 0; i < lengd; i += 1) {
                    if (collides([rects[i]], ex, ey)) {
                        var rightBox = rects[i];
                        var rectangle = rects2[i];
                    }
                }
                //---------------DRAW A RED BORDER------------------->
                rounded_rect(rectangle.x, rectangle.y, 90, 110, 10, rightBox.color, 'red');
                //--------------------------------------------------->
                //display normal banner after 300ms.
                setTimeout(function () {
                    rounded_rect(rectangle.x, rectangle.y, 90, 110, 10, rightBox.color, 'black');
                }, 300);
                counter = 0;    //reset counter.
                lives -= 1;
                reverseQue = que.slice(0);  //reset the reverseQue.
                k13Box();
                ctx.fillStyle = "White";
                ctx.font = pixels + "px monospace";
                ctx.textAlign = "center";
                ctx.fillText(lives + "", 25 * Xf, 460 * Yf);
                heart();
                if (lives !== 0) {  //if not game over.
                    setTimeout(function () {
                        userTurn = false;   //blackCan should be false too.
                        remainUpdate();
                        computerRe();
                    }, 1000);
                }
            }
            if (!reverseQue.length) { // if it's still user's turn.
                round += 1;
                scoreData.score = round; // increase score by one.
                black_canvas2Proceed();
                return;
            }
            if (!lives) {
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
        setTimeout(function(){
            location.reload();
        }, 50);
    }
}

function secondCanvasFirst(){
    //if (collides(secondCanvas, exx, eyy)) {
    console.log("true");
    var j = 0, 
    i = setInterval(function () {
        context.globalAlpha = j;
        context.fillStyle = '#F8F8FF';
        context.fillRect(0, 0, x, y);
        j += 0.1;
        console.log(context.globalAlpha);
        if (context.globalAlpha.toFixed(0) === 1) {
            clearInterval(i);
            userTurn = true;
            b_canvas.addEventListener('click', clickEvent, false);
            alert("hi");
            second = true;
            game_interface();
        }
    }, 100);
}
var clickEvent1 = function clickEvent1(e) {
    new FastClick.attach(document.body);
    console.log("clickevent1");
    exx = e.offsetX;
    eyy = e.offsetY;
    secondCanvasFirst();
}
context.save();
context.globalAlpha = 0.7;
context.fillStyle = '#F8F8FF';
context.fillRect(0, 0, x, y);
context.globalAlpha = 1;
game_interface();
context.restore();
if (second && a_canvas && a_canvas.getContext) {
    a_canvas.addEventListener('click', clickEvent, false);
    FastClick.attach(document.body);
    Howler.iOSAutoEnable = true;
}

if (b_canvas && b_canvas.getContext) {
    b_canvas.addEventListener('click', clickEvent1, false);
    FastClick.attach(document.body);
}
