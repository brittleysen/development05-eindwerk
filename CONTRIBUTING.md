# contributing guidelindes
---

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
###### Example good & bad requests
**Good:** Getting error "" wehn trying to call endpoint
 0 => what data sending

**Bad:** endpoint does not work

## suggest new features
* Open a featrure request on github
* declare why usefull

## guidelines for development
Check out the code of conduct

//explain how to set the system for development 
env file adaption
  * DB dev 
  * VERBOSE

###### global variables
```
const port = 500
```

###### testing
+ unit tests
+ integration test

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

## get in touch
contact via Github