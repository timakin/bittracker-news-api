"use strict";

var _              = require('underscore');
var endpoints      = require('../config/endpoints.json');
var express        = require('express');
var router         = express.Router();
var request        = require('superagent');
var newsModel      = require('../models/news.model');
var requestPromise = require('../utils/requestPromise');

/* GET users listing. */
router.get('/jp', (req, res) => {
  let News = new newsModel();

  News.getNews((news) => {
    res.json({
      response: News.sortByCreatedAt(news)
    });
  });
});

module.exports = router;
