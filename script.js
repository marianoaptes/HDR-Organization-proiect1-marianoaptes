function extragere()
{
    var number1=Math.floor(Math.random()*100).toString(16);
    var number2=Math.floor(Math.random()*100).toString(16);
    var number3=Math.floor(Math.random()*100).toString(16);
    var number4=Math.floor(Math.random()*100).toString(16);
    var number5=Math.floor(Math.random()*100).toString(16);
    var number6=Math.floor(Math.random()*100).toString(16);
    var number7=Math.floor(Math.random()*100).toString(16);
    var number0=Math.floor(Math.random()*100).toString(16);
    let nrOfMatches=0;
    testInputs(number0,nrOfMatches);
    testInputs(number1,nrOfMatches);
    testInputs(number2,nrOfMatches);
    testInputs(number3,nrOfMatches);
    testInputs(number4,nrOfMatches);
    testInputs(number5,nrOfMatches);
    testInputs(number6,nrOfMatches);
    testInputs(number7,nrOfMatches);

    let st="Extrase: "+" "+number0+" "+number1+" "+number2+" "+number3+" "+number4+"  "+number5+" "+number6+" "+number7
    document.getElementById("st").innerHTML=st;
    document.getElementById("nrOfMatches").innerHTML="Ai "+nrOfMatches+" numere castigatoare";
}
function testInputs(number0, nrOfMatches)
{
    if(number0==document.getElementById("number0").value||number0==document.getElementById("number1").value
    ||number0==document.getElementById("number2").value||number0==document.getElementById("number3").value
    ||number0==document.getElementById("number4").value||number0==document.getElementById("number5").value
    ||number0==document.getElementById("number6").value||number0==document.getElementById("number7").value)
    nrOfMatches++;
}
function getCoordinates()
{
    navigator.geolocation.getCurrentPosition(showCoords,geoError);
    document.getElementById("st").innerHTML=" ";/// this is here just so it can be loaded only once
    //, so that the button can change it without being later reseted
    document.getElementById("nrOfMatches").innerHTML=" "; /// same here
}
function afisareDetalii()
{
    let currenDate = new Date();
    document.getElementById("data").innerHTML="Date: "+ currenDate.toLocaleDateString();
    document.getElementById("hours").innerHTML="Time: "+ currenDate.getHours()+":"+currenDate.getMinutes()+":"+currenDate.getSeconds();
    document.getElementById("url").innerHTML="Url: "+location.href;
    
    document.getElementById("brow").innerHTML="Browser: "+navigator.appName+" "+navigator.appVersion;
    document.getElementById("os").innerHTML="Operating System: "+navigator.platform;
}
function showCoords(position){
    document.getElementById("loc").innerHTML="Latitudine: "+position.coords.latitude.toFixed(2)+
    ",    Longitudine: "+position.coords.longitude.toFixed(2);
}

function geoError(error){
    document.getElementById("loc").innerHTML="Unable to find location";
}

function canvasFunctionality()
{

}


function init() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var rect = {};
    var drag = false;
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(e) {
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
}

function mouseUp() { drag = false; }

function mouseMove(e) {
    if (drag) {
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(imageObj, 0, 0);
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.strokeStyle = 'red';
        ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    }
}
