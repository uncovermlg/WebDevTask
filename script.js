//Predefined scores
localStorage.setItem("h1",200000);
localStorage.setItem("h2",200000);
localStorage.setItem("h3",200000);
localStorage.setItem("h4",200000);
localStorage.setItem("h5",200000);
// Variables to hold the current high score values. These are changed after the game
let s1=localStorage.getItem("h1");
let s2=localStorage.getItem("h2");
let s3=localStorage.getItem("h3");
let s4=localStorage.getItem("h4");
let s5=localStorage.getItem("h5");


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

//variable to hold setInterval() function and stopwatch status
let interval=null;
let status="stop";

//Variable to hold the values in the grid
let grid=document.getElementsByClassName("cell");
 for (let j=0;j<20;j++){

       grid[j].addEventListener("click",function (){
        if(smallest==j) game(j);
        });
    }

//Function to start a new game:
function newgame(){
    //alert(document.getElementById("1").innerHTML);
    initialise();
    status="stop";
    window.clearInterval(interval);
    milli=0;
    min=0;
    sec=0;
    document.getElementById("display").innerHTML= "00:00:00";


    }

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
/*function clickmode(){

 for (let j=0;j<20;j++){

       grid[j].addEventListener("click",function (){
        if(smallest==j) game(j);
        });
    }
}*/

//Funtion to covert scores to corresponding timings
function time(x){
if (x==200000) return 00+":"+00+":"+00;
else{
let dm,ds,dmi="0";
let m= Math.floor(x/60000);
if(m<10) dm="0"+m;
let s= Math.floor((x-m*60000)/1000);
if(s<10) ds="0"+s;
let mi= x-m*60000-s*1000;
if(mi<10) dmi="0"+mi;
return dm+ ":" + d + ":" + dmi;
}
}

//Function to save score and update the table
function savegame(n,score){

    if (n==1){
     [s5,s4]=[s4,s5];
     [s4,s3]=[s3,s4];
     [s3,s2]=[s2,s3];
     [s2,s1]=[s1,s2];
     [s1,score]=[score,s1];
    }
    else if(n==2) {
    [s5,s4]=[s4,s5];
    [s4,s3]=[s3,s4];
    [s3,s2]=[s2,s3];
    [s2,score]=[score,s2];
    }
    else if(n==3){
    [s5,s4]=[s4,s5];
    [s4,s3]=[s3,s4];
    [s3,score]=[score,s3];
    }
    else if(n==4){
    [s5,s4]=[s4,s5];
    [s4,score]=[score,s4];

    }
    else if(n==5){
    [s5,score]=[score,s5];
    }


    document.getElementById("H1").innerHTML= time(s1);
    document.getElementById("H2").innerHTML= time(s2);
    document.getElementById("H3").innerHTML= time(s3);
    document.getElementById("H4").innerHTML= time(s4);
    document.getElementById("H5").innerHTML= time(s5);
}

//Function for game mechanics
function game(index){
   if(grid[index].innerHTML == 1) {startstop();}

// This if condition is a set of all things to be executed once the game is over
   if(grid[index].innerHTML==40) {

   grid[index].innerHTML=null;
   startstop();
   alert("Your timing is" + dmin + ":" + dsec + ":" + dmilli);
   let score= parseInt(dmin)*60000 + parseInt(dsec)*1000 + parseInt(dmilli);


    for(let i=0; i<localStorage.length; i++) {
    //alert(score);
        let key = localStorage.key(i);
        alert(`${key}: ${localStorage.getItem(key)}`);
        if(key=="h1" && localStorage.getItem(key)>score){ savegame(1,score);}
        else if(key=="h2" && localStorage.getItem(key)>score){ savegame(2,score);}
        else if(key=="h3" && localStorage.getItem(key)>score){ savegame(3,score);}
        else if(key=="h4" && localStorage.getItem(key)>score){ savegame(4,score);}
        else if(key=="h5" && localStorage.getItem(key)>score){ savegame(5,score);}
        else alert("You did not beat the high scores :( ");

        //alert(`${key}: ${localStorage.getItem(key)}`);
    }
   newgame();
   }

    smallest=smallnum(parseInt(grid[index].innerHTML) +1);
    if(grid[index].innerHTML >= 21){
        grid[index].innerHTML=null;

     }
    else
      { grid[index].innerHTML=20+parseInt(grid[index].innerHTML);}

       //passes the next smallest number to search for


}

//Stopwatch function:
function stopwatch(){
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
function startstop(){
if(status=="stop")
{
interval=window.setInterval(stopwatch,10);

status="start";
}
else{
window.clearInterval(interval);
status="stop";
}
}





