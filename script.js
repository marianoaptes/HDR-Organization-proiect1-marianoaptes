function afisareDetalii()
{
    let currenDate = new Date();
    document.getElementById("data").innerHTML=currenDate.toLocaleTimeString();
    var hour=currenDate.getHours();
    var minutes=currenDate.getMinutes();
    var seconds=currenDate.getSeconds();
}
