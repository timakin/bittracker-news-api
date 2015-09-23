var express = require('express');
var router = express.Router();
var Promise = require('promise');
var request = require('superagent');

/* GET users listing. */
router.get('/', function(req, res) {
  var targetUrls = [
    "http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fbtcnews.jp%2Ffeed%2F&count=10",
    "http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fnews.bitflyer.jp%2Ffeed%2F&count=10"
  ]

  var promises = [];
  for (var i = 0; i < targetUrls.length; i++) {
    promises[i] = new Promise(function (resolve, reject){
      request(targetUrls[i], function(err, result) {
        if (err) reject(err);
            resolve(result);
        });
    });
  };

  Promise.all(promises)
    .then(function(results) {
      return results.concat();
    })
    .then(function(results) {
      res.json({
        response: results
      });
    });
});

module.exports = router;
