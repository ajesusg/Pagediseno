from socket import * #libreria para leer la informacion del puerto
import datetime
import pymysql.cursors


IPv4 = "172.31.94.89"  # IPv4 local
Port = 10025  # puerto udp
print("Esperando")

ServerSock = socket(AF_INET, SOCK_DGRAM)  # creacion del socketServerSock.close((IPv4,Port))
ServerSock.bind((IPv4, Port))
while True:
    data, addr = ServerSock.recvfrom(2048)

    data = str(data)
    print(data[3:6])
    if data[3:6] == "REV":
        semanas = str(data[8:12])
        semana = float(semanas)
        dia = str(data[12])
        dian = float(dia)
        hora = str(data[13:18])
        horan = float(hora)
        semanan = semana * 604800 + horan + 315964800 + dian * 86400 - 18000
        string = str(datetime.datetime.fromtimestamp(int(semanan)))
        fecha = string[2:12]
        hora = string[13:21]
        sem = str(datetime.datetime.fromtimestamp(int(semanan)))
        sem1 = sem[0:18]
        print(sem)
        latitud = str(data[19:21] + "." + str(data[21:26]))
        longitud = str(data[26:27] + str(data[28:30]) + "." + str(data[30:35]))
        print("Latitud: {}  Longitud: {}   Fecha: {} ".format(latitud, longitud, sem1))
        # BD Connection
        connection = pymysql.connect(host="jesusdiseno.ciutsojishbs.us-east-1.rds.amazonaws.com", user="jesusdiseno", passwd="jesus199729",
                                     db="jesusdiseno")
        MyCursor = connection.cursor()
        sql = "INSERT INTO datosdiseno(Latitud,Longitud,Fecha) VALUES(%s,%s,%s);"
        MyCursor.execute(sql, (latitud, longitud, sem1))
        connection.commit()
        connection.close()