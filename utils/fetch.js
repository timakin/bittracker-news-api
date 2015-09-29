"use strict";

let request = require('superagent');

const fetch = function(url, cb) {
  return new Promise(function (resolve, reject){
    request(url, function(err, res) {
      if (err) reject(err);
      resolve(cb(res));
    });
  });
};

module.exports = fetch;