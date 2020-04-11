function incarcaPersoane()
{
    const xhr= new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState==4)
        {
            if(xhr.status==200)
            {
                var inner=document.getElementById("persoane").innerHTML='';
                var response = xhr.responseXML;
                console.log(response);

                $('#persoane').append($('<tr />').append(
                    $('<th />',{text: 'Nume'}),
                    $('<th />',{text: 'Prenume'}),
                    $('<th />',{text: 'Varsta'}),
                    $('<th />',{text: 'Culoare preferata'}),
                    $('<th />',{text: 'Adresa'})));

                $(response).find('persoane persoana').each(function(){
                $nume=$(this).find('nume');
                $prenume=$(this).find('prenume');
                $varsta=$(this).find('varsta');
                $culoarePreferata=$(this).find('culoarePreferata');
                $adresa=$(this).find('adresa');
                
                    $('#persoane').append($('<tr />').append(
                        $('<td />',{text: $nume.text()}),
                        $('<td />',{text: $prenume.text()}),
                        $('<td />',{text: $varsta.text()}),
                        $('<td />',{text: $culoarePreferata.text()}),
                        $('<td />',{text: $adresa.text()})));
                })
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
    /*$.ajax({
        url: 'continut/resurse/persoane.xml',
        dataType:'xml',
        success: function(data){
            },
        error: function(){
            $('#continut').append('Nu s-au putut prelua datele');
        }
    });*/
}