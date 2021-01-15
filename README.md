# development05-eindwerk

## project description

Plants have a constant movement, Darwin called this **circumnutations**. The *Calathea plant* controls its movements (circumnutations) by a short electrical pulse which makes it possible to read out these values through electrodes. The receiving value will be saved in the Postgress Database. 
With an expansion, several plants could be connected and read out. When storing these values, the plant from which the data is read is taken into account. Each value is linked to the controlling plant. 



## Getting started
Make sure you have following software installed on your computer:
+ Docker desktop
+ TablePlus
+ Postman

1. **Start the API en DB**
For the connection to the DB check the `docker-compose.yml` document. To start the program run `docker-compose up` in the terminal.
2. **Start the tests**  
To run the tests run `npm test a`

### Endpoints
```
http://localhost:5000/
http://localhost:5000/test
```

```
http://localhot:5000/plants
http://localhost:5000/plants/:uuid
```

```
http://localhost:5000/meetresultaten
http://localhost:5000/meetresultaten/:plantUuid
```
### Plant integration requirements 
###### The plant setup is in progress. It is not yet integrated in this project. 
1. Arduino UNO
2. Arduino Ehternetshield
3. network cable
4. heart monitor sensor 
5. 3 electrodes
6. Calathea plant

#### Circuit
![Connection heart monitor sensor to Arduino UNO](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhub360.com.ng%2Fwp-content%2Fuploads%2F2017%2F08%2FHeart_Rate_Monitor_bb.png&f=1&nofb=1 "Heart Monitor Sensor connection")

## Status
**version 26 December 2020**
+ integration test
+ unit tests
+ endpoints `GET` `DELETE` `READ` `POST` from `/plants` and `/meetresultaten`

## Auteurs
Britt Leysen

### Sources

[Supertest](https://www.npmjs.com/package/supertest)
[Jest.js](https://jestjs.io/en/)
[Knex.js](http://knexjs.org/)
[Simple ECG monitor setup](https://maker.pro/arduino/projects/how-to-build-ecg-heart-measuring-monitor-system)