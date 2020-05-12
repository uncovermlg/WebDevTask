let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

//Variables related to scores:
localStorage.setItem("highscore", 86);
var highscore = localStorage.getItem("highscore");
var score=0;
document.getElementById("score").innerHTML= "Your Score: " + score;
document.getElementById("highscore").innerHTML= "High Score: " + highscore;

//Time interval IDs:
var IDjump=null;
var IDmove=null;
var IDspin=null;
var IDpoint=null;

//variables for the obsatcles:
var paint=["red","blue","yellow","green"];
var quarter= Math.PI/2;
var obrad=110;
var turn= (Math.PI/180)*1;
var change=0;
var a=a2=200; //x
var b=obrad;
var b2=0;
var obcolor="some string";
let reminder=0; //to hold reminder of the rotations
var direction = 1; //starting value for direction : up

//Variable declarations for line:
var lx=0;
var ly=350 + obrad;

//variables for the ball:
var bx=200;
var by=500;
var bcolor= paint[Math.floor(Math.random()*4)]; //ball colors
var base=by;
var ballrad=15;

var status = "running" //for pausing the game

//to initialize the variables again when the game ends:
function initialize(){
window.clearInterval(IDjump);
window.clearInterval(IDmove);
window.clearInterval(IDspin);
window.clearInterval(IDpoint);

by=base=350;
change=0;
b=obrad;
ly=350+obrad;
score=0;
document.getElementById("score").innerHTML= "Your Score: " + score;
intro.textContent = "CLICK anywhere on the CANVAS to start";
bcolor= paint[Math.floor(Math.random()*4)];
}

//to paint the canvas:
function draw(){
obstacle(a,b);
if (b >= 700-obrad) obstacle(a2,b2-obrad);
drawline();
ball();
}

initialize();
draw();

//setting up click time functions:
canvas.addEventListener("click",function() {
base=by;
if(direction == -1) direction *= -1;
window.clearInterval(IDjump);
window.clearInterval(IDmove);
window.clearInterval(IDspin);
window.clearInterval(IDpoint);

IDjump = window.setInterval(jump, 0.5);
IDspin = window.setInterval(spin,4);
IDmove = window.setInterval(move,6);
IDpoint = window.setInterval(points,100);

intro.textContent = "Press SPACE to pause";
});

//to draw the obstacles:
function obstacle(a,b){

for (let i=0; i<4; i++){
ctx.beginPath();
ctx.fillStyle= paint[i];
ctx.moveTo(a,b);
//ctx.lineTo(a,b+obrad);
ctx.arc(a, b, obrad, quarter*i + change, quarter*(i+1) + change, false);
ctx.fill();
}

ctx.beginPath();
ctx.fillStyle = "black";
ctx.arc(a, b, 90, 0, Math.PI * 2, true);
ctx.fill();
}

//to draw the ball:
function ball(){
ctx.beginPath();
ctx.fillStyle = bcolor;
ctx.arc(bx, by, ballrad, 0, Math.PI * 2, false);
ctx.fill();
}

//to draw the line:
function drawline(){
lx=0;

for (let j=0;j<40;j++){
for (let i=0; i<4; i++){
ctx.beginPath();
ctx.strokeStyle= paint[i];
ctx.moveTo(lx, ly);
lx+=10;
ctx.lineTo(lx, ly);
ctx.lineWidth = 5;
ctx.stroke();
//ctx.arc(a, b, obrad, quarter*i + change, quarter*(i+1) + change, false);
//ctx.fill();
}
}}

//animate the ball on press.
function jump(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
by -= direction;

if (by == base-60) direction *= -1;
if (by == 700+ballrad) gameover();

//condition to check if the ball touches the obstacle:
if (Math.abs(by-b) <= obrad + ballrad && Math.abs(by-b) >= obrad -20 - ballrad ){
let n= colormatch();
if (n) gameover();
}

// condition to check if the ball crosses the line:
if (by == ly) {
paint=shuffle(paint);
bcolor= paint[Math.floor(Math.random()*4)];
}
draw();
}

//to spin the obstacle:
function spin(){
change -= turn;
draw();
}

//function to move the obstacle and the line:
function move(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
b++;
ly++;
if (ly== 700) ly=0;
if (b >= 700-obrad){
obstacle(a2,b2-obrad);
b2++;
if (b > 700+obrad) {b2=0;b=obrad;}
}
draw();
}

//function to shuffle the paint order:
function shuffle(array) {
  let tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

//to check if the ball touched the wrong color:
function colormatch(){


reminder = Math.abs(change % (2*Math.PI));

if (reminder > 0 && reminder < quarter) obcolor= (by-b > 0)? paint[1]: paint[3];
else if (reminder > quarter && reminder < quarter*2) obcolor= (by-b > 0)? paint[2]: paint[0];
else if (reminder > quarter*2 && reminder < quarter*3 ) obcolor= (by-b > 0)? paint[3]: paint[1];
else if (reminder > quarter*3 && reminder < quarter*4) obcolor= (by-b > 0)? paint[0]: paint[2];

if (bcolor == obcolor) return 0;
else return 1;
}

//function to be called when the game ends
function gameover(){
alert("Your score: " + score);
if (score>highscore){
localStorage.setItem("highscore",score);
}
initialize();
}

//function to update the scores in real time:
function points(){
score++;
document.getElementById("score").innerHTML= "Your Score: " + score;
if (score>highscore)
{
document.getElementById("highscore").innerHTML= "High Score: " + score;
}
}

document.addEventListener('keydown', logKey);

function logKey(e) {
    if(e.code == "Space"){

        window.clearInterval(IDjump);
        window.clearInterval(IDmove);
        window.clearInterval(IDpoint);
        intro.textContent = "Click on the CANVAS to Resume";

    }

}