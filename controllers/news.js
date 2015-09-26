var _              = require('underscore');
var endpoints      = require('../config/endpoints.json');
var express        = require('express');
var router         = express.Router();
var Promise        = require('promise');
var request        = require('superagent');
var newsModel      = require('../models/news.model');
var requestPromise = require('../utils/requestPromise');

/* GET users listing. */
router.get('/jp', function(req, res) {
  var promises = [];
  for (var i = 0; i < endpoints.feedly.jp.length; i++) {
    promises[i] = requestPromise(endpoints.feedly.jp[i], function(res) {
        return newsModel.getNewsItems(res.body.items);
    });
  }

  Promise.all(promises)
    .then(function(results) {
      res.json({
        response: newsModel.getSortedNews(results)
      });
    });
});

module.exports = router;
