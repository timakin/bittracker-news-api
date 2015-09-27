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
  newsModel.getNews(function(news) {
    res.json({
      response: newsModel.sortByCreatedAt(news)
    });
  });
});

module.exports = router;
