// computer picks x and y coordinates and stores that box in que.
// computer uses turnEvent animation on all boxex in que array
// user's turn, user hits all the boxes in the right order in que
// If not, its game over.
// user hits black button when done, and next round begins.
// computer and ANOTHER box in to que.
// computer uses turnEvent on BOTH boxex in que, in the right order.
// user follows...
/*window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}*/
//--------------AUTHENTICATE GAME CENTER LOGIN-------------->
document.addEventListener("deviceready", authUser, false);
var failureCallback = "Error!";
var successCallback = function (user) {
    var onSuccess = true;
    // user.alias, user.playerID, user.displayName
};

function authUser(){
    gamecenter.auth(successCallback, failureCallback);
    var data = {
    leaderboardId: "board1"
    };
}
document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
//--------------------------------------------------------->
//--------------------CANVAS---------------------->
var a_canvas = document.getElementById("a");
var ctx = a_canvas.getContext("2d");
//------------------------------------------------>
//--------------------GLOBAL---------------------->
var x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/**devicePixelRatio*/;
var y = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)/**devicePixelRatio*/;
var userTurn = false;
var blackCan = false;
var second = false;
var round = 1;
var colours = 0;
var que = [];
var reverseQue = [];
var remain = 1;
var currentremain;
var lives = 3;
var ex = undefined;
var ey = undefined;
var counter = 0;
var myMedia = new Audio("Click.mp3");
var endAudio = new Audio("GameOver.mp3");
var roundDone = new Audio("CorrectSound.mp3");
//------------------------------------------------>
var scoreData = { 
        score: round = round, 
        leaderboardId: "board1"
    };
var colourNumberData = { 
        score: colours = colours, 
        leaderboardId: "board2"
    };

var x_canvas = a_canvas.width;//310
var y_canvas = a_canvas.height;//490
var Xf = (x / x_canvas); // X fraction
var Yf = (y / y_canvas); // Y fraction

function resize_canvas() {
    if (a_canvas.width < x) {
        a_canvas.width = x;
    }
    if (a_canvas.height < y) {
        a_canvas.height = y;
    }
}
resize_canvas();
function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    //apply the old canvas to the new one
    //context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}

function enhanceContext(canvas, context) {
    var ratio = window.devicePixelRatio || 1,
        width = canvas.width,
        height = canvas.height;

    if (ratio > 1) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.scale(ratio, ratio);
    }
}
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var pixels = (20 * Yf).toFixed(0);
var xc = 90 * Xf, yc = 110 * Yf;
//-------------------RECTANGLES THAT USE CLICKEVENY-------------->
var rects = [{x: 10 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#26A65B'},        //Green
        {x: 110 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#F22613'},          //Red
        {x: 10 * Xf, y: 130 * Yf, w: xc, h: yc, color: '#1E90FF'},          //Blue
        {x: 10 * Xf, y: 250 * Yf, w: xc, h: yc, color: '#F7CA18'},             //Gold
        {x: 110 * Xf, y: 250 * Yf, w: xc, h: yc, color: '#8E44AD'},         //Purple
        {x: 210 * Xf, y: 10 * Yf, w: xc, h: yc, color: '#DDA0DD'},          //Pink
        {x: 210 * Xf, y: 130 * Yf, w: xc, h: yc, color: '#FF8C00'},         //Orange k6
        {x: 210 * Xf, y: 250 * Yf, w: xc, h: yc, color: '#36D7B7'},   //Lightseagreen
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
//---------------------------------------------------------------->

function collides(rect, x, y) {
    // check if a click/tap x, y coordiantes 'collide' with a rectangle in use.
    var isCollision = false, left = 0, right = 0, top = 0, bottom = 0, lengd = rect.length;
    for (var i = 0; i < lengd; i += 1) {
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
    ctx.lineWidth = 3*Xf;
    ctx.strokeStyle = strokestyle;
    ctx.stroke();
    ctx.closePath();
}
//--------------------DRAWINGS TO CACHE--------------->
function blackBox2(canvas) {
    canvas.fillStyle = "Black";
    canvas.fillRect(90*Xf, 440*Yf, 200 * Xf, 30 * Yf);//k10
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Round: ", 185 * Xf, 460 * Yf);
};

function proCeed(canvas) {
    canvas.fillStyle = "Black";
    canvas.fillRect(90 * Xf, 440 * Yf, 200 * Xf, 30 * Yf);
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Next round", 185 * Xf, 460 * Yf);
};

function remainUpdate(canvas) {
    canvas.fillStyle = 'black'
    ctx.fillRect(90 * Xf, 380 * Yf, 200 * Xf, 30 * Yf);//k10
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Progress", 155*Xf, 400 * Yf);
    canvas.beginPath();
    canvas.moveTo(270*Xf, 380*Yf);
    canvas.lineTo(280*Xf, 380*Yf);
    canvas.quadraticCurveTo(290*Xf, 380*Yf, 290*Xf, 390*Yf);
    canvas.lineTo(290*Xf, 400*Yf);
    canvas.quadraticCurveTo(290*Xf, 410*Yf, 280*Xf, 410*Yf);
    canvas.lineTo(270*Xf, 410*Yf);
    canvas.quadraticCurveTo(260*Xf,410*Yf, 260*Xf, 400*Yf);
    canvas.lineTo(260*Xf, 390*Yf);
    canvas.quadraticCurveTo(260*Xf, 380*Yf, 270*Xf, 380*Yf);
    canvas.fill();
    canvas.closePath();
    canvas.beginPath();
    canvas.moveTo(230*Xf, 380*Yf);
    canvas.lineTo(240*Xf, 380*Yf);
    canvas.quadraticCurveTo(250*Xf, 380*Yf, 250*Xf, 390*Yf);
    canvas.lineTo(250*Xf, 400*Yf);
    canvas.quadraticCurveTo(250*Xf, 410*Yf, 240*Xf, 410*Yf);
    canvas.lineTo(230*Xf,410*Yf);
    canvas.quadraticCurveTo(220*Xf,410*Yf, 220*Xf, 400*Yf);
    canvas.lineTo(220*Xf, 390*Yf);
    canvas.quadraticCurveTo(220*Xf, 380*Yf, 230*Xf, 380*Yf);
    canvas.fill();
    canvas.closePath();
};

function drawK13(ctx) {
    console.log("hi");
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
    ctx.lineWidth = 3*Xf;
    ctx.strokeStyle = 'silver';
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(52*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 465*Yf);
    ctx.lineTo(32*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 447*Yf);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(37*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.arc(47*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.fill();
    ctx.closePath();
};

function drawBoxes(ctx) { 
    var lengd = rects.length, i;
    for (i = 0; i < lengd; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = rects[i].color;
        ctx.moveTo((rects2[i].x + 10) * Xf, rects2[i].y * Yf);
        ctx.lineTo((rects2[i].x + 90 - 10) * Xf, rects2[i].y * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, rects2[i].y * Yf, (rects2[i].x + 90) * Xf, (rects2[i].y + 10) * Yf);
        ctx.lineTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110 - 10) * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 90) * Xf, (rects2[i].y + 110) * Yf, (rects2[i].x + 90 - 10) * Xf, (rects2[i].y + 110) * Yf);
        ctx.lineTo((rects2[i].x + 10) * Xf, (rects2[i].y + 110) * Yf);
        ctx.quadraticCurveTo(rects2[i].x * Xf, (rects2[i].y + 110) * Yf, rects2[i].x * Xf, (rects2[i].y + 110 - 10) * Yf);
        ctx.lineTo(rects2[i].x * Xf, (rects2[i].y + 10) * Yf);
        ctx.quadraticCurveTo(rects2[i].x * Xf, rects2[i].y * Yf, (rects2[i].x + 10) * Xf, rects2[i].y * Yf);
        ctx.fill();
        ctx.lineWidth = 3*Xf;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
        //rounded_rect(rects2[i].x, rects2[i].y, 90, 110, 10, rects[i].color, 'black');
    }
}
//-------------------------------------------------------->
var cacheCanvas = cloneCanvas(a_canvas); // newCanvas
var cacheCtx = cacheCanvas.getContext('2d');// context

//--------------CACHE DRAWINGS----------->
drawBoxes(cacheCtx);
//--------------------------------------->


var game_interface = function drawGame() {
    var lengd = rects.length, i;
    //--------------DRAW ALL MAIN COLOURED RECTANGLES---------------------->

    for (i = 0; i < lengd; i += 1) {
        rounded_rect(rects2[i].x, rects2[i].y, 90, 110, 10, rects[i].color, 'black');
    }
    //--------------------------------------------------------------------->
    ctx.fillStyle = 'black';
    //------------------K10-----------------
    rounded_rect(70, 370, 230, 50, 10, null, 'silver');
    //--------------------------------------
    //------------------K11-----------------
    rounded_rect(70, 430, 230, 50, 10, null, 'silver');
    //--------------------------------------
    //----------------K12-------------------
    rounded_rect(10, 370, 50, 50, 10, null, 'silver');
    //--------------------------------------
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
    ctx.lineWidth = 3*Xf;
    ctx.strokeStyle = 'silver';
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(52*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 465*Yf);
    ctx.lineTo(32*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 447*Yf);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(37*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.arc(47*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("3", 25 * Xf, 460 * Yf);// Number of lives to start with.
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
        gamecenter.submitScore(successCallback, failureCallback, colourNumberData);

    }
    document.addEventListener("deviceready", authUser, false);
    //------------------------------------------------>
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
    ctx.lineWidth = 3*Xf;
    ctx.strokeStyle = 'silver';
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(52*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 465*Yf);
    ctx.lineTo(32*Xf, 455*Yf);
    ctx.lineTo(42*Xf, 447*Yf);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(37*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.arc(47*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "Black";
    ctx.fillRect(90 * Xf, 440 * Yf, 200 * Xf, 30 * Yf);//k10
    ctx.fillRect(90 * Xf, 380 * Yf, 200 * Xf, 30 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("0", 25 * Xf, 460 * Yf);//lives = 0
    ctx.fillText("Game over: " + round, 185 * Xf, 460 * Yf);
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", 185 * Xf, 400 * Yf);
};

function randomInt(min, max) {
    //Calculates a random number between a 'min' and 'max' number.
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function turnEvent(AnX, AnY) {
    var lengd = rects.length;
    eventDone = false,
    one30 = 10,
    one40 = 10,  
    one301 = false, 
    one401 = false;
    for (var i = 0; i < lengd; i += 1) {
        // Indentifying rectangle in use, so we can access the color, and position.
        if (collides([rects[i]], AnX, AnY)) {
            var rightBox = rects[i];
            var rectangle = rects2[i];
        }
    }
    rounded_rect(rectangle.x, rectangle.y, 90, 110, 10, 'black', 'black');
    function render() {
        ctx.beginPath();
        ctx.fillStyle = rightBox.color;
        ctx.moveTo((rectangle.x + 42 - one40) * Xf, (rectangle.y + 32 - one30) * Yf);
        ctx.lineTo((rectangle.x + 48 + one40) * Xf, (rectangle.y + 32 - one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 32 - one30) * Yf, (rectangle.x + 58 + one30) * Xf, (rectangle.y + 42 - one40) * Yf);
        ctx.lineTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 68 + one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 58 + one30) * Xf, (rectangle.y + 78 + one30) * Yf, (rectangle.x + 48 + one40) * Xf, (rectangle.y + 78 + one30) * Yf);
        ctx.lineTo((rectangle.x + 42 - one40) * Xf, (rectangle.y + 78 + one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 32 - one30) * Xf, (rectangle.y + 78 + one30) * Yf, (rectangle.x + 32 - one30) * Xf, (rectangle.y + 68 + one40) * Yf);
        ctx.lineTo((rectangle.x + 32 - one30) * Xf, (rectangle.y + 42 - one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 32 - one30) * Xf, (rectangle.y + 32 - one30) * Yf, (rectangle.x + 42 - one40) * Xf, (rectangle.y + 32 - one30) * Yf);
        ctx.fill();
        ctx.closePath();
        if (one30 === 30) {
            one30 += 0;
            one301 = true;
            console.log("one30 true");
        } else {
            one30 += 4;
        }
        if (one40 === 30) {
            one401 = true;
            console.log("one40 true");
        } else {
            one40 += 2;
        }
        if (one301 && one401) {
            eventDone = true;
        }
    }
    (function animloop(){
        if (eventDone) {//condition to stop requestAnimationFrame();
            eventDone = false;
            ctx.clearRect(0,0, 310*Xf, 365*Yf);
            ctx.putImageData(imgData,0,0);
            return;
        };
        requestAnimationFrame(animloop);
        render();
    })();
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
    var lengd = rects.length,
    g = { 'x': 0, 'y': 0 };
    if (collides(startRects, ex, ey)) { // if start button...
        rounded_rect(70, 430, 230, 50, 10, 'black', 'silver');
        blackBox2(ctx) 
        ctx.fillStyle = "White";
        ctx.font = pixels + "px monospace";
        ctx.textAlign = "center";
        ctx.fillText(round + "", 235 * Xf, 460 * Yf);
        blackCan = true;
        g = randomXY(); // generate coordinates for computer.
    }
    if (blackCan && !userTurn) {
        var computerBox = collides(rects, g.x, g.y);
        if (computerBox) {
            remainUpdate(ctx);
            ctx.fillStyle = "black";
            ctx.font = pixels + "px monospace";
            ctx.textAlign = "center";
            ctx.fillText("" + round, 235 * Xf, 400 * Yf);
            ctx.fillText("" + colours, 275 * Xf, 400 * Yf);
            que.push(computerBox);
            reverseQue = que.slice(0);
            blackCan = false;
            computer();
        }
    } 
    if (collides(rects, ex, ey)) {
        for (var i = 0; i < lengd; i += 1) {
            // Identify the rectangle in use.
            if (collides([rects[i]], ex, ey)) {
                var rightBox = rects[i];
                var rectangle = rects2[i];
            }
        }
        if (userTurn) {
            //if clicked n box is the same as n box from computer.
            if (collides(rects, ex, ey) === que[counter]) {
                turnEvent(ex, ey);      //do animation
                colours += 1;
                colourNumberData.score = colours;
                reverseQue.shift();     //pops the first object in array.
                counter += 1; 
                currentremain -= 1;     //update number of remaining boxes for user.
                remainUpdate(ctx);
                ctx.fillStyle = "black";
                ctx.font = pixels + "px monospace";
                ctx.textAlign = "center";
                ctx.fillText("" + round, 235 * Xf, 400 * Yf);
                ctx.fillText("" + colours, 275 * Xf, 400 * Yf);
            }
            else {
                a_canvas.removeEventListener('click', clickEvent, false);
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
                console.log("hi");
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
                ctx.lineWidth = 3*Xf;
                ctx.strokeStyle = 'silver';
                ctx.stroke();
                ctx.closePath();

                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.moveTo(52*Xf, 455*Yf);
                ctx.lineTo(42*Xf, 465*Yf);
                ctx.lineTo(32*Xf, 455*Yf);
                ctx.lineTo(42*Xf, 447*Yf);
                ctx.fill()
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(37*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
                ctx.arc(47*Xf, 451*Yf, 6*Xf, 2*Math.PI, 0, true);
                ctx.fill();
                ctx.closePath();

                ctx.fillStyle = "White";
                ctx.font = pixels + "px monospace";
                ctx.textAlign = "center";
                ctx.fillText(lives + "", 25 * Xf, 460 * Yf);
                if (lives !== 0) {  //if not game over.
                    setTimeout(function () {
                        userTurn = false;   //blackCan should be false too.
                        computerRe();
                    }, 1000);
                }
            }
        }
    }
        if (!reverseQue.length && userTurn) { // if it's still user's turn.
            roundDone.play();
            rounded_rect(70, 430, 230, 50, 10, 'black', 'green');
            round += 1;
            scoreData.score = round; // increase score by one.
            remain += 1;
            counter = 0;
            blackCan = false;
            userTurn = false;
            proCeed(ctx);
        }
        if (!lives) {
            setTimeout(function () {
                endAudio.play();
            }, 750);
            gameover_interface();
            return;
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
enhanceContext(a_canvas, ctx);
game_interface();
//ctx.drawImage(cacheCanvas, 0, 0, x, y, 0, 0, x, y);
if (x === 414 && y === 736) {
    imgData = ctx.getImageData(0,0,3*x,3*365*Yf);
} else if (x === 768 && y === 1024) {
    if (a_canvas.width === 2 * x) {
        imgData = ctx.getImageData(0,0,2*x,2*365*Yf);
    } else {
        imgData = ctx.getImageData(0,0,x,365*Yf);
    }
} else {
    imgData = ctx.getImageData(0,0,2*x,2*365*Yf);
}
if (a_canvas && a_canvas.getContext) {
    a_canvas.addEventListener('click', clickEvent, false);
    FastClick.attach(document.body);
}
