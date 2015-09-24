var express = require('express');
var router  = express.Router();
var Promise = require('promise');
var request = require('superagent');
var _       = require('underscore');
var api     = require('../config/api.json');
var requestPromise = require('../utils/requestPromise');

/* GET users listing. */
router.get('/jp', function(req, res) {
  var promises = [];
  
  for (var i = 0; i < api.url.jp.length; i++) {
    promises[i] = requestPromise(api.url.jp[i], function(res) {
        var news = [];
        _.map(res.body.items, function(item) {
          if (item.visual && item.visual.url != 'none') {
            news.push({
              title:      item.title,
              url:        item.originId,
              origin:     item.origin.title,
              image_uri:  item.visual.url,
              created_at: item.published
            });
          }
        });
        return news;
    });
  }

  Promise.all(promises)
    .then(function(results) {
      res.json({
        response: getSortedNews(results)
      });
    });
});

var getSortedNews = function(items) {
  var news = [];
  _.map(items, function(item) { news = news.concat(item); });
  return _.sortBy(news, 'created_at').reverse();
}

module.exports = router;
