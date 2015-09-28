"use strict";

var request = require('superagent');

const fetch = function(url) {
	return new Promise(function (resolve, reject){
      request(url, function(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
};

module.exports = fetch;