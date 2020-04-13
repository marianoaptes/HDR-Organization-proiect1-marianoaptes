self.setInterval(seeIfChanged(), 1000);
//var last_id=localStorage.getItem('last_id');
var unadded=false;
self.onmessage=function(e){
    if(e.value=='I added stuff')
        unadded=true;
    }
function seeIfChanged()
{
    self.postMessage('change list');
    unadded=false;
   /* var keep_anterior=last_id;
    last_id=localStorage.getItem('last_id');
    if(last_id!=null)
        if(last_id!=keep_anterior)
            self.postMessage('change list');
            */
}