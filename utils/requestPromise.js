var request = require('superagent');

var requestPromise = function(url, cb) {
	return new Promise(function (resolve, reject){
      request(url, function(err, res) {
        if (err) reject(err);
        resolve(cb(res));
      });
    });
};

module.exports = requestPromise;