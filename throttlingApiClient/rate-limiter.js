'use strict'let RateLimiter = function(rate){  if(rate) this.rate = rate;  else this.rate = {'numberOfCalls':600, 'duration': 600*1000};  this.hist = [];};RateLimiter.prototype.submit = function(f){  let self = this;  let now = Date.now();  function callTime(now){    self.hist = self.hist.filter(function(t){return t >= now - self.rate.duration});    if(self.hist.length < self.rate.numberOfCalls) return (now + 1);    else return self.hist[0] + self.rate.duration + 1;  }  //ToDo:};module.exports = RateLimiter;