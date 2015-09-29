"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');
var newsModel = require('./news.model');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _filterItemsByImageExistance(items) {
    return _.select(items, (item) => { return (item.visual && item.visual.url != 'none') });
  }

  _parseNewsModelAsObject(items) {
    return _.flatten(items).map((item) => { return item.toObject() });
  }

  _sortByCreatedAt(items) {
    return _.sortBy(items, 'created_at').reverse();
  }

  _createNewsModelByFeedly(item) {
    return new newsModel({
      title:      item.title,
      url:        item.originId,
      origin:     item.origin.title,
      image_uri:  item.visual.url,
      created_at: item.published
    });
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i], (res) => { return res.body.items });
    }
    Promise.all(promises)
      .then((items) => {
        return _.flatten(items);
      })
      .then((items) => {
        return this._filterItemsByImageExistance(items);
      })
      .then((items) => {
        return _.map(items, (item) => { return this._createNewsModelByFeedly(item) });
      })
      .then((items) => {
        return this._parseNewsModelAsObject(items);
      })
      .then((items) => {
        return this._sortByCreatedAt(items);
      })
      .then((result) => {
        cb(result);
      });
  }
};

module.exports = NewsCollection;