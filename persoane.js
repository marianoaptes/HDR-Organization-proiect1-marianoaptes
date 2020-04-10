function incarcaPersoane()
{
    const xhr= new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                var response = xhr.responseText;
                console.log(response);

                parser = new DOMParser();
                xmlDoc = parser.parseFromString(response,"text/xml");

                document.getElementById("continut").innerHTML =
                console.log(xmlDoc.getElementsByTagName("persoane"));
            }

            if(xhr.status==400)
            {
                console.log('file or resource not found');
            }
        }
    }
 
    xhr.open('get','resurse/persoane.xml',true);
    xhr.setRequestHeader("Content-type", "text/xml");
    xhr.send();
}