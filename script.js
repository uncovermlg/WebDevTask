let milli=0;
let sec=0;  //Define variables to hold time values
let min=0;

let dmilli=0;
let dsec=0;    //Define variables to hold "display" value
let dmin=0;

let smallest=0; //Variable to hold the index of the cell with the smallest number

//An array to hold numbers from 1 to 20
let a=[];
for (let i=0;i<20;i++) a[i]=i+1;

//Variable to hold the values in the grid
let grid=document.getElementsByClassName("cell");


//Function to check is all numbers have been clicked
/*function checknull()
{
for (let i=0;i<20;i++){
if (grid[i].innerHTML != null) return 0;
}
return 1;
}*/

//Function to find the index if the smallest number
function smallnum(x){
for (i=0;i<20;i++){
if (grid[i].innerHTML==x) return i;
}}

//Function to randomize the Array:
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

//Function to initialise the board
function initialise(){
a = shuffle(a);
for (i=0;i<20;i++){
grid[i].innerHTML=a[i];
if (grid[i].innerHTML==1) smallest=i;}

}

//Function executed while the user is clicking
function clickmode(){
 for (let j=0;j<20;j++){
       // checknull();
        grid[j].addEventListener("click",function (){
        if(smallest==j) game(j);
        });
    }
}


//Function for game mechanics
function game(index){
   if(game[index].innerHTML==1) startstop();
   if(game[index].innerHTML==40) {
   startstop();
   grid[index].innerHTML=null;
   alert("Your timing is" + dmin + ":" + dsec + ":" + dmilli);
   //savegame(); (to be added later)
   newgame();
    }
    if(grid[smallest].innerHTML>= 21){
        grid[smallest].innerHTML=null;
        }
    else
      { grid[smallest].innerHTML+=20;

      smallest=smallnum(grid[smallest].innerHTML -20 +1); //passes the next smallest number to search for
      }
      click();
}



//variable to hold setInterval() function and stopwatch status
let interval=null;
let status="stop";

//Stopwatch function:
function stopwatch()
{
    milli++;
    if (milli/100==1)
    {   milli=0;
        sec++;
        if (sec/60==1)
            {sec=0;min++;}
    }

    if(milli<10)
    {dmilli = "0" + milli.toString();}
    else{dmilli=milli;}
    if(sec<10)
    {dsec = "0" + sec.toString();}
    else{dsec=sec;}
    if(min<10)
    {dmin = "0" + min.toString();}
    else{dmin=min;}

document.getElementById("display").innerHTML= dmin + ":" + dsec + ":" + dmilli;
}

//Function to control stop watch.
function startstop()
{
if(status=="stop")
{
interval=window.setInterval(stopwatch,10);
//document.getElementById("startstop").innerHTML="Stop";
status="start";
}
else{
window.clearInterval(interval);
//document.getElementById("startstop").innerHTML="Start";
status="stop";
}
}

//Function to reset the stopwatch:
function newgame(){
    window.clearInterval(interval);
    milli=0;
    min=0;
    sec=0;
    document.getElementById("display").innerHTML= "00:00:00";
    initialise();
   clickmode();
    }



