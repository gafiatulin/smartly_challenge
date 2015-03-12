#throttlingApiClient
The Rate is specified in terms of X calls in Y time period.
The throttle uses a rolling time window rather than quantising time into discrete blocks. So in continuous time, the throttle is never exceeded.
##Usage example
```node
'use strict'
var api = require('throttlingApiClient');
api.init('https://graph.facebook.com/v2.2', //Convenience initializer for endpoint, token and rate
         'CAACEdEose0cBALv0O...Lp6FXbudnd00wZDZD',
         { numberOfCalls: 5, duration:  20000 }); //Rate: 5 requests per 20 seconds
function now(){
  return Math.floor(Date.now()/1000);
}
var t0 = now();
var emmiter = setInterval(
  function(){
    api.get('/me') //Immediately returns ES6 Promise
    .then(
      function(result){ //onFulfilled
        console.log((now() - t0) + ' ' + result.id);
      },
      function(error){ //onRejected
        console.log((now()- t0) + ' ' + error);
      }
    );
  },
  2000 //Emit 1 req per 2 sec
);
setTimeout(function(){clearInterval(emmiter)}, 32000); //Runinig emitter for 30 sec
```
prints to console
```bash
2 10200278211114438
4 10200278211114438
6 10200278211114438
8 10200278211114438
10 10200278211114438
22 10200278211114438
24 10200278211114438
26 10200278211114438
28 10200278211114438
30 10200278211114438
42 10200278211114438
44 10200278211114438
46 10200278211114438
48 10200278211114438
50 10200278211114438
```
