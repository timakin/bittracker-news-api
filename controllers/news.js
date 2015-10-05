"use strict";

var _         = require('underscore');
var express   = require('express');
var router    = express.Router();
var newsCollectionModel = require('../models/newsCollection.model');

/* GET users listing. */
router.get('/', (req, res) => {
  let newsCollection = new newsCollectionModel();

  newsCollection.get(req, (items) => {
    res.json({
        response: items
    });
  });
});

module.exports = router;
