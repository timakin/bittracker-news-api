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

  _parseNewsAsObject(items) {
    return _.flatten(items).map((item) => { return item.toObject() });
  }

  _sortByCreatedAt(items) {
    return _.sortBy(items, 'created_at').reverse();
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i], (res) => {
          return this._filterItemsByImageExistance(res.body.items);
      });
    }
    Promise.all(promises)
      .then((items) => {
        return _.flatten(items);
      })
      .then((itemsWithImage) => {
        let results = [];
        _.map(itemsWithImage, (item) => {
          let news = new newsModel({
            title:      item.title,
            url:        item.originId,
            origin:     item.origin.title,
            image_uri:  item.visual.url,
            created_at: item.published
          });
          results.push(news);
        });
        return results;
      })
      .then((items) => {
        return this._parseNewsAsObject(items);
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