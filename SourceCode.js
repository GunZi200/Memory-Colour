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
var que = [], reverseQue = [];//que reversed, this pops each element correct by the user.
var userTurn = false, blackCan = false, roundEvent = false, doNothing = false;
var round = 1, remain = 1, currentremain = 1, lives = 3;
var ex = 0, ey = 0, counter = 0;
var a_canvas = document.getElementById("a"), ctx = a_canvas.getContext("2d");
var x = window.innerWidth, y = window.innerHeight;
var ratio = x/y;

if (ratio >= 0.5 && ratio <= 0.8) {
    console.log("Great, your screen supports, the game :)");
} else {
    alert("Your screen ratio is not compatible with this app, sorry.");
    doNothing = true;
}

var xc = (9 * x) / 31, yc = (11 * y) / 49, xfin = 0, yall = 0, xk13 = 0;
//Finnur út hvar staðsetning textans á að vera á stóru svörtu.
var blackCanvasthing = function(ys, text) {//x -staðsetning og x-canvas
    var ycc = (5 / 49), xcc = (23 / 31), midblack = (xcc/2), fastiX_black = (7/31), fastiY_black = (3/49), lengd = (((ctx.measureText(text).width)/x)), midtext = lengd / 2;
    xk13 = ((3.5/31)-midtext)*x;//k13
    //k11 og k10
    xfin = (fastiX_black + midblack - midtext)*x;
    yall = (ys + fastiY_black)*y;
    console.log(xfin);
    return {
        X: xfin,
        Y: yall,
        X13: xk13
    }
}
var selAudio = new Audio("SelectionSound.mp3"), myMedia = new Audio("Click.mp3");

var k13Box = function drawK13(){
    ctx.fillStyle = "Black";
    ctx.beginPath();
    ctx.moveTo(2*x/31, 43*y/49);
    ctx.lineTo(5*x/31, 43*y/49);
    ctx.quadraticCurveTo(6*x/31, 43*y/49, 6*x/31, 44*y/49);
    ctx.lineTo(6*x/31, 47*y/49);
    ctx.quadraticCurveTo(6*x/31, 48*y/49, 5*x/31, 48*y/49);
    ctx.lineTo(2*x/31, 48*y/49);
    ctx.quadraticCurveTo(x/31, 48*y/49, x/31, 47*y/49);
    ctx.lineTo(x/31, 44*y/49);
    ctx.quadraticCurveTo(x/31, 43*y/49, 2*x/31, 43*y/49);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
}

var rects = [{x: x/31, y: y/49, w: xc, h: yc, color: "Green"},  //Green
        {x: (11*x)/31, y: y/49, w: xc, h: yc, color: "#DC143C"},  //Red
        {x: x/31, y: (13*y)/49, w: xc, h: yc, color: "#1E90FF"},  //Blue
        {x: x/31, y: (25*y)/49, w: xc, h: yc, color: "Gold"},  //Gold
        {x: (11*x)/31, y: (25*y)/49, w: xc, h: yc, color: "#8B008B"},  //Purple
        {x: (21*x)/31, y: y/49, w: xc, h: yc, color: "#DDA0DD"},  //Pink
        {x: (21*x)/31, y: (13*y)/49, w: xc, h: yc, color: "#FF8C00"}, //Orange k6
        {x: (21*x)/31, y: (25*y)/49, w: xc, h: yc, color: "Lightseagreen"}, //Lightseagreen
        {x: (11*x)/31, y: (13*y)/49, w: xc, h: yc, color: "Brown"}];//Brown

var game_interface = function drawGame() {
    ctx.fillStyle = "Silver";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = rects.length - 1; i >= 0; i -= 1) {
        ctx.fillStyle = rects[i].color;
        ctx.fillRect(rects[i].x, rects[i].y, xc, yc);
        ctx.beginPath();
        ctx.rect(rects[i].x, rects[i].y, xc, yc);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    ctx.fillStyle = "Black";
    ctx.fillRect((7 * x) / 31, (37 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k10
    ctx.fillRect((7 * x) / 31, (43 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k11
    ctx.beginPath();
    ctx.moveTo(2 * x / 31, 37 * y / 49);
    ctx.lineTo(5 * x / 31, 37 * y / 49);
    ctx.quadraticCurveTo(6 * x / 31, 37 * y / 49, 6 * x / 31, 38 * y / 49);
    ctx.lineTo(6 * x / 31, 41 * y / 49);
    ctx.quadraticCurveTo(6 * x / 31, 42 * y / 49, 5 * x / 31, 42 * y / 49);
    ctx.lineTo(2 * x / 31, 42 * y / 49);
    ctx.quadraticCurveTo(x / 31, 42 * y / 49, x / 31, 41 * y / 49);
    ctx.lineTo(x / 31, 38 * y / 49);
    ctx.quadraticCurveTo(x / 31, 37 * y / 49, 2 * x / 31, 37 * y / 49);
    ctx.fill();
    ctx.strokeStyle = "Black";
    ctx.stroke();
    ctx.fillStyle = "Black";
    k13Box();
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord8 = blackCanvasthing(43/49, "3"), Xhnit = getCoord8.X13, Yhnit = getCoord8.Y;
    ctx.fillText("3", Xhnit, Yhnit);// Number of lives to start with.
    ctx.beginPath();
    ctx.arc((3.5 * x) / 31, (39.5 * y) / 49, ((2*x)/31), (5*Math.PI)/4, (Math.PI), false);
    ctx.lineWidth = (0.3*x)/31;
    ctx.strokeStyle = "White";
    ctx.stroke();
    ctx.fillStyle = "White";
    ctx.beginPath();
    ctx.moveTo((1.5*x)/31, (38.5*y)/49);
    ctx.lineTo((1.1*x)/31, (39.5*y)/49);
    ctx.lineTo((2*x)/31, (39.5*y)/49);
    ctx.fill();
    ctx.font = "25px Arial";
    var getCoord1 = blackCanvasthing(43/49, "Click to Start"), var Xhnit = getCoord1.X, Yhnit = getCoord1.Y;
    ctx.fillText("Click to Start", Xhnit, Yhnit);
};
function resize_canvas() {
    if (a_canvas.width < window.innerWidth) {
        a_canvas.width = window.innerWidth;
    }
    if (a_canvas.height < window.innerHeight) {
        a_canvas.height = window.innerHeight;
    }
    game_interface();
}
var black_canvas = function blackCanvas() {
    ctx.clearRect((7 * x) / 31, (43 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k11
    ctx.fillStyle = "Black";
    ctx.fillRect((7 * x) / 31, (43 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k11
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
};

var continue_canvas = function continueBlack() {
    ctx.clearRect((7 * x) / 31, (43 * y) / 49, (23 * x) / 31, (5 * y) / 49);
    ctx.fillStyle = "Black";
    ctx.fillRect((7 * x) / 31, (43 * y) / 49, (23 * x) / 31, (5 * y) / 49);
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord2 = blackCanvasthing(43/49, "Proceed"), Xhnit = getCoord2.X, Yhnit = getCoord2.Y;
    ctx.fillText("Proceed", Xhnit, Yhnit);
};

var remain_cavas = function newRemaining() {
    ctx.clearRect((7 * x) / 31, (37 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k10
    ctx.fillStyle = "Black";
    ctx.fillRect((7 * x) / 31, (37 * y) / 49, (23 * x) / 31, (5 * y) / 49);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord3 = blackCanvasthing(37/49, "Remaining: x"), Xhnit = getCoord3.X, Yhnit = getCoord3.Y;
    ctx.fillText("Remaining: " + remain, Xhnit, Yhnit);//k10
};

var currentremain_canvas = function newCurrentR() {
    ctx.clearRect((7*x)/31, (37*y)/49, (23*x)/31, (5*y)/49);//k10
    ctx.fillStyle = "Black";
    ctx.fillRect((7*x)/31, (37*y)/49, (23*x)/31, (5*y)/49);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord4 = blackCanvasthing(37/49, "Remaining: x"), Xhnit = getCoord4.X, Yhnit = getCoord4.Y;
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
    var getCoord10 = blackCanvasthing(43/49, "0"), Xhnit = getCoord10.X13, Yhnit = getCoord10.Y;
    ctx.fillText("0", Xhnit, Yhnit);//lives = 0
    ctx.clearRect((7*x)/31, (43*y)/49, (23*x)/31, (5*y)/49);//k11
    ctx.fillStyle = "Black";
    ctx.fillRect((7*x)/31, (43*y)/49, (23*x)/31, (5*y)/49);//k11
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord5 = blackCanvasthing(43/49, "Game over: "), Xhnit = getCoord5.X, Yhnit = getCoord5.Y;
    ctx.fillText("Game over: " + round, Xhnit, Yhnit);
    ctx.clearRect((7*x)/31, (37*y)/49, (23*x)/31, (5*y)/49);//k10
    ctx.fillStyle = "Black";
    ctx.fillRect((7*x)/31, (37*y)/49, (23*x)/31, (5*y)/49);//k10
    ctx.fillStyle = "White";
    ctx.font = "25px Arial";
    var getCoord6 = blackCanvasthing(37/49, "<-- Try again?"), Xhnit = getCoord6.X, Yhnit = getCoord6.Y;
    a_canvas.addEventListener('click', gameover, false);
    ctx.fillText("<-- Try again?", Xhnit, Yhnit);
};

var consoleRects = [{x: x/31, y: (37*y)/49, w: (5*x)/31, h: (5*y)/49}];//k12
var startRects = [{x: (7*x)/31, y: (43*y)/49, w: (23*x)/31, h: (5*y)/49}];//k11

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function containsObject(obj, list) {
    var i, j;
    for (i = 1; i = obj.length; i += 1) {
        for (j = 1; j = list.length; j += 1) {
            if (list[j] === obj[i]) {
                return true;
            }
        }
    }
    return false;
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
    var xw = window.innerWidth, yw = window.innerHeight, kassi = collides(rects, x, y);
    var newXsf = (0.3 * xw) / 31, newYsf = (0.3 * yw) / 49, newXlf = (0.6 * xw) / 31, newYlf = (0.6 * yw) / 49, newXs = 0, newYs = 0, newXl = 0, newYl = 0;
    var boxesSizes = [{x: kassi.x + ((1/3)*xc), y: kassi.y + ((1/3)*yc), h: ((1/3)*xc), w:  ((4/11)*yc)}];
    ctx.fillStyle = "black";
    ctx.fillRect(kassi.x, kassi.y, xc, yc);
    var temp_var = setInterval(function myAnimation() {
        ctx.fillStyle = kassi.color;
        ctx.fillRect(boxesSizes[0].x - newXs, boxesSizes[0].y - newYs, boxesSizes[0].h + newXl, boxesSizes[0].w + newYl);
        if (newXs.toFixed(2) > ((1/3)*xc)-newXsf+(0.1* xw)/31) { newXsf = 0; }
        else { newXs +=  newXsf; }
        if (newYs.toFixed(2) > ((1/3)*yc)-newYsf) { newYsf = 0; }
        else { newYs += newYsf; }
        if (newXl.toFixed(2) > ((2/3)*xc-newXlf+(0.1* xw)/31)) { newXlf = 0; } 
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
    currentremain = round;
    var counter = 0, i = setInterval(function () {
        if (containsObject(que, rects)) {
            myMedia.play();
            turnEvent(que[counter].x, que[counter].y);
            counter += 1; // stops when counter equals the length of que.
        }
        if (counter === que.length) {
            clearInterval(i);
            a_canvas.addEventListener('click', clickEvent, false);
            FastClick.attach(document.body);
            userTurn = true;
        }
    }, 450);
}

function computerRe() {
    remain_cavas();
    currentremain = round;
    var counter = 0, i = setInterval(function () {
        if (containsObject(que, rects)) {
            myMedia.play();
            turnEvent(que[counter].x, que[counter].y);
            counter += 1; // stops when counter equals the length of que.
        }
        if (counter === que.length) {
            clearInterval(i);
            a_canvas.addEventListener('click', clickEvent, false);
            FastClick.attach(document.body);
            userTurn = true;
        }
    }, 400);//faster version
}

function randomXY() {
    var minXY = x/31, maxX = (30*x)/31, maxY = (36*y)/49;
    X = randomInt(minXY, maxX), Y = randomInt(minXY, maxY);
    while (!collides(rects, X, Y)) { X = randomInt(minXY, maxX), Y = randomInt(minXY, maxY); }
    return { 'x': X, 'y': Y }; // OBJECT coordinates for box the computer hits next.
}

function startPlaying() {
    var g = { 'x': 0, 'y': 0 }, i;
    if (collides(startRects, ex, ey)) {
        selAudio.play();
        black_canvas();
        var getCoord7 = blackCanvasthing(43/49, "Round: x"), Xhnit = getCoord7.X, Yhnit = getCoord7.Y;
        ctx.fillText("Round: " + round, Xhnit, Yhnit);
        blackCan = true;
        g = randomXY();
    }
    if (blackCan && !userTurn) { // computer's turn
        for (var i = 0; i < rects.length; i += 1) {
            if (collides([rects[i]], g.x, g.y)) {
                que.push(rects[i]);
                reverseQue = que.slice(0).reverse();// reverseQue = [Green, Blue]
                blackCan = false;
                computer();
            }
        }
    } else if (userTurn) { // user's turn
        if (collides(rects, ex, ey)) {
            turnEvent(ex, ey);
            if (collides(rects, ex, ey) === que[counter]) { //if tveir litir eru tvisvar í röð.
                var myMedia = new Audio("CorrectSound.mp3");
                myMedia.play();
                reverseQue.pop();
                counter += 1, currentremain -= 1;
                currentremain_canvas();
            } else if (collides(rects, ex, ey) !== que[counter]) {
                a_canvas.removeEventListener('click', clickEvent, false);
                var errAudio = new Audio("WrongSound.mp3");
                errAudio.play();
                counter = 0, lives -= 1;
                reverseQue = que.slice(0).reverse();
                k13Box();
                ctx.fillStyle = "White";
                ctx.font = "25px Arial";
                var getCoord9 = blackCanvasthing(43/49, "" + lives), Xhnit = getCoord9.X13, Yhnit = getCoord9.Y;
                ctx.fillText("" + lives, Xhnit, Yhnit);
                if (lives !== 0) {
                    setTimeout(function(){
                        userTurn = false; //blackCan should be false too.
                        computerRe();
                    },1000);
                }
            } 
            if (lives <= 0) {
                var endAudio = new Audio("GameOver.mp3");
                setTimeout(function(){ endAudio.play(); }, 800);
                gameover_interface();
                return;
            }
            if (reverseQue.length === 0 && currentremain === 0) {
                counter = 0;
                blackCan = false, userTurn = false;
                round += 1, remain += 1;
                continue_canvas();
                return;
            } else {
                userTurn = true;
            }
        }
    }
}

resize_canvas();
if (!doNothing) {
    if (a_canvas && a_canvas.getContext) {
        a_canvas.addEventListener('click', clickEvent, false);
        FastClick.attach(document.body);
    }
