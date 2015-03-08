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
var sharing = false;
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
/*function cloneCanvas(oldCanvas) {
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
}*/

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

var pixels = (10 * Yf).toFixed(0);
var xc = 45 * Xf, yc = 55 * Yf;
//-------------------RECTANGLES THAT USE CLICKEVENY-------------->
var rects = [{x: 5 * Xf, y: 5 * Yf, w: xc, h: yc, color: '#26A65B'},        //Green
        {x: 55 * Xf, y: 5 * Yf, w: xc, h: yc, color: '#F22613'},          //Red
        {x: 5 * Xf, y: 65 * Yf, w: xc, h: yc, color: '#1E90FF'},          //Blue
        {x: 5 * Xf, y: 125 * Yf, w: xc, h: yc, color: '#F7CA18'},             //Gold
        {x: 55 * Xf, y: 125 * Yf, w: xc, h: yc, color: '#8E44AD'},         //Purple
        {x: 105 * Xf, y: 5 * Yf, w: xc, h: yc, color: '#DDA0DD'},          //Pink
        {x: 105 * Xf, y: 65 * Yf, w: xc, h: yc, color: '#FF8C00'},         //Orange k6
        {x: 105 * Xf, y: 125 * Yf, w: xc, h: yc, color: '#36D7B7'},   //Lightseagreen
        {x: 55 * Xf, y: 65 * Yf, w: xc, h: yc, color: 'Brown'}];          //Brown

var rects2 = [{x: 5, y: 5},   //Green
        {x: 55, y: 5},        //Red
        {x: 5, y: 65},        //Blue
        {x: 5, y: 125},        //Gold
        {x: 55, y: 125},       //Purple
        {x: 105, y: 5},        //Pink
        {x: 105, y: 65},       //Orange k6
        {x: 105, y: 125},       //Lightseagreen
        {x: 55, y: 65}];      //Brown

var consoleRects = [{x: 5 * Xf, y: 185 * Yf, w: 25 * Xf, h: 25 * Yf}];//k12
var startRects = [{x: 35 * Xf, y: 215 * Yf, w: 115 * Xf, h: 25 * Yf}];//k11
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

function rounded_rect(ctx,x, y, w, h, r, fillstyle, strokestyle){
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
    ctx.lineWidth = 1.5*Xf;
    ctx.strokeStyle = strokestyle;
    ctx.stroke();
    ctx.closePath();
}
//--------------------DRAWINGS TO CACHE--------------->
function blackBox2(canvas) {
    sharing = true;
    canvas.fillStyle = "Black";
    canvas.fillRect(45*Xf, 220*Yf, 100 * Xf, 15 * Yf);//k10
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Tap to Share", 92.5 * Xf, 230 * Yf);
};

function proCeed(canvas) {
    sharing = false;
    canvas.fillStyle = "Black";
    canvas.fillRect(45 * Xf, 220 * Yf, 100 * Xf, 15 * Yf);
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Next round", 92.5 * Xf, 230 * Yf);
};

function remainUpdate(canvas) {
    canvas.fillStyle = 'black'
    ctx.fillRect(45 * Xf, 190 * Yf, 100 * Xf, 15 * Yf);//k10
    canvas.fillStyle = "White";
    canvas.font = pixels + "px monospace";
    canvas.textAlign = "center";
    canvas.fillText("Progress", 67.5*Xf, 200 * Yf);
    canvas.beginPath();
    canvas.moveTo(130*Xf, 190*Yf);
    canvas.lineTo(140*Xf, 190*Yf);
    canvas.quadraticCurveTo(145*Xf, 190*Yf, 145*Xf, 195*Yf);
    canvas.lineTo(145*Xf, 200*Yf);
    canvas.quadraticCurveTo(145*Xf, 205*Yf, 140*Xf, 205*Yf);
    canvas.lineTo(130*Xf, 205*Yf);
    canvas.quadraticCurveTo(125*Xf,205*Yf, 125*Xf, 200*Yf);
    canvas.lineTo(125*Xf, 195*Yf);
    canvas.quadraticCurveTo(125*Xf, 190*Yf, 130*Xf, 190*Yf);
    canvas.fill();
    canvas.closePath();
    canvas.beginPath();
    canvas.moveTo(105*Xf, 190*Yf);
    canvas.lineTo(115*Xf, 190*Yf);
    canvas.quadraticCurveTo(120*Xf, 190*Yf, 120*Xf, 195*Yf);
    canvas.lineTo(120*Xf, 200*Yf);
    canvas.quadraticCurveTo(120*Xf, 205*Yf, 115*Xf, 205*Yf);
    canvas.lineTo(105*Xf,205*Yf);
    canvas.quadraticCurveTo(100*Xf,205*Yf, 100*Xf, 200*Yf);
    canvas.lineTo(100*Xf, 195*Yf);
    canvas.quadraticCurveTo(100*Xf, 190*Yf, 105*Xf, 190*Yf);
    canvas.fill();
    canvas.closePath();
};

function drawK13(ctx) {
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(10 * Xf, 215 * Yf);
    ctx.lineTo(25 * Xf, 215 * Yf);
    ctx.quadraticCurveTo(30 * Xf, 215 * Yf, 30 * Xf, 220 * Yf);
    ctx.lineTo(30 * Xf, 235 * Yf);
    ctx.quadraticCurveTo(30 * Xf, 240 * Yf, 25 * Xf, 240 * Yf);
    ctx.lineTo(10 * Xf, 240 * Yf);
    ctx.quadraticCurveTo(5 * Xf, 240 * Yf, 5 * Xf, 235 * Yf);
    ctx.lineTo(5 * Xf, 220 * Yf);
    ctx.quadraticCurveTo(5 * Xf, 215 * Yf, 10 * Xf, 215 * Yf);
    ctx.fill();
    ctx.lineWidth = 1.5*Xf;
    ctx.strokeStyle = 'silver';
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(26*Xf, 227.5*Yf);
    ctx.lineTo(21*Xf, 232.5*Yf);
    ctx.lineTo(16*Xf, 227.5*Yf);
    ctx.lineTo(21*Xf, 223.5*Yf);
    ctx.fill()
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(18.5*Xf, 225.5*Yf, 3*Xf, 2*Math.PI, 0, true);
    ctx.arc(23.5*Xf, 225.5*Yf, 3*Xf, 2*Math.PI, 0, true);
    ctx.fill();
    ctx.closePath();
};

function drawBoxes(ctx) { 
    var lengd = rects.length, i;
    for (i = 0; i < lengd; i += 1) {
        ctx.beginPath();
        ctx.fillStyle = rects[i].color;
        ctx.moveTo((rects2[i].x + 5) * Xf, rects2[i].y * Yf);
        ctx.lineTo((rects2[i].x + 45 - 5) * Xf, rects2[i].y * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 45) * Xf, rects2[i].y * Yf, (rects2[i].x + 45) * Xf, (rects2[i].y + 5) * Yf);
        ctx.lineTo((rects2[i].x + 45) * Xf, (rects2[i].y + 55 - 5) * Yf);
        ctx.quadraticCurveTo((rects2[i].x + 45) * Xf, (rects2[i].y + 55) * Yf, (rects2[i].x + 45 - 5) * Xf, (rects2[i].y + 55) * Yf);
        ctx.lineTo((rects2[i].x + 5) * Xf, (rects2[i].y + 55) * Yf);
        ctx.quadraticCurveTo(rects2[i].x * Xf, (rects2[i].y + 55) * Yf, rects2[i].x * Xf, (rects2[i].y + 55 - 5) * Yf);
        ctx.lineTo(rects2[i].x * Xf, (rects2[i].y + 5) * Yf);
        ctx.quadraticCurveTo(rects2[i].x * Xf, rects2[i].y * Yf, (rects2[i].x + 5) * Xf, rects2[i].y * Yf);
        ctx.fill();
        ctx.lineWidth = 1.5*Xf;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.closePath();
    }
}
//-------------------------------------------------------->
/*var cacheCanvas = cloneCanvas(a_canvas); // newCanvas
var cacheCtx = cacheCanvas.getContext('2d');// context
//--------------CACHE DRAWINGS----------->
drawBoxes(cacheCtx);*/
//--------------------------------------->


var game_interface = function drawGame(ctx) {
    var lengd = rects.length, i;
    //--------------DRAW ALL MAIN COLOURED RECTANGLES---------------------->

    for (i = 0; i < lengd; i += 1) {
        rounded_rect(ctx,rects2[i].x, rects2[i].y, 45, 55, 5, rects[i].color, 'black');
    }
    //--------------------------------------------------------------------->
    ctx.fillStyle = 'black';
    //------------------K10-----------------
    rounded_rect(ctx,35, 185, 115, 25, 5, null, 'silver');
    //--------------------------------------
    //------------------K11-----------------
    rounded_rect(ctx,35, 215, 115, 25, 5, null, 'silver');
    //--------------------------------------
    //----------------K12-------------------
    rounded_rect(ctx,5, 185, 25, 25, 5, null, 'silver');
    //--------------------------------------
    drawK13(ctx);
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("3", 12.5 * Xf, 230 * Yf);// Number of lives to start with.
    ctx.beginPath();
    ctx.arc(17.5 * Xf, 197.5 * Yf, 7.5 * Xf, (5 * Math.PI) / 4, (Math.PI), false);
    ctx.lineWidth = 1.5 * Xf;
    ctx.strokeStyle = "White";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10 * Xf, 192.5 * Yf);
    ctx.lineTo(7.5 * Xf, 197.5 * Yf);
    ctx.lineTo(12.5 * Xf, 197.5 * Yf);
    ctx.fill();
    ctx.fillText("Start", 92.5 * Xf, 230 * Yf);

};

function gameover(e) {
    ex = e.offsetX;
    ey = e.offsetY;
    if (collides(consoleRects, ex, ey)) {
        setTimeout(function () {
            location.reload();
        }, 100);
    }
    if (collides(startRects, ex, ey)) {
        window.plugins.socialsharing.share('Colour Flow! A free brain training app for iOS!', null, null, 'https://itunes.apple.com/us/app/colour-flow/id944735899?mt=8');
    };
}

var gameover_interface = function game_over() {
    //------------SUBMIT HIGHSCORE-------------------->
    function authUser(){
        gamecenter.submitScore(successCallback, failureCallback, scoreData);
        gamecenter.submitScore(successCallback, failureCallback, colourNumberData);

    }
    document.addEventListener("deviceready", authUser, false);
    //------------------------------------------------>
    drawK13(ctx);
    ctx.fillStyle = "Black";
    ctx.fillRect(45 * Xf, 220 * Yf, 100 * Xf, 15 * Yf);//k10
    ctx.fillStyle = "White";
    ctx.font = pixels + "px monospace";
    ctx.textAlign = "center";
    ctx.fillText("0", 12.5 * Xf, 230 * Yf);//lives = 0
    ctx.fillText("Share game", 92.5 * Xf, 230 * Yf);
    a_canvas.addEventListener('click', gameover, false);
};

function randomInt(min, max) {
    //Calculates a random number between a 'min' and 'max' number.
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function turnEvent(AnX, AnY) {
    var lengd = rects.length;
    eventDone = false,
    one30 = 9,
    one40 = 9,  
    one301 = false, 
    one401 = false;
    for (var i = 0; i < lengd; i += 1) {
        // Indentifying rectangle in use, so we can access the color, and position.
        if (collides([rects[i]], AnX, AnY)) {
            var rightBox = rects[i];
            var rectangle = rects2[i];
        }
    }
    rounded_rect(ctx,rectangle.x, rectangle.y, 45, 55, 5, 'black', 'black');
    function render() {
        ctx.beginPath();
        ctx.fillStyle = rightBox.color;
        ctx.moveTo((rectangle.x + 21 - one40) * Xf, (rectangle.y + 16 - one30) * Yf);
        ctx.lineTo((rectangle.x + 24 + one40) * Xf, (rectangle.y + 16 - one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 29 + one30) * Xf, (rectangle.y + 16 - one30) * Yf, (rectangle.x + 29 + one30) * Xf, (rectangle.y + 21 - one40) * Yf);
        ctx.lineTo((rectangle.x + 29 + one30) * Xf, (rectangle.y + 34 + one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 29 + one30) * Xf, (rectangle.y + 39 + one30) * Yf, (rectangle.x + 24 + one40) * Xf, (rectangle.y + 39 + one30) * Yf);
        ctx.lineTo((rectangle.x + 21 - one40) * Xf, (rectangle.y + 39 + one30) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 16 - one30) * Xf, (rectangle.y + 39 + one30) * Yf, (rectangle.x + 16 - one30) * Xf, (rectangle.y + 34 + one40) * Yf);
        ctx.lineTo((rectangle.x + 16 - one30) * Xf, (rectangle.y + 21 - one40) * Yf);
        ctx.quadraticCurveTo((rectangle.x + 16 - one30) * Xf, (rectangle.y + 16 - one30) * Yf, (rectangle.x + 21 - one40) * Xf, (rectangle.y + 16 - one30) * Yf);
        ctx.fill();
        ctx.closePath();
    }
    (function animloop(){
        if (one30 === 15) {
            one30 += 0;
            one301 = true;
        } else {
            one30 += 1;
        }
        if (one40 === 15) {
            one401 = true;
        } else {
            one40 += 1;
        }
        if (one401 && one301) {
            //eventDone = false;
            rounded_rect(ctx,rectangle.x, rectangle.y, 45, 55, 5, rightBox.color, 'black');
            return;
        }
        /*if (eventDone) {//condition to stop requestAnimationFrame();
            //ctx.clearRect((rectangle.x-2.5)*Xf,(rectangle.y-2.5)*Yf, 47.5*Xf, 57.5*Yf);
            eventDone = false;
            rounded_rect(ctx,rectangle.x, rectangle.y, 45, 55, 5, rightBox.color, 'black');
            return;
        };*/
        render();
        requestAnimationFrame(animloop);
        //setTimeout(animloop, 1000/60);
        //render();
    })();
}

function computer() {
    a_canvas.removeEventListener('click', clickEvent, false);
    currentremain = remain; // reset values...
    var j = 0, i = setInterval(function () {
        turnEvent(reverseQue[0].x, reverseQue[0].y);  // do animation for the first object in Object, and then the next, and the next.
        reverseQue.shift();
        myMedia.play();
        //new Audio('Click.mp3').play() //play click sound
        j += 1; // stops when counter equals the length of que.
        if (j === que.length) {
            reverseQue = que.slice(0);  //reset the reverseQue.
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
        turnEvent(reverseQue[0].x, reverseQue[0].y);  // do animation for the first object in Object, and then the next, and the next.
        reverseQue.shift();
        myMedia.play() // play click sound
        j += 1;
        if (j === que.length) {
            reverseQue = que.slice(0);  //reset the reverseQue.
            clearInterval(i);
            userTurn = true;
            a_canvas.addEventListener('click', clickEvent, false);
        }
    }, 400);//faster version
}
function randomXY() {
    //chooses random coordinates for the computer.
    var minXY = 5 * Xf,// minimum coordinates in which X and Y meet first.
    maxX = 150 * Xf,    // maximum length computer reaches on the X plane.
    maxY = 230 * Yf,    // maximum length computer reaches on the Y plane.
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
        rounded_rect(ctx,35, 215, 115, 25, 5, 'black', 'silver');
        blackBox2(ctx) 
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
            ctx.fillText("" + round, 110 * Xf, 200 * Yf);
            ctx.fillText("" + colours, 135 * Xf, 200 * Yf);
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
                ctx.fillText("" + round, 110 * Xf, 200 * Yf);
                ctx.fillText("" + colours, 135 * Xf, 200 * Yf);
            }
            else {
                a_canvas.removeEventListener('click', clickEvent, false);
                //---------------DRAW A RED BORDER------------------->
                rounded_rect(ctx,rectangle.x, rectangle.y, 45, 55, 5, rightBox.color, 'red');
                //--------------------------------------------------->
                //display normal banner after 300ms.
                setTimeout(function () {
                    rounded_rect(ctx,rectangle.x, rectangle.y, 45, 55, 5, rightBox.color, 'black');
                }, 300);
                counter = 0;    //reset counter.
                lives -= 1;
                reverseQue = que.slice(0);  //reset the reverseQue.
                drawK13(ctx);
                ctx.fillStyle = "White";
                ctx.font = pixels + "px monospace";
                ctx.textAlign = "center";
                ctx.fillText(lives + "", 12.5 * Xf, 230 * Yf);
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
            rounded_rect(ctx,35, 215, 115, 25, 5, 'black', 'green');
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
    if (sharing && userTurn && collides(startRects, ex, ey)) {
        window.plugins.socialsharing.share('Colour Flow! A free brain training app for iOS!', null, null, 'https://itunes.apple.com/us/app/colour-flow/id944735899?mt=8');
    };
}
enhanceContext(a_canvas, ctx);
game_interface(ctx);
if (a_canvas && a_canvas.getContext) {
    a_canvas.addEventListener('click', clickEvent, false);
    FastClick.attach(document.body);
}
