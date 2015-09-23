var express = require('express');
var router = express.Router();
var Promise = require('promise');
var request = require('superagent');
var _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res) {
  var targetUrls = [
    "http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fbtcnews.jp%2Ffeed%2F&count=10",
    "http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fnews.bitflyer.jp%2Ffeed%2F&count=10"
  ]

  var promises = [];
  
  for (var i = 0; i < targetUrls.length; i++) {
    promises[i] = new Promise(function (resolve, reject){
      request(targetUrls[i], function(err, res) {
        if (err) reject(err);
        var news = [];  
        _.map(res.body.items, function(item) {
          news.push({
            title:      item.title,
            url:        item.originId,
            origin:     item.origin.title,
            image_uri:  item.visual.url,
            created_at: item.published
          });
        });
        resolve(news);
      });
    });
  };

  Promise.all(promises)
    .then(function(results) {
      var news = [];
      _.map(results, function(result) { news = news.concat(result); });
      news = _.sortBy(news, 'created_at').reverse();
      res.json({
        response: news
      });
    });
});

module.exports = router;
