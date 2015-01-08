'use strict';

var _ = require('lodash');
var redis = require("redis");
var config = require('../../../config/environment');
var client = redis.createClient(config.redis.port, config.redis.host, {
  auth_pass: config.redis.password
});
var validator = require('validator');
var async = require('async');
var availability = require('../../../components/availability');
var amiibos = require('../../../components/amiibos');

// Get status of an amiibo
exports.index = function(req, res) {
  var name = req.param('name');
  var zip = req.param('zip');
  // In miles
  var radius = req.param('radius');
  var region = req.param('region');
  if(validator.isNull(name)) {
    return res.status(400).jsonp({message: 'Missing Amiibo name.', names: Object.keys(amiibos)});
  }
  if(validator.isNull(zip)) {
    return res.status(400).jsonp({message: 'Missing zipcode.'});
  }
  if(validator.isNull(radius)) {
    radius = 10;
  }
  if(validator.isNull(region)) {
    region = 'us';
  }
  if(!validator.isName(name)) {
    return res.status(400).jsonp({message: 'Invalid Amiibo name.', names: Object.keys(amiibos)})
  }
  if(!validator.isZipcode(zip, 'US')) {
    return res.status(400).jsonp({message: 'Invalid zipcode, must be 5 digits and a US zipcode.'});
  }
  var amiibo = amiibos[name];
  var storeNames = Object.keys(amiibo);
  var amiiboResp = {};
  async.eachLimit(storeNames, 10, function (store, callback) {
    if(store === 'walmart') {
      var redisKey = name + '-us-walmart';
      client.get(redisKey, function (error, reply) {
        if(error) {
          return callback('Could not get status of Walmart data.');
        }
        if(!reply) {
          availability.walmart(amiibo[store], function (error, walmartData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Walmart data.');
            }
            amiiboResp['walmart'] = walmartData;
            client.set(redisKey, JSON.stringify(walmartData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['walmart'] = JSON.parse(reply);
          return callback();
        }
      });
    } else if(store === 'bestbuy') {
      var redisKey = name + '-us-' + zip + '-' + radius + '-bestbuy';
      client.get(redisKey, function (error, reply) {
        if(error) {
          return callback('Could not get status of Bestbuy data.');
        }
        if(!reply) {
          availability.bestbuy(amiibo[store], zip, radius, function (error, bestbuyData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Bestbuy data.');
            }
            amiiboResp['bestbuy'] = bestbuyData;
            client.set(redisKey, JSON.stringify(bestbuyData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['bestbuy'] = JSON.parse(reply);
          return callback();
        }
      });
    } else if(store === 'gamestop') {
      var redisKey = name + '-us-' + zip + '-gamestop';
      client.get(redisKey, function (error, reply) {
        if(error) {
          return callback('Could not get status of Gamestop data.');
        }
        if(!reply) {
          availability.gamestop(amiibo[store], zip, function (error, gamestopData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Gamestop data.');
            }
            amiiboResp['gamestop'] = gamestopData;
            client.set(redisKey, JSON.stringify(gamestopData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['gamestop'] = JSON.parse(reply);
          return callback();
        }
      });
    } else if(store === 'toysrus') {
      var redisKey = name + '-us-' + zip + '-' + radius + '-toysrus';
      client.get(redisKey, function (error, reply) {
        if(error) {
          return callback('Could not get status of Toys-R-Us data.');
        }
        if(!reply) {
          availability.toysrus(amiibo[store], zip, radius, function (error, toysrusData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Toys-R-Us data.');
            }
            amiiboResp['toysrus'] = toysrusData;
            client.set(redisKey, JSON.stringify(toysrusData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['toysrus'] = JSON.parse(reply);
          return callback();
        }
      });
    } else if(store === 'target') {
      var redisKey = name + '-us-' + zip + '-' + radius + '-target';
      client.get(redisKey, function (error, reply) {
        if(error) {
          console.log(error);
          return callback('Could not get status of Target data.');
        }
        if(!reply) {
          availability.target(amiibo[store], zip, radius, function (error, targetData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Target data.');
            }
            amiiboResp['target'] = targetData;
            client.set(redisKey, JSON.stringify(targetData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['target'] = JSON.parse(reply);
          return callback();
        }
      });
    } else if(store === 'amazon') {
      var redisKey = name + '-us-' + zip + '-' + radius + '-amazon';
      client.get(redisKey, function (error, reply) {
        if(error) {
          return callback('Could not get status of Amazon data.');
        }
        if(!reply) {
          availability.amazon(amiibo[store], zip, radius, function (error, amazonData) {
            if(error) {
              console.log(error);
              return callback('Could not get status of Amazon data.');
            }
            amiiboResp['amazon'] = amazonData;
            client.set(redisKey, JSON.stringify(amazonData));
            client.expire(redisKey, 60);
            return callback();
          });
        } else {
          amiiboResp['amazon'] = JSON.parse(reply);
          return callback();
        }
      });
    } else {
      return callback();
    }
  }, function (error) {
    if(error) {
      return res.status(500).jsonp({message: error});
    }
    return res.jsonp(amiiboResp);
  });
};

validator.extend('isName', function (str) {
  var amiiboNames = Object.keys(amiibos);
  if(amiiboNames.indexOf(str) !== -1) {
    return true;
  }
  return false;
});

validator.extend('isZipcode', function (str, type) {
  switch(type) {
    case 'US':
    var usRegex = new RegExp(/^\d{5}$/);
    return usRegex.test(str);
    default:
    return false;
  }
});