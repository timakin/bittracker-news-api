"use strict";

var _         = require('underscore');
var express   = require('express');
var router    = express.Router();
var newsModel = require('../models/news.model');

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
