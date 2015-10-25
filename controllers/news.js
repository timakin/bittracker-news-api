"use strict";

const _         = require('underscore');
const express   = require('express');
const router    = express.Router();
const newsCollectionModel = require('../models/newsCollection.model');

router.get('/', (req, res) => {
  let newsCollection = new newsCollectionModel();

  newsCollection.get(req, (items) => {
    res.json({
        response: items
    });
  });
});

module.exports = router;
