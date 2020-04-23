//Define vars to hold time values
let milli=0;
let sec=0;
let min=0;

//Define variable to hold "display" value

let dmilli=0;
let dsec=0;
let dmin=0;

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

//Display updated time values:
document.getElementById("display").innerHTML= dmin + ":" + dsec + ":" + dmilli;
}


function startstop()
{
if(status=="stop")
{
interval=window.setInterval(stopwatch,10);
document.getElementById("startstop").innerHTML="Stop");
status="start";
}
else{
window.clearInterval(interval);
document.getElementById("startstop").innerHTML="Start");
status="stop";
}
}

//Function to reset the stopwatch:
function reset(){
    window.clearInterval(interval);
    milli=0;
    min=0;
    sec=0;
    document.getElementById("display").innerHTML= "00:00:00";
    document.getElementById("startstop").innerHTML="Start";
    }


