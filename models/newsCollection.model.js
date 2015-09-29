"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');
var newsModel = require('./news.model');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _createNewsModelByFeedly(item) {
    return new newsModel({
      title:      item.title,
      url:        item.originId,
      origin:     item.origin.title,
      image_uri:  item.visual.url,
      created_at: item.published
    });
  }

  _createNewsModelCollectionByFeedly(items) {
    return _.map(items, (item) => this._createNewsModelByFeedly(item));
  }

  _filterFeedlyItemsByImageExistance(items) {
    return _.select(items, (item) => (item.visual && item.visual.url != 'none'));
  }

  _convertNewsModelToObject(items) {
    return _.flatten(items).map((item) => item.toObject());
  }

  _sortByCreatedAt(items) {
    return _.sortBy(items, 'created_at').reverse();
  }

  get(cb) {
    let promises = _.map(urls, (url) => { return fetch(url, (res) => { return res.body.items }) });

    Promise.all(promises)
      .then((items) => _.flatten(items)                               )
      .then((items) => this._filterFeedlyItemsByImageExistance(items) )
      .then((items) => this._createNewsModelCollectionByFeedly(items) )
      .then((items) => this._convertNewsModelToObject(items)          )
      .then((items) => this._sortByCreatedAt(items)                   )
      .then((items) => cb(items), (err) => console.error(err.stack)   );
  }
};

module.exports = NewsCollection;