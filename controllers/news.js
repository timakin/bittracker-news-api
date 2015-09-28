"use strict";

var _         = require('underscore');
var express   = require('express');
var router    = express.Router();
var newsCollectionModel = require('../models/newsCollection.model');

/* GET users listing. */
router.get('/jp', (req, res) => {
  let newsCollection = new newsCollectionModel();

  newsCollection.get((items) => {
    res.json({
      response: newsCollection.sortByCreatedAt(items)
    });
  });
});

module.exports = router;
