"use strict";

var _         = require('underscore');
var fetch     = require('../utils/fetch');
var endpoints = require('../config/endpoints.json');
var newsModel = require('./news.model');

const urls = endpoints.feedly.jp;

class NewsCollection {
  _filterByImageExistance(items) {
    let results = [];
    _.map(items, (item) => {
      if (item.visual && item.visual.url != 'none') {
        let news = new newsModel({
          title:      item.title,
          url:        item.originId,
          origin:     item.origin.title,
          image_uri:  item.visual.url,
          created_at: item.published
        });
        results.push(news);
      }
    });
    return results;
  }

  _sortByCreatedAt(items) {
    let results = [];
    _.map(items, (item) => { results = results.concat(item) });
    let resultObjects = _.map(results, (result) => { return result.toObject(); });
    return _.sortBy(resultObjects, 'created_at').reverse();
  }

  get(cb) {
    let promises = [];
    for (let i = 0; i < urls.length; i++) {
      promises[i] = fetch(urls[i], (res) => {
          return this._filterByImageExistance(res.body.items);
      });
    }
    Promise.all(promises)
      .then((items) => {
        return this._sortByCreatedAt(items);
      })
      .then((result) => {
        cb(result);
      });
  }
};

module.exports = NewsCollection;