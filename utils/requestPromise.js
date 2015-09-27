"use strict";

var request = require('superagent');

const requestPromise = function(url, cb) {
	return new Promise(function (resolve, reject){
      request(url, function(err, res) {
        if (err) reject(err);
        resolve(cb(res));
      });
    });
};

module.exports = requestPromise;