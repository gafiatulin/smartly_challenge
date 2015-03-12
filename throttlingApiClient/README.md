#throttlingApiClient
The Rate is specified in terms of X calls in Y time period. The throttle uses a rolling time window rather than quantising time into discrete blocks. So in continuous time, the throttle is never exceeded.
##Usage example
```node
'use strict'
var api = require('throttlingApiClient');
api.init('https://graph.facebook.com/v2.2', //Convenience initializer for endpoint, token and rate.
         'CAACEdEose0cBALv0O...Lp6FXbudnd00wZDZD',
         { numberOfCalls: 5, duration:  20000 }); //Rate: 5 requests per 20 seconds.
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
3 10200278211114438
5 10200278211114438
7 10200278211114438
9 10200278211114438
11 10200278211114438
23 10200278211114438
25 10200278211114438
27 10200278211114438
29 10200278211114438
31 10200278211114438
43 10200278211114438
45 10200278211114438
47 10200278211114438
49 10200278211114438
51 10200278211114438
```
