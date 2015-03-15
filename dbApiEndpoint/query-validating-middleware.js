'use strict'function validate(){  return function* (next) {    if(this.path !== '/api/stats' || this.method !== 'GET') this.throw('404 / Not Found.', 404);    let query = this.query;    try{      query.ad_ids = (function(){        let result = [];        (new Set(([] + query.ad_ids)        .split(',')        .map(function(x){return parseInt(x, 10)})))        .forEach(function(v){result.push(v)});        return result;      })();      if(query.ad_ids.some(function(v){return Number.isNaN(v)})) throw Error('should be numbers');    }    catch(_){      this.throw('400 / Field %ad_ids% is required and must be a comma-separated list of integers.', 400);    }    function validateDate(date){      let timestamp = Date.parse(date);      if (!Number.isNaN(timestamp)){        let d = new Date(timestamp);        return d.getFullYear() + '-'+ ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);      }      else return false;    }    query.start_time = validateDate(query.start_time);    query.end_time = validateDate(query.end_time);    if(!query.start_time) this.throw('400 / Field %start_time% is required and must be a valid Date.', 400);    if(!query.end_time) this.throw('400 / Field %end_time% is required and must be a valid Date.', 400);    this.query = query;    yield next;  }}module.exports = validate;