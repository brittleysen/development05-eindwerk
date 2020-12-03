# contributing guidelindes
---
//intro
hoever ste je open voor nieuwe dingen etc. 

## report bugs
* open a ticket on github
* set application to VERBOSE 
* include your Error logs
* explain the setup
* include the following
  
```
OS:
Docker version:
Global npms:
nmp version:
```
voorbeelden van good en bad requests
good: Getting error "" wehn trying to call endpoint
 0 => what data sending
Bad: endpoint does not work

## suggest new features
* Open a featrure request on github
* declare why usefull

(welke info wil ik krijgen wanneer mensen dat gaan doen)

## guidelines for development
VREWIJS OOK NAAR CODE OF CONDUCT 

//explain how to set the system for development 
env file adaption
  * DB dev 
  * VERBOSE

welke globals kunnen ze gebruiken

what kind of tests need to be there. 
mention develoment DB

### logging
```
if (process.env.VERBOSE == 2) {
    console.log()
}
```
expected log levels:

| verbose level | code | 
|---|---|
|2| console.log|
|1| console.warn|
|0| console.error|

## roadmap and vision 
mention van een forum als dat er is. 
discord? 

## get in touch
e-mails kunnen sturen
discord 
adnere manier
via Github