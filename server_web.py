import socket
import os  # pentru dimensiunea fisierului
import threading
import json

# creeaza un server socket
from concurrent.futures import thread

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

clientsockets=[]

def handleClient(clientsocket):
    print(threads)
    cerere = ''
    linieDeStart = ''
    while (True):
        buf = clientsocket.recv(1024)
        if (len(buf) < 1):
            break
        cerere = cerere + buf.decode()
        print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
        pozitie = cerere.find('\r\n')
        if (pozitie > -1 and linieDeStart == ''):
            linieDeStart = cerere[0:pozitie]
            print('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
            break

    print('S-a terminat citirea.')

    if linieDeStart == '':
        clientsocket.close()
        print('S-a terminat comunicarea cu clientul - nu s-a primit niciun mesaj.')
        return
    if linieDeStart.startswith('POST /api/utilizatori HTTP/1.1'):
        print('api/utilizatori request')
        ultimaLinie=cerere.split('\r\n').pop()
        ultimaLinie=ultimaLinie.split('&')
        utilizator=ultimaLinie[0].split('=')[1]
        parola=ultimaLinie[1].split('=')[1]
        with open(
                '../continut/resurse/utilizatori.json', 'r') as output:
            fileStr=str(output.readlines())
            fileStr=fileStr.replace(']','')
            fileStr = fileStr.replace('[', '')

            fileStr.replace("[", '')
            fileStr.replace("]", '')
            fileStr.replace("'", '')
            fileStr.replace("\\", '')
            fileStr='['+fileStr.replace('\'', '')+', {"utilizator": "'+utilizator+'", "parola": "'+parola+'"}]';

            print(fileStr)

        with open(
                '../continut/resurse/utilizatori.json', 'w') as output:
            output.write(fileStr)

        return

    # interpretarea sirului de caractere `linieDeStart`
    elementeLineDeStart = linieDeStart.split()
    # TODO securizare
    numeResursaCeruta = elementeLineDeStart[1]
    if numeResursaCeruta == '/':
        numeResursaCeruta = '/index.html'

    # calea este relativa la directorul de unde a fost executat scriptul
    numeFisier = '../continut' + numeResursaCeruta

    fisier = None
    try:
        # deschide fisierul pentru citire in mod binar
        fisier = open(numeFisier, 'rb')

        # tip media
        numeExtensie = numeFisier[numeFisier.rfind('.') + 1:]
        tipuriMedia = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/js',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'ico': 'image/x-icon',
            'xml': 'application/xml',
            'json': 'application/json'
        }
        tipMedia = tipuriMedia.get(numeExtensie, 'text/plain')
        print("tip media este=" + tipMedia)


        # se trimite raspunsul
        clientsocket.sendall(('HTTP/1.1 200 OK\r\n').encode('utf-8'));
        clientsocket.sendall(('Content-Length: ' + str(os.stat(numeFisier).st_size) + '\r\n').encode('utf-8'));
        clientsocket.sendall(('Content-Type: ' + tipMedia + '\r\n').encode('utf-8'));
        clientsocket.sendall(('Content - Encoding: gzip\r\n').encode('utf-8'));
        clientsocket.sendall(('Server: My PW Server\r\n').encode('utf-8'));
        clientsocket.sendall(('\r\n').encode('utf-8'));

        # citeste din fisier si trimite la server
        buf = fisier.read(1024)
        while (buf):
            clientsocket.send(buf)
            buf = fisier.read(1024)
    except IOError:
        # daca fisierul nu exista trebuie trimis un mesaj de 404 Not Found
        msg = 'Eroare! Resursa ceruta ' + numeResursaCeruta + ' nu a putut fi gasita!'
        print(msg)
        clientsocket.sendall(('HTTP/1.1 404 Not Found\r\n').encode('utf-8'))
        clientsocket.sendall(('Content-Length: ' + str(len(msg.encode('utf-8'))) + '\r\n').encode('utf-8'))
        clientsocket.sendall(('Content-Type: text/plain\r\n').encode('utf-8'))
        clientsocket.sendall(('Content - Encoding: gzip\r\n').encode('utf-8'))
        clientsocket.sendall(('Access - Control - Allow - Origin: *\r\n').encode('utf-8'))
        clientsocket.sendall(('Server: My PW Server\r\n').encode('utf-8'))
        clientsocket.sendall(('\r\n').encode('utf-8'));
        clientsocket.sendall(msg.encode('utf-8'));

    finally:
        if fisier is not None:
            fisier.close()
    clientsocket.close()
    print('S-a terminat comunicarea cu clientul.')


threads=[]
while True:
    #app.run(host='0.0.0.0', port=4996)
    print('#########################################################################')
    print('Serverul asculta potentiali clienti.')
    # asteapta conectarea unui client la server
    # metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
    (clientsocket, address) = serversocket.accept()
    clientsockets.append(clientsocket)
    print('S-a conectat un client.')
    # se proceseaza cererea si se citeste prima linie de text

    th=threading.Thread(handleClient(clientsocket))
    threads.append(th)
    th.start()
