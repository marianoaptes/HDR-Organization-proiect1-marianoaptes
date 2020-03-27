import socket
import os.path
from os import path

# creeaza un server socket
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# specifica ca serverul va rula pe portul 5678, accesibil de pe orice ip al serverului
serversocket.bind(('', 5678))
# serverul poate accepta conexiuni; specifica cati clienti pot astepta la coada
serversocket.listen(5)

while True:
	print('#########################################################################')
	print('Serverul asculta potentiali clienti.')
	# asteapta conectarea unui client la server
	# metoda `accept` este blocanta => clientsocket, care reprezinta socket-ul corespunzator clientului conectat
	(clientsocket, address) = serversocket.accept()
	print('S-a conectat un client.')
	# se proceseaza cererea si se citeste prima linie de text
	cerere = ''
	linieDeStart = ''
	while True:
		data = clientsocket.recv(1024)
		cerere = cerere + data.decode()
		print('S-a citit mesajul: \n---------------------------\n' + cerere + '\n---------------------------')
		pozitie = cerere.find('\r\n')
		if (pozitie > -1):
			linieDeStart = cerere[0:pozitie]
			print('S-a citit linia de start din cerere: ##### ' + linieDeStart + ' #####')
			fisierCerut=(linieDeStart.split(" ")[1])
			fisierCerut=fisierCerut[1:len(fisierCerut)]
			mesaj="Hello World! - "+fisierCerut;
			if (path.exists('..\\continut\\'+fisierCerut)):
				raspunsHTTP="HTTP/1.1 200 OK \r\n"+"Content-Type: text/html"+"\n"+"\r\n"+"Server: NoobServer"+"\r\n"+"<html><body>"+mesaj+"</body></html>\n"
				clientsocket.sendall(raspunsHTTP.encode('utf-8'))
			else:
				raspunsHTTP = "HTTP/1.1 404 Not Found \r\n" + "Content-Type: text/html" + "\n" + "\r\n" + "Server: NoobServer\n" + "\r\n" + "<html><body>" + "Nu exista fisierul" + "</body></html>\n"
				clientsocket.sendall(raspunsHTTP.encode('utf-8'))
			print("..\\continut\\"+fisierCerut)
			break



	print('S-a terminat cititrea.')
	# TODO interpretarea sirului de caractere `linieDeStart` pentru a extrage numele resursei cerute
	# TODO trimiterea răspunsului HTTP
	clientsocket.close()
	print('S-a terminat comunicarea cu clientul.')