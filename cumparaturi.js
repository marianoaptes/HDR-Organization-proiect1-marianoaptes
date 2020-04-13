/*var myWorker=new Worker('js/worker.js');
window.setInterval(see(),1000);
function see(){
if(window.Worker){
    myWorker.onmessage=function(e){
        if(e.value=='change list')
        var id_to_add_to_list=sessionStorage.getItem('last_id');
        if(id_to_add_to_list!=undefined){
        var obj_prod=$.parseJSON(sessionStorage.getItem('obj_'+id_to_add_to_list));
        console.log('obj_'+id_to_add_to_list+ 'face ceva');
        document.getElementById('lista').innerHTML=id_to_add_to_list+". "+obj_prod.Nume()+"  "+obj_prod.Cantitate();
        console.log(obj_prod);
    }
}
}}
*/
class Produs{
    constructor(nume, cantitate){
        this.nume=nume;
        this.cantitate=cantitate;
    }  
    Nume(){
        return this.nume;
    }
    Cantitate(){
        return this.cantitate;
    }
}

function adauga(){
    var id=0;
    var last_id=sessionStorage.getItem('last_id');
    if (last_id!=null)
        id=(parseInt(last_id)+1);
    console.log('last: '+last_id);
    console.log('id: ',id);
    sessionStorage.setItem('last_id',id);

    var nume=document.getElementById("nume").value;
    var cantitate=document.getElementById("cantitate").value;
    
    var prod=new Produs(nume, cantitate)
    sessionStorage.setItem('obj_'+id, JSON.stringify(prod));
    var obj_prod=$.parseJSON(sessionStorage.getItem('obj_'+id));
    console.log(obj_prod);
    document.getElementById("lista").innerHTML+=('<br>'+id+". "+obj_prod.nume+",  "+obj_prod.cantitate);
        
   // myWorker.postMessage('I added stuff');
}

