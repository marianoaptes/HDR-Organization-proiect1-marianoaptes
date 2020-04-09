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

function schimbaContinut(resursa)
{
    const xhr= new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                document.getElementById('continut').innerHTML = xhr.responseText;
            }

            if(xhr.status==400)
            {
                console.log('file or resource not found');
            }
        }
    }
 
    xhr.open('get',resursa+'.html',true);
    xhr.setRequestHeader("Content-type", "text/html");
    xhr.send();

    var a=$( ".menu a [data-id="+resursa+"]" );
    $( ".menu a [data-id="+resursa+"]" ).children().addClass('actual');
    $( ".menu a .actual" ).children().removeClass('actual');
}

var rectangle = {
    x1: undefined,
    y1: undefined,
    x1: undefined,
    y1: undefined,
    setted: 0,
    draw: function()
    {
        var color1 = document.getElementById("favcolor1").value;
        var color2 = document.getElementById("favcolor2").value;
        ctx.beginPath();
        ctx.rect(this.x1,this.y1,this.x2-this.x1,this.y2-this.y1);
        console.log(this.x1,this.y1,Math.abs(this.x2-this.x1),Math.abs(this.y2-this.y1));
        ctx.fillStyle = color1;
        ctx.strokeStyle = color2;
        ctx.fill();
        ctx.stroke();
    },
    setF: function(x1,y1)
    {
        this.x1=x1;
        this.y1=y1;
        this.setted=1;
    },
    setS: function(x2,y2)
    {
        this.x2=x2;
        this.y2=y2;
        this.draw();
        this.setted=0;
    },
    getSetted()
    {
        return this.setted;
    }
}
function mouseClick(x,y){
    console.log("at least sees the event\n "+x);
    if(rectangle.getSetted()) rectangle.setS(x,y);
    else rectangle.setF(x,y);
}
function init(){
    let canvas = document.querySelector('canvas');
    console.log(canvas);
    ctx = canvas.getContext('2d');
    console.log(ctx);
    canvas.addEventListener("click", function(event)
    {
        var cRect = canvas.getBoundingClientRect();        
        var canvasX = Math.round(event.x - cRect.left);  
        var canvasY = Math.round(event.y - cRect.top);   
        mouseClick(canvasX,canvasY);
    });
}
function clearArea()
{
    canvas=document.querySelector('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}
let ctx=null;

function InsertInTableLine()
{
    try{
        let tabel = document.getElementById("tabel");
        let culoare = document.getElementById("tablecolor").value;
        let linie=document.getElementById("numar").value;
        let oCols = tabel.getElementsByTagName('td');
        let oRows = tabel.getElementsByTagName('tr','th'); //1 pentru header-ul tabelului
        let iColsCount = oCols.length/(oRows.length);
        let row = tabel.insertRow(linie);
        let cell=null;
        for(var i=0;i<iColsCount;i++)
        {
        cell = row.insertCell(i);
        cell.innerHTML = "NEW CELL";
        cell.style.backgroundColor = culoare;
        }
        document.getElementById("eventualMesajDeEroare").innerHTML="\n Inserare reusita";
   }
    catch{
        document.getElementById("eventualMesajDeEroare").innerHTML="Inserare imposibila, date invalide";
    }
}
function InsertInTableColumn()
{
    try{
        let tabel = document.getElementById("tabel");
        let culoare = document.getElementById("tablecolor").value;
        let coloana=document.getElementById("numar").value;
        let cell=null;
        for(var i=0;i<tabel.rows.length;i++)
        {
        cell = tabel.rows[i].insertCell(coloana);
        cell.innerHTML = "NEW CELL";
        cell.style.backgroundColor = culoare;
        }
        document.getElementById("eventualMesajDeEroare").innerHTML="\n Inserare reusita";
   }
    catch{
        document.getElementById("eventualMesajDeEroare").innerHTML="Inserare imposibila, date invalide";
    }
}
function ChangeLayout1x4()
{
    document.getElementById("sec1").className="s1x4";
    document.getElementById("sec2").className="s1x4";
    document.getElementById("sec3").className="s1x4";
    document.getElementById("sec4").className="s1x4";
}
function ChangeLayout4x1()
{
    document.getElementById("sec1").className="s4x1";
    document.getElementById("sec2").className="s4x1";
    document.getElementById("sec3").className="s4x1";
    document.getElementById("sec4").className="s4x1";
}
function ChangeLayout2x2()
{
    document.getElementById("sec1").className="s2x2";
    document.getElementById("sec2").className="s2x2";
    document.getElementById("sec3").className="s2x2";
    document.getElementById("sec4").className="s2x2";
}
